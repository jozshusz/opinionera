import { Injectable } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { StatusService } from '../status/status.service';

@Injectable({
  providedIn: 'root'
})
export class MsgNotiPollingService {

  pollingData: any;
  value: any = "";
  isLoggedIn = false;
  public newMsgNoti = null;

  private baseUrl = 'http://www.forumbackend.com/api/';

  constructor(
    private http: HttpClient,
    private statusService: StatusService
  ) { 
    this.statusService.authStatus.subscribe( value => this.isLoggedIn = value );
  }

  pollMsgNoti(data){
    if(this.isLoggedIn){
      this.pollingData=interval(3000)
      .pipe(
        startWith(0),
        switchMap(() => this.http.post(this.baseUrl + 'newMsgNoti', data))
      )
      .subscribe(
          res => {
              this.newMsgNoti = res;
              console.log(this.newMsgNoti);
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
