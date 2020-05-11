import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  notScrolled = true;
  paginatorData = null;

  commentForm: FormGroup;
  submitted = false;
  tooManyChar = false;
  tooManyEdit = false;

  currentPost;
  topicId;
  sectionId;
  postId;
  lastCommentUrlparam = null;
  searchedCommentUrlparam = null;

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
    private msgNotificationService: MessageNotificationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.topicId = paramMap.get('topicId');
      this.sectionId = paramMap.get('sectionId');
      this.postId = paramMap.get('postId');
      this.lastCommentUrlparam = paramMap.get('lastComment');
      this.searchedCommentUrlparam = paramMap.get('comment');

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
        this.paginatorData = res;

        // check if user navigated from last comment link
        if(this.lastCommentUrlparam && this.paginatorData["current_page"] != this.paginatorData["last_page"]){
          this.byPageNumber(this.paginatorData["last_page"]);
        }else if(this.searchedCommentUrlparam){
          this.searchedComment();
        }else{
          this.comments = res["data"];
          this.checkUpvotedStatus();
        }
      }, error => {
        console.error(error);
      });
  }

  checkUpvotedStatus(){
    // check if a comment is upvoted by the current user
    for (var i = 0; i < this.comments.length; i++) {
      for (var j = 0; j < this.comments[i].upvotes.length; j++) {
        if(this.comments[i].upvotes[j]['user_id'] == this.userId){
          this.comments[i]['upvoted'] = true;
          break;
        }
      }
    }
  }

  newCommentButton(){
    this.newComment = !this.newComment;
    if(this.currentPost["fresh"]){
      this.currentPost["fresh"] = false;
      this.newComment = false;
    }
  }

  onSubmit(){
    this.submitted = true;
    this.commentForm.controls["token"].setValue(this.tokenService.get());
    this.commentForm.controls["post_id"].setValue(this.postId);

    if(this.commentForm.value["text"].length < 301){
      this.sendCommentService.sendComment(this.commentForm.value).subscribe(
        data => this.handleResponse(data),
        error => console.log(error)
      );
    }else{
      this.tooManyChar = true;
    }

  }

  get f() { return this.commentForm.controls; }

  handleResponse(data): void{
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

    if(this.comments.length > 11){
      this.commentService.getPageOfComment(this.postId, data.id).subscribe(
        message => {
          this.byPageNumber(message);
          
          // scroll down to new comment
          window.scroll(0, document.body.scrollHeight);
        },
        error => console.log(error)
      );
    }else{
      data["upvotes_count"] = 0;

      // make new comment appear in frontend
      this.comments.push(data);
      this.comments.filter(x => x.id == data.id)[0].upvotes = [];
      if(this.currentPost["fresh"]){
        this.currentPost["fresh"] = false;
      }
      
      this.incrementAllUserComments(data.user.comment_numbers);

      // scroll down to new comment
      window.scroll(0, document.body.scrollHeight);
    }
    
    this.tooManyChar = false;
    this.submitted = false;
    this.newComment = false;
    this.commentForm.controls["text"].setValue("");
  }

  incrementAllUserComments(commentNumbers){
    for (var i = 0; i < this.comments.length; i++) {
      if(this.comments[i].user.id == this.userId){
        this.comments[i].user.comment_numbers = commentNumbers;
      }
    }
  }

  sendLike(commentId){
    // if the user is not logged in, then navigate to login page
    if(!this.isLoggedIn){
      this.router.navigateByUrl('/login');
    }

    this.sendCommentService.upvoteComment({
      'token': this.tokenService.get(),
      'commentId': commentId
    }).subscribe(
      data => {
        let isUpvoted = this.comments.filter(x => x.id == commentId)[0].upvoted;
        if(isUpvoted){
          this.comments.filter(x => x.id == commentId)[0].upvoted = false;
          this.comments.filter(x => x.id == commentId)[0].upvotes_count -= 1;
        }else{
          this.comments.filter(x => x.id == commentId)[0].upvoted = true;
          this.comments.filter(x => x.id == commentId)[0].upvotes_count += 1;
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
    if(this.newText.length < 301){
      this.tooManyEdit = false;
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
    }else{
      this.tooManyEdit = true;
    }
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
    // if the user is not logged in, then navigate to login page
    if(!this.isLoggedIn){
      this.router.navigateByUrl("/login");
    }

    this.comments.filter(x => x.id == commentId)[0]["reported"] = true;

    this.sendCommentService.reportComment({
      'token': this.tokenService.get(),
      'commentId': commentId
    }).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }

  // paginator 
  prevPage() {
    this.commentService.getCommentsByUrl(this.paginatorData.prev_page_url).subscribe(
      data => {
        this.paginatorData = data;
        this.comments = data["data"];
        this.checkUpvotedStatus();
      },
      error => console.log(error)
    );
  }

  nextPage() {
    this.commentService.getCommentsByUrl(this.paginatorData.next_page_url).subscribe(
      data => {
        this.paginatorData = data;
        this.comments = data["data"];
        this.checkUpvotedStatus();
      },
      error => console.log(error)
    );
  }

  byPageNumber(pageNumber) {
    let url = this.paginatorData["path"] + "?page=" + pageNumber;
    this.commentService.getCommentsByUrl(url).subscribe(
      data => {
        this.paginatorData = data;
        this.comments = data["data"];
        this.checkUpvotedStatus();
      },
      error => console.log(error)
    );
  }

  searchedComment(){
    this.commentService.getPageOfComment(this.postId, this.searchedCommentUrlparam).subscribe(
      data => {
        this.byPageNumber(data);
      },
      error => console.log(error)
    );
  }

  // scroll only if the view is finished
  ngAfterViewChecked(){
    if(this.searchedCommentUrlparam && document.getElementById(this.searchedCommentUrlparam) && this.notScrolled){
      document.getElementById(this.searchedCommentUrlparam).scrollIntoView({ block: 'center',  behavior: 'smooth' });
      this.notScrolled = false;
    }else if(this.lastCommentUrlparam && document.getElementById(this.lastCommentUrlparam) && this.notScrolled){
      document.getElementById(this.lastCommentUrlparam).scrollIntoView({ block: 'center',  behavior: 'smooth' });
      this.notScrolled = false;
    }
  }

}
