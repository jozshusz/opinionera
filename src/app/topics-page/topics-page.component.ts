import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics-page',
  templateUrl: './topics-page.component.html',
  styleUrls: ['./topics-page.component.css']
})
export class TopicsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sections: any = 
  [
  {"section_name": "Általános, egyéb", 
      "topics": [{"main_topic": "Csevegés" }, {"main_topic": "Hibabejelentés" }, {"main_topic": "Javaslatok" }]},
  {"section_name": "Informatika", 
      "topics": [{"main_topic": "Mobil, tablet" }, {"main_topic": "Számítógép" }, {"main_topic": "Tv, rádió" },
          {"main_topic": "Programozás" }, {"main_topic": "Operációs rendszerek" }]},
  {"section_name": "Művészet", 
      "topics": [{"main_topic": "Irodalom" }, {"main_topic": "Rajz, festészet" }, {"main_topic": "Zene" }]},
  {"section_name": "Pénzügy",
      "topics":  [{"main_topic": "Karrier" }, {"main_topic": "Bankok, hitelek" }]},
  {"section_name": "Sport", 
      "topics": [{"main_topic": "Labdarúgás" }, {"main_topic": "Kézilabda" }, {"main_topic": "Vízilabda" },
          {"main_topic": "Téli sportok" }, {"main_topic": "Autóversenyzés" }, {"main_topic": "Sakk" }]},
  {"section_name": "Szórakozás",
      "topics": [{"main_topic": "Filmek" }, {"main_topic": "Könyvek" }, {"main_topic": "Sorozatok" },
           {"main_topic": "Játékok" }, {"main_topic": "Képregények" }]},
  {"section_name": "Tudomány",
      "topics": [{"main_topic": "Matematika" }, {"main_topic": "Fizika" }, {"main_topic": "Pszichológia" },
          {"main_topic": "Társadalomtudomány" }, {"main_topic": "Biológia" }, {"main_topic": "Kémia" }]},
  ];

}
