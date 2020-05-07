import { Component, OnInit } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sections-page',
  templateUrl: './sections-page.component.html',
  styleUrls: ['./sections-page.component.css']
})
export class SectionsPageComponent implements OnInit {

  sections;
  freshContainer = {
    "comments": [],
    "posts": []
  };

  option = "default";

  constructor(
    private postsService: GetAllPostsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.option = url[0].path;
      //console.log(this.option);
      // check which secondary nav is selected
      if(this.option == "sections"){
        this.getRecentSections();
      }else if(this.option == "fresh"){
        this.freshView();
      }else if(this.option == "popular"){
        this.popularView();
      }
    });
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

  freshView(): void{
    this.postsService.getFresh().subscribe(
      data => {
        this.freshContainer["comments"] = data["comments"];
        this.freshContainer["posts"] = data["posts"];
      },
      error => console.log(error)
    );
  }

  popularView(): void{
    this.postsService.getPopular().subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error)
    );
  }
  
}
