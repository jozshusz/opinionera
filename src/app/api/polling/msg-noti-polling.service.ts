import { Injectable } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StatusService } from '../status/status.service';

@Injectable({
  providedIn: 'root'
})
export class MsgNotiPollingService {

  pollingData: any;
  value: any = "";
  isLoggedIn = false;
  newMsgNoti = new BehaviorSubject<boolean>(false);

  private baseUrl = 'http://www.forumbackend.com/api/';

  constructor(
    private http: HttpClient,
    private statusService: StatusService
  ) { 
    this.statusService.authStatus.subscribe( value => this.isLoggedIn = value );
  }

  pollMsgNoti(data){
    if(this.isLoggedIn){
      this.pollingData=interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.http.post(this.baseUrl + 'newMsgNoti', data))
      )
      .subscribe(
          res => {
              console.log(res['needNotification']);
              this.newMsgNoti.next(res['needNotification']);
          },
          error=>{
            console.log(error);
          }
      );
    }
  }

  pollUnsubscribe(){
    this.pollingData.unsubscribe();
  }

}
