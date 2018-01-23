import { Component, OnInit } from '@angular/core';
import { UserService } from './common/services/user/user.service';
// import { GrafanaService } from './common/services/grafana/grafana.service';
import { UserInfo } from './common/models/user-info.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private userInfo: UserInfo;
  constructor(private userService: UserService, private router: Router) {}
  get userName() {
    return this.userInfo && this.userInfo.userName;
  }
  get menus() {
    return this.userInfo && this.userInfo.menus;
  }
  get isShowNavigator() {
    debugger;
    return false;
  }
  ngOnInit() {
    debugger;
    this.userInfo = this.userService.getUserInfo();
  }
}
