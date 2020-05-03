import { Component, OnInit } from '@angular/core';
import { GetAllPostsService } from '../api/get-all-posts/get-all-posts.service';
import { StatusService } from '../api/status/status.service';
import { TokenService } from '../api/token/token.service';
import { MsgNotiPollingService } from '../api/polling/msg-noti-polling.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  
  isLoaded = false;
  token = null;

  constructor(
    private postsService: GetAllPostsService,
    private statusService: StatusService,
    private tokenService: TokenService,
    private pollingService: MsgNotiPollingService
  ) { 

    this.getPosts();

    this.statusService.authStatus.subscribe( 
      value => {
        if(value){
        this.token = {
          'token' : this.tokenService.get()
        };
        this.pollingService.pollMsgNoti(this.token);
        }
      } 
    );
  }

  ngOnInit() {
  }

  getPosts(): void{
    this.postsService.getPosts()
      .subscribe((res: any) => {
        this.postsService.setPostsList(res);
        this.isLoaded = true;
      }, error => {
        console.error(error);
      });
  }

}
