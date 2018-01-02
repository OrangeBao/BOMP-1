import { Component, OnInit } from '@angular/core';
import { UserService } from './common/services/user/user.service';
import { GrafanaService } from './common/services/grafana/grafana.service';
import { UserInfo } from './common/models/user-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private userInfo: UserInfo;
  constructor(private userService: UserService, private grafanaService: GrafanaService) {}
  get userName() {
    return this.userInfo && this.userInfo.userName;
  }
  get menus() {
    return this.userInfo && this.userInfo.menus;
  }
  ngOnInit() {
    this.userInfo = this.userService.getUserInfo();
    if (this.userService.getUserInfo().geass) {
      this.grafanaService.login();
    } else {
      this.grafanaService.logout();
    }
  }
}
