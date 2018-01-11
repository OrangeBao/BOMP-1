import { Component, OnInit } from '@angular/core';
import { UserService } from './common/services/user/user.service';
// import { GrafanaService } from './common/services/grafana/grafana.service';
import { UserInfo } from './common/models/user-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private userInfo: UserInfo;
  constructor(private userService: UserService) {}
  get userName() {
    return this.userInfo && this.userInfo.userName;
  }
  get menus() {
    return this.userInfo && this.userInfo.menus;
  }
  ngOnInit() {
    debugger;
    this.userInfo = this.userService.getUserInfo();
  }
}
