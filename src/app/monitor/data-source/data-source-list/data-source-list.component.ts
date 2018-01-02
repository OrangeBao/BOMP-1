import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../../common/services/data-source/data-source.service';
import { Ng4LoadingSpinnerService } from '../../../loading';
import { DicService } from '../../../common/services/dic/dic.service';

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
      private spinnerService: Ng4LoadingSpinnerService
  ) { }

  getRegionName(data) {
    return this.dicService.getRegion()
        .filter(item => item.key === data.regionId)[0].value;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.dataSourceService.getAll()
        .then(data => this.dataSource = data.map(d => ({...d, regionName: this.getRegionName(d)})))
        .then(() => this.spinnerService.hide());
  }

}
