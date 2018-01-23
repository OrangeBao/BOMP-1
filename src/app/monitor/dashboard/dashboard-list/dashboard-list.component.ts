import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../common/services/dashboard/dashboard.service';
import { UserService } from '../../../common/services/user/user.service';
import { Ng4LoadingSpinnerService } from '../../../loading';
import { NotificationsService } from '../../../common/share.module';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
  constructor(
      private dashboardService: DashboardService,
      private userService: UserService,
      private spinnerService: Ng4LoadingSpinnerService,
      private notificationsService: NotificationsService,
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
    }).catch(err => {
      this.spinnerService.hide();
      this.notificationsService.addError('系统异常，请联系管理员！');
      console.error(err);
    });
  }
  setHomePage(uri) {
    this.spinnerService.show();
    this.userService.setHomePage(uri).then(() => this.spinnerService.hide());
  }
  deleteDashbaord(id) {
    const param = id.split('b/')[1];
    this.spinnerService.show();
    this.dashboardService.deleteDashboard(param).then(() => {
      this.spinnerService.hide();
      this.dashboards = this.dashboards.filter(item => item.uri !== id);
    }).catch(err => {
      this.spinnerService.hide();
      this.notificationsService.addError('系统异常，请联系管理员！');
      console.error(err);
    });
  }
}
