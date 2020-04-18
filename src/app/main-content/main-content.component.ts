import { Component, OnInit } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  
  isLoaded = false;

  constructor(private postsService: GetAllPostsService) { 
    this.getPosts();
  }

  ngOnInit() {
  }

  
  getPosts(): void{
    this.postsService.getPosts()
      .subscribe((res: any) => {
        this.postsService.setPostsList(res);
        this.isLoaded = true;
      }, error => {
        console.error(error);
      });
  }

}
