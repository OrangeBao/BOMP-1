import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../../common/share.module';

@Component({
  selector: 'app-dashboard-create',
  templateUrl: './dashboard-create.component.html',
  styleUrls: ['./dashboard-create.component.scss']
})
export class DashboardCreateComponent implements OnInit {

  constructor(private title: TitleService) {
    this.title.sendMsg({
      showTitle: true,
      text: '新建仪表盘',
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: '',
    });
  }

}
