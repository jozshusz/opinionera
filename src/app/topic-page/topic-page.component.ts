import { Component, OnInit } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(
    private postsService: GetAllPostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.postList = this.postsService.getPostsList();

      this.topicId = paramMap.get('topicId');
      this.sectionId = paramMap.get('sectionId');

      this.currentTopic = this.postList.filter(x => x.id == this.sectionId)[0]['topics'].filter(y => y.id == this.topicId)[0];
      this.currentPostList = this.currentTopic['posts'];
    });
  }

}
