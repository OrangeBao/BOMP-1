import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { NzNotificationService } from 'ng-zorro-antd';
import { ModalService } from 'zu-modal';

import { LoadingService } from '../../../../common/share.module';
import { MonitorService } from '../../../../common/services/monitor/monitor.service';
import { MonitorObject } from '../../../../common/models/monitor/monitor-object';
import { PageComponent } from '../../../../common/components/page.component';

@Component({
  selector: 'app-monitor-objects',
  templateUrl: './monitor-objects.component.html',
  styleUrls: ['./monitor-objects.component.scss']
})
export class MonitorObjectsComponent extends PageComponent<MonitorObject> implements OnInit {
  @ViewChild('tplDelete') tplDelete: TemplateRef<any>;

  searchText: string;
  monitorTags: Array<string>;
  monitorObjects: Array<MonitorObject>;
  monitorFiltedObjects: Array<MonitorObject>;
  monitorDeleteList: Array<MonitorObject>;

  selectedTags: Array<string> = [];
  allChecked = false;
  isBatchDeleteable: boolean;

  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private monitorService: MonitorService,
    private spinnerService: LoadingService,
    private modalService: ModalService
  ) {
    super();

    this.searchText = '';
    this.isBatchDeleteable = false;
    this.monitorDeleteList = new Array<MonitorObject>();
  }

  ngOnInit() {
    // this.monitorService.getMonitorObjs().subscribe({
    //   next: (data: any) => {
    //     this.monitorObjects = data.content || [];

    //     this.monitorFiltedObjects = this.monitorObjects;
    //   }
    // });
    this.requestData(true);

    this.monitorService.getMonitorTags().subscribe({
      next: (data: any) => {
        this.monitorTags = data || [];
      }
    });
  }

  /** PageComponent implements */
  appendData(queryParams) {
    return this.monitorService.getMonitorObjs().pipe(
      catchError(err => {
        this.notification.create('error', '异常', '监控对象始化异常，请联系管理员！');
        return Observable.of({
          content: []
        });
      })
    );
  }

  deleteDataSource(monitorObject) {
    this.modalService.warn({
      title: '删除',
      content: `确定删除监控对象${monitorObject.name}吗？`,
      // content: `确定删除监控对象${id}吗？`,
      onOk: () => this.deleteRequest([monitorObject.id])
    });
  }

  batchDeleteDataSource() {
    const choiceList = this.choiceList;
    if (choiceList.length > 0) {
      const self = this;
      this.modalService.warn({
        title: '删除',
        content: `已选择${choiceList.length}个监控对象，确定删除？`,
        remark: this.dataSource.filter(item => this.choiceList.includes(item.id)).map(item => item.name).join(','),
        onOk: () => {
          self.deleteRequest(choiceList);
          self.batchModel();
        },
      });
    }
  }

  deleteRequest(id: string[]) {
    this.spinnerService.show();
    this.monitorService
      .deleteMonitorObjects(this.monitorDeleteList)
      .subscribe(result => {
        this.spinnerService.hide();

        this.notification.create('success', '提示', '监控对象删除成功！');
        this.requestData(true);
      }, err => {
        this.spinnerService.hide();
        this.notification.create('error', '异常', '监控对象删除失败，请联系管理员！');
      });
  }
  /** end PageComponent implements */

  onSearch(): void {
    this.monitorFiltedObjects = this.monitorObjects.filter(item => {
      return this.searchText === ''
        ? true
        : item.name.includes(this.searchText) ||
        item.tags.includes(this.searchText);
    });
  }

  tagChange($event) {
    this.selectedTags = $event;

    // console.log(this.selectedTags);

    this.monitorFiltedObjects = this.monitorObjects.filter(item => {
      return this.selectedTags.includes('all') || this.selectedTags.length === 0
        ? true
        : item.tags.some(r => this.selectedTags.includes(r));
    });
  }

  newObject() {
    this.router.navigateByUrl('/monitor/indexes/add');
  }

  batchDeleteObjects() {
    this.isBatchDeleteable = true;
  }

  confirmBatchDelete() {
    this.modalService.warn({
      title: '批量删除',
      content: `已选择${this.monitorDeleteList.length}个监控对象，确定删除？`,
      remark: this.monitorDeleteList.map(item => item.name).join(','),
      onOk: () => this.deleteMonitors()
    });
  }

  deleteMonitors() {
    this.spinnerService.show();
    this.monitorService
      .deleteMonitorObjects(this.monitorDeleteList)
      .subscribe(result => {
        this.spinnerService.hide();

        this.refreshMonitorObjects();
        this.monitorDeleteList = [];
      });
  }

  cancelBatchDelete() {
    this.isBatchDeleteable = false;
  }

  refreshMonitorObjects() {
    // 前端删除 or 后端重新获取数据???
    this.monitorObjects = this.monitorObjects.filter(item => {
      return !this.monitorDeleteList.includes(item);
    });
    this.monitorFiltedObjects = this.monitorObjects;
  }

  // // output event
  // cardSelectChanged(event: any) {
  //   if (event.selected) {
  //     // 如果原来已存则不重复存
  //     if (
  //       !this.monitorDeleteList.some(r => {
  //         return r.id === event.monitorObject.id;
  //       })
  //     ) {
  //       this.monitorDeleteList.push(event.monitorObject);
  //     }
  //   } else {
  //     this.monitorDeleteList = this.monitorDeleteList.filter(
  //       item => item.id !== event.monitorObject.id
  //     );
  //   }
  // }

  // cardDeleteChanged(event: any) {
  //   this.monitorDeleteList.push(event.monitorObject);
  //   this.deleteMonitors();
  // }
}
