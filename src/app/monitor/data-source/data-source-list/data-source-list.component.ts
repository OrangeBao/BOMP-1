import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../../common/services/data-source/data-source.service';
import { Ng4LoadingSpinnerService } from '../../../loading';
import { DicService } from '../../../common/services/dic/dic.service';
import { NotificationsService } from '../../../common/share.module';

@Component({
  selector: 'app-data-source-list',
  templateUrl: './data-source-list.component.html',
  styleUrls: ['./data-source-list.component.scss']
})
export class DataSourceListComponent implements OnInit {

  dataSource: Array<any>;
  constructor(
      private dicService: DicService,
      private dataSourceService: DataSourceService,
      private spinnerService: Ng4LoadingSpinnerService,
      protected notificationsService: NotificationsService,
  ) { }

  getRegionName(data) {
    const regionName = this.dicService.getRegion()
        .filter(item => item.key === data.regionId);
    return regionName && regionName[0] && regionName[0].value || '';
  }

  ngOnInit() {
    this.spinnerService.show();
    this.dataSourceService.getAll()
        .then(data => this.dataSource = data.map(d => ({...d, regionName: this.getRegionName(d)})))
        .then(() => this.spinnerService.hide()).catch(err => {
      this.spinnerService.hide();
      this.notificationsService.addError('系统异常，请联系管理员！');
      console.error(err);
    });
  }

  deleteDataSource(id) {
    this.spinnerService.show();
    this.dataSourceService.deleteDataSource(id).then(() => {
      this.spinnerService.hide();
      this.dataSource = this.dataSource.filter(item => item.id !== id);
    }).catch(err => {
      this.spinnerService.hide();
      this.notificationsService.addError('系统异常，请联系管理员！');
      console.error(err);
    });
  }

}
