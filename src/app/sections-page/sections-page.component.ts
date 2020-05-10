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
  freshPopularContainer = {
    "comments": [],
    "posts": []
  };

  option = "default";
  commentSectionTitle;
  postSectionTitle;

  constructor(
    private postsService: GetAllPostsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.option = url[1].path;
      // check which secondary nav is selected
      if(this.option == "all"){
        this.getRecentSections();
      }else if(this.option == "fresh"){
        this.freshView();
        this.commentSectionTitle = "Friss kommentek";
        this.postSectionTitle = "Új posztok";
      }else if(this.option == "popular"){
        this.popularView();
        this.commentSectionTitle = "Népszerű kommentek";
        this.postSectionTitle = "Aktív posztok";
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
        this.freshPopularContainer["comments"] = data["comments"];
        this.freshPopularContainer["posts"] = data["posts"];
      },
      error => console.log(error)
    );
  }

  popularView(): void{
    this.postsService.getPopular().subscribe(
      data => {
        this.freshPopularContainer["comments"] = data["comments"];
        this.freshPopularContainer["posts"] = data["posts"];
      },
      error => console.log(error)
    );
  }
  
}
