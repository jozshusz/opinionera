import { Component, OnInit } from '@angular/core';
import { NewsRulesService } from '../api/news-rules/news-rules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from '../api/token/token.service';
import { CreateContentService } from '../api/create-content/create-content.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  newsList;

  // which nav
  option;

  newsForm: FormGroup;
  submitted = false;
  newNews = false;
  adminOrMod = false;

  types = [
    {value: 'bejelentés', viewValue: 'Bejelentés'},
    {value: 'fejlesztés', viewValue: 'Fejlesztés'},
    {value: 'hibajavítás', viewValue: 'Hibajavítás'}
  ];

  constructor(
    private newsService: NewsRulesService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private createContentService: CreateContentService,
    private formBuilder: FormBuilder,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.option = url[1].path;
      if(this.option == "all"){
        this.initAllNews();
      }else if(this.option == "announce"){
        this.initAnnounceNews();
      }else if(this.option == "repairs"){
        this.initRepairNews();
      }
    });

    this.newsForm = this.formBuilder.group({
      postType: 'bejelentés',
      postTitle: ['', Validators.required],
      text: ['', Validators.required],
      token: null
    });

    if(this.tokenService.getUserStatus() == "admin" || this.tokenService.getUserStatus() == "mod"){
      this.adminOrMod = true;
    }
  }

  initAllNews(){
    this.newsService.getNews().subscribe(
      data => {
        this.newsList = data;
      },
      error => console.log(error)
    );
  }

  initAnnounceNews(){
    this.newsService.getNewsDevAnnounce().subscribe(
      data => {
        this.newsList = data;
      },
      error => console.log(error)
    );
  }
  
  initRepairNews(){
    this.newsService.getNewsRepair().subscribe(
      data => {
        this.newsList = data;
      },
      error => console.log(error)
    );
  }

  get f() { return this.newsForm.controls; }

  newNewsButton(){
    this.newNews = !this.newNews;
  }

  onSubmit(){
    this.submitted = true;
    this.newsForm.controls['token'].setValue(this.tokenService.get());

    this.createContentService.createNews(this.newsForm.value).subscribe(
      data => {
        this.newNews = false;

        this.newsForm.controls["postTitle"].setValue("");
        this.newsForm.controls["text"].setValue("");

        if(this.option != "all"){
          this.router.navigateByUrl('/news/all(sidebar:news)');
        }else{
          this.newsList.unshift(data);
          window.scrollTo(0, 0);
        }
        this.submitted = false;
      },
      error => console.log(error)
    );
  }
  
}
