import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../api/token/token.service';
import { GetCommentsService } from '../api/get-comments/get-comments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SendCommentService } from '../api/send-comment/send-comment.service';
import { MessageNotificationService } from '../api/message-notification/message-notification.service';
import * as jspdf from 'jspdf'; 
import * as html2canvas from "html2canvas"

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {

  public isLoggedIn = false;
  public comments;
  public newComment = false;

  commentForm: FormGroup;
  submitted = false;

  currentPost;
  topicId;
  sectionId;
  postId;

  userId;
  upvote = 'Tetszik';
  
  letSelection = false;
  commentsToGenerate = {};
  emptyPdf = false;

  adminOrMod = false;
  explanation;
  newText;

  constructor(
    private formBuilder: FormBuilder,
    private postsService: GetAllPostsService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private commentService: GetCommentsService,
    private sendCommentService: SendCommentService,
    private msgNotificationService: MessageNotificationService
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.topicId = paramMap.get('topicId');
      this.sectionId = paramMap.get('sectionId');
      this.postId = paramMap.get('postId');

      this.currentPost = this.postsService.getPost(this.sectionId, this.topicId, this.postId);

      // check if user is logged in
      this.isLoggedIn = this.tokenService.loggedIn();
      if(this.isLoggedIn){
        this.userId = this.tokenService.getUserId();
        if(this.tokenService.getUserStatus() == 'admin' || this.tokenService.getUserStatus() == 'mod'){
          this.adminOrMod = true;
        }
      }

      this.initComments(this.postId);

      this.commentForm = this.formBuilder.group({
        text: ['', Validators.required],
        post_id: null,
        token: null
      });
    });
  }

  initComments(postId){
    this.commentService.getCommentsByPostId(postId)
      .subscribe((res: any) => {
        this.comments = res;
        // check if a comment is upvoted by the current user
        for (var i = 0; i < this.comments.length; i++) {
          for (var j = 0; j < this.comments[i].upvotes.length; j++) {
            if(this.comments[i].upvotes[j]['user_id'] == this.userId){
              this.comments[i]['upvoted'] = true;
              break;
            }
          }
        }
      }, error => {
        console.error(error);
      });
  }

  newCommentButton(){
    this.newComment = true;
  }

  onSubmit(){
    this.submitted = true;
    this.commentForm.controls['token'].setValue(this.tokenService.get());
    this.commentForm.controls['post_id'].setValue(this.postId);

    this.sendCommentService.sendComment(this.commentForm.value).subscribe(
      data => this.handleResponse(data),
      error => console.log(error)
    );
  }

  get f() { return this.commentForm.controls; }

  handleResponse(data): void{
    // make new comment appear in frontend
    this.comments.push(data);
    this.comments.filter(x => x.id == data.id)[0].upvotes = [];
    this.newComment = false;

    // send notifications to people following this post
    this.msgNotificationService.notifyFollowers({
      'token': this.tokenService.get(),
      'postId': this.postId,
      'commentId': data.id
    }).subscribe(
      data => console.log('Comment sent'),
      error => console.log(error)
    );

    // if person is not already following this post, then set following
    this.msgNotificationService.makeFollower({
      'token': this.tokenService.get(),
      'postId': this.postId,
      'userId': data.user.id
    }).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  sendLike(commentId){
    this.sendCommentService.upvoteComment({
      'token': this.tokenService.get(),
      'commentId': commentId
    }).subscribe(
      data => {
        let isUpvoted = this.comments.filter(x => x.id == commentId)[0].upvoted;
        if(isUpvoted){
          this.comments.filter(x => x.id == commentId)[0].upvoted = false;
        }else{
          this.comments.filter(x => x.id == commentId)[0].upvoted = true;
        }
      },
      error => console.log(error)
    );
  }

  startPdfGenerate(){
    this.letSelection = !this.letSelection;
  }

  selectComment(commentId, text, event){
    // check if it select and not de-select
    if(event){
      this.commentsToGenerate[commentId] = text;
    }else{
      // if it is a de-selection, then the stored comment should be removed
      delete this.commentsToGenerate[commentId];
    }
  }

  finishPdfGenerate(){
    if(Object.keys(this.commentsToGenerate).length > 0){
      this.emptyPdf = false;
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let i = 0;
      pdf.fromHTML("<h1>" + this.currentPost.name + "</h1><br>", 15, 1);

      for(var index in this.commentsToGenerate) {
        i = i + 1;
        // if the text is too big
        let splitText = pdf.splitTextToSize(this.commentsToGenerate[index], 150);

        if(splitText.length > 1){
          for(var j = 0; j<splitText.length; j++){
            pdf.text(splitText[j], 15, 30 * i + (j * 7));
          }
        }else{
          pdf.text(this.commentsToGenerate[index], 15, 30 * i);
        }
      }
      let d = new Date();
      let title = "forum" + d.getHours() + d.getMinutes() + d.getSeconds();
      pdf.save(title);
    }else{
      this.emptyPdf = true;
    }
  }

  // admin/mod delete
  deleteComment(commentId){
    document.getElementById("closeButton-" + commentId).click();
    this.sendCommentService.deleteComment({
      "commentId": commentId,
      "token": this.tokenService.get(),
      "explanation": this.explanation
    }).subscribe(
      data => {
        console.log(data);
        this.comments.filter(x => x.id == commentId)[0]['moderated'] = true;
        this.comments.filter(x => x.id == commentId)[0]['text'] = data['text'];
      },
      error => console.log(error)
    );
  }

  editComment(commentId){
    this.comments.filter(x => x.id == commentId)[0]['canEditComment'] = true;
    this.newText = this.comments.filter(x => x.id == commentId)[0]['text'];
  }

  cancelEdit(commentId){
    this.comments.filter(x => x.id == commentId)[0]['canEditComment'] = false;
  }

  saveEdit(commentId){
    this.sendCommentService.updateComment({
      'token': this.tokenService.get(),
      'commentId': commentId,
      'commentText': this.newText
    }).subscribe(
      data => {
        this.comments.filter(x => x.id == commentId)[0]['text'] = this.newText;
        this.comments.filter(x => x.id == commentId)[0]['canEditComment'] = false;
      },
      error => console.log(error)
    );
  }

  deleteOwnComment(commentId){
    this.sendCommentService.deleteOwnComment({
      'token': this.tokenService.get(),
      'commentId': commentId
    }).subscribe(
      data => {
        document.getElementById("closeOwnDelete-" + commentId).click();
        // remove comment from frontend as well
        this.comments = this.comments.filter(({ id }) => id !== commentId); 
      },
      error => console.log(error)
    );
  }

  reportComment(commentId){
    this.sendCommentService.reportComment({
      'token': this.tokenService.get(),
      'commentId': commentId
    }).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

}
