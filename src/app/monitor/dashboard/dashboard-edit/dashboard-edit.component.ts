import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService, DashboardService, LoadingService } from '../../../common/share.module';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss']
})
export class DashboardEditComponent implements OnInit, OnDestroy {

  dashboardUrl: string;
  constructor(
    private title: TitleService,
    private dashboard: DashboardService,
    private load: LoadingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title.sendMsg({
      showTitle: true,
      text: '配置仪表盘',
    });
    this.route
    .fragment
    .map(fragment => fragment || '').subscribe(uri => {
      this.dashboardUrl = uri;
    });
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: '',
    });
  }

}
