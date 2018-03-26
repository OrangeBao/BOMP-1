import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService, DashboardService, LoadingService } from '../../../common/share.module';
import { ActivatedRoute }  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dashboard-scan',
  templateUrl: './dashboard-scan.component.html',
  styleUrls: ['./dashboard-scan.component.scss']
})
export class DashboardScanComponent implements OnInit, OnDestroy {

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
      text: '查看仪表盘',
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
