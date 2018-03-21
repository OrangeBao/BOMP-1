import { Component, OnInit } from '@angular/core';
import { TitleService, DashboardService, LoadingService } from '../../../common/share.module';
import { ActivatedRoute }     from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-scan',
  templateUrl: './template-scan.component.html',
  styleUrls: ['./template-scan.component.scss']
})
export class TemplateScanComponent implements OnInit {

  url: string;
  constructor(
    private title: TitleService,
    private dashboard: DashboardService,
    private load: LoadingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title.sendMsg({
      showTitle: true,
      text: '查看模板',
    });
    this.route
    .fragment
    .map(fragment => fragment || '').subscribe(uri => {
      this.url = uri;
    });
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: '',
    });
  }

}
