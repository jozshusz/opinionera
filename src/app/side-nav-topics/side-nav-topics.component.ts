import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-topics',
  templateUrl: './side-nav-topics.component.html',
  styleUrls: ['./side-nav-topics.component.css']
})
export class SideNavTopicsComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  loadFresh(){
  
  }

}
