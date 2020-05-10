import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../api/search/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchWords = null;

  resultComments = null;
  resultPosts = null;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.searchWords = url[1].path;
      if(this.searchWords){
        this.getResults();
      }
    });
  }

  getResults(){
    this.searchService.getSearchResults(this.searchWords).subscribe(
      data => {
        this.resultComments = data['comments'];
        this.resultPosts = data["posts"];
      },
      error => console.log(error)
    );
  }

}
