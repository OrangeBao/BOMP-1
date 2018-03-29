import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { ModalService } from 'zu-modal';

import { LoadingService } from '../../../../common/share.module';
import { DataSource } from '../../../../common/models/data-source';
import { DataSourceService } from '../../../../common/services/data-source/data-source.service';

@Component({
  selector: 'app-datasource-control-table',
  templateUrl: './datasource-control-table.component.html',
  styleUrls: ['./datasource-control-table.component.scss']
})
export class DatasourceControlTableComponent implements OnInit {
  _current = 1;
  _pageSize = 10;
  _total = 0;

  dataSources: Array<DataSource> = [];
  searchText: string;

  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private spinnerService: LoadingService,
    private modalService: ModalService,
    private datasourceService: DataSourceService
  ) {}

  ngOnInit() {
    this.refreshData();
  }

  onConfirmDelete(dataSource: DataSource) {
    this.modalService.warn({
      title: '删除',
      content: `确定删除数据源：${dataSource.name}吗？`,
      onOk: () => {
        this.spinnerService.show();
        this.datasourceService.deleteDataSource([dataSource.id]).subscribe({
          next: result => {
            this.spinnerService.hide();
            this.notification.create('success', '提示', '数据源删除成功！');
            this.refreshData();
          },
          error: error => {
            this.spinnerService.hide();
            this.notification.create('warning', '提示', error.error.message);
          }
        });
      }
    });
  }

  refreshData() {
    this.datasourceService
      .getAll(this._current - 1, this._pageSize)
      .subscribe(data => {
        this.dataSources = data.content || [];
        this._total = data.totalElements;
      });
  }

  addDatasource() {
    this.router.navigateByUrl('/console/datasourcecontrol/add');
  }
}
