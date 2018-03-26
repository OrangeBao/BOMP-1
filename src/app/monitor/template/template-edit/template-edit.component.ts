import { Component, OnInit } from '@angular/core';
import { TitleService, DashboardService, LoadingService } from '../../../common/share.module';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit {

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
      text: '编辑模板',
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
