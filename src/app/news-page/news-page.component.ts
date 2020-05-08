import { Component, OnInit } from '@angular/core';
import { NewsRulesService } from '../api/news-rules/news-rules.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  newsList;

  constructor(private newsService: NewsRulesService) { }

  ngOnInit() {
    this.newsService.getNews().subscribe(
      data => {
        this.newsList = data;
      },
      error => console.log(error)
    );
  }

}
