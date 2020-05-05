import { Component, OnInit } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../api/token/token.service';
import { GetCommentsService } from '../api/get-comments/get-comments.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SendCommentService } from '../api/send-comment/send-comment.service';
import { MessageNotificationService } from '../api/message-notification/message-notification.service';

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
      }, error => {
        console.error(error);
      });
  }

  newCommentButton(){
    this.newComment = true;
  }

  onSubmit(){
    this.submitted = true;
    this.commentForm.controls['token'].setValue(this.tokenService.get())
    this.commentForm.controls['post_id'].setValue(this.postId)

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
  }

}
