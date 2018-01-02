import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../common/services/dashboard/dashboard.service';
import { UserService } from '../../../common/services/user/user.service';
import { Ng4LoadingSpinnerService } from '../../../loading';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
  constructor(
      private dashboardService: DashboardService,
      private userService: UserService,
      private spinnerService: Ng4LoadingSpinnerService
  ) { }

  dashboards: Array<any>;

  get homePage() {
    return this.userService.getUserInfo().homePage;
  }
  ngOnInit() {
    this.spinnerService.show();
    this.dashboardService.getDashboardList().then(response => {
      this.spinnerService.hide();
      this.dashboards = response;
    });
  }
  setHomePage(uri) {
    this.userService.setHomePage(uri);
  }
}
