import { Component, OnInit } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../api/token/token.service';
import { GetCommentsService } from '../api/get-comments/get-comments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SendCommentService } from '../api/send-comment/send-comment.service';
import { MessageNotificationService } from '../api/message-notification/message-notification.service';
import * as jspdf from 'jspdf'; 

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

  selectComment(commentId, text, username, event){
    let result;
    // check if it select and not de-select
    if(event){
      this.commentsToGenerate[commentId] = text;
      result = document.getElementById(commentId);
    }else{
      // if it is a de-selection, then the stored comment should be removed
      delete this.commentsToGenerate[commentId];
    }

    console.log(this.commentsToGenerate);

    // create pdf
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    pdf.fromHTML(result, 15, 15, {
      width: 190
    });

    pdf.save('teszt.pdf');
  }

}
