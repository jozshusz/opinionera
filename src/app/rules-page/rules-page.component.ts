import { Component, OnInit } from '@angular/core';
import { NewsRulesService } from '../api/news-rules/news-rules.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.css']
})
export class RulesPageComponent implements OnInit {

  generalRulesList = [];
  modRulesList = [];
  faqList;

  // which nav
  option;
  
  constructor(
    private rulesService: NewsRulesService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.option = url[1].path;
      if(this.option == "all"){
        this.initRules();
      }else if(this.option == "faqs"){
        this.initFaqs();
      }
    });
  }

  initRules(){
    this.rulesService.getRules().subscribe(
      data => {
        for(var d in data){
          if(data[d].type == "general"){
            this.generalRulesList.push(data[d]);
          }else{
            this.modRulesList.push(data[d]);
          }
        }
      },
      error => console.log(error)
    );
  }

  initFaqs(){
    this.rulesService.getFaqs().subscribe(
      data => {
        this.faqList = data;
      },
      error => console.log(error)
    );
  }

}
