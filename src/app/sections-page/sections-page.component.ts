import { Component, OnInit } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';

@Component({
  selector: 'app-sections-page',
  templateUrl: './sections-page.component.html',
  styleUrls: ['./sections-page.component.css']
})
export class SectionsPageComponent implements OnInit {

  sections: object;

  constructor(
    private postsService: GetAllPostsService
    ) { }

  ngOnInit() {
    this.getRecentSections();
  }
  
  getRecentSections(): void{
    this.postsService.getPosts()
      .subscribe((res: any) => {
        this.sections = res;
        this.postsService.setPostsList(this.sections);
      }, error => {
        console.error(error);
      });
  }
  
}
