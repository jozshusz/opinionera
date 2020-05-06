import { Component, OnInit } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TokenService } from '../api/token/token.service';
import { CreateContentService } from '../api/create-content/create-content.service';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  postList: any;
  topicId: string;
  sectionId: string;
  currentTopic: any;
  currentPostList: any;

  newPost = false;
  isLoggedIn = false;
  postForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private postsService: GetAllPostsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private createContentService: CreateContentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.postList = this.postsService.getPostsList();

      this.topicId = paramMap.get('topicId');
      this.sectionId = paramMap.get('sectionId');

      this.currentTopic = this.postList.filter(x => x.id == this.sectionId)[0]['topics'].filter(y => y.id == this.topicId)[0];
      this.currentPostList = this.currentTopic['posts'];

      // check if user is logged in
      this.isLoggedIn = this.tokenService.loggedIn();

      this.postForm = this.formBuilder.group({
        postTitle: ['', Validators.required],
        postDescription: ['', Validators.required],
        topicId: null,
        token: null
      });
    });
  }

  get f() { return this.postForm.controls; }

  newPostButton(){
    this.newPost = true;
  }

  onSubmit(){
    this.submitted = true;
    this.postForm.controls['token'].setValue(this.tokenService.get());
    this.postForm.controls['topicId'].setValue(this.topicId);

    this.createContentService.createPost(this.postForm.value).subscribe(
      data => this.handleResponse(data),
      error => console.log(error)
    );
  }

  handleResponse(data){
    this.newPost = false;

    // new field 'fresh' so the post component knows this was just created
    data[0]['fresh'] = true;
    
    this.postsService.setPost(this.sectionId, this.topicId, data[0]);
    this.router.navigate([data[0]['id']], { relativeTo: this.route });
  }

}
