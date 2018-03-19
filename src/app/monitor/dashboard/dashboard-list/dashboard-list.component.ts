import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { DashboardService } from '../../../common/services/dashboard/dashboard.service';
import { UserService } from '../../../common/services/user/user.service';
import { LoadingService } from '../../../common/share.module';
import { ModalService } from 'zu-modal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Dashboard } from '../../../common/models/dashboard';
import { validateCounterRange } from '../../../common/directives/tag-input/tag-input.component';
import { NzNotificationService } from 'ng-zorro-antd';

import { PageComponent } from '../../../common/components/page.component';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent extends PageComponent implements OnInit  {
  @ViewChild('modifyFormUrl') modifyFormUrl: TemplateRef<any>;

  baseInfo: any = {};
  modifyForm: FormGroup;

  sort: any;   // 排序
  filter: any; // 过滤

  constructor(
      private dashboardService: DashboardService,
      private userService: UserService,
      private spinnerService: LoadingService,
      private notification: NzNotificationService,
      private modalService: ModalService,
      private fb: FormBuilder
  ) {
    super();
    this.modifyForm = this.fb.group({
      name              : [ '', [ Validators.required ] ],
      tags              : [ '', [ Validators.required ] ],
      remark            : [ '' ],
    });
  }

  dashboards: Array<Dashboard>;
  // displayDashboards: Array<Dashboard>;
  includeTags: string[];

  get homePage() {
    return this.userService.getUserInfo().homePage;
  }

  get isAll() {
    return this.dashboards && this.choiceList.length === this.dashboards.length;
  }

  get allTags() {
    return (this.dashboards || []).reduce((ret, item) => {
      const temp = new Set([...ret, ...(item.tags || [])]);
      return Array.from(temp);
    }, []);
  }

  get displayDashboards(): Array<Dashboard> {
    if (!this.includeTags || this.includeTags.length === 0) return this.dashboards;
    return (this.dashboards || []).filter(item => 
      (item.tags || []).find(t => this.includeTags.includes(t)));
  }

  requestData(needLoading, append) {
    needLoading && this.spinnerService.show();
    this.dashboardService.getDashboardList().subscribe(response => {
      needLoading && this.spinnerService.hide();
      if (append) {
        this.dashboards = [...this.dashboards, ...response.content];
      } else {
        this.dashboards = response.content
      }
    }, err => {
      needLoading && this.spinnerService.hide();
      this.notification.create('error', '异常', '仪表盘初始化异常，请联系管理员！');
      console.error(err);
    });
  }

  fetchData(endLoad, showNoMore) {
    this.dashboardService.getDashboardList().subscribe(response => {
      debugger;
      if (response.last === true) {
        showNoMore();
      } else {
        endLoad();
      }
      this.dashboards = [...this.dashboards, ...response.content];
    }, err => {
      this.notification.create('error', '异常', '仪表盘初始化异常，请联系管理员！');
      console.error(err);
    });
  }

  ngOnInit() {
    this.requestData(true, false);
  }
  setHomePage(uri) {
    this.spinnerService.show();
    this.userService.setHomePage(uri).then(() => this.spinnerService.hide());
  }

  deleteDashbaordConfirm(id) {
    this.modalService.warn({
      title: '删除',
      content: `确定删除仪表${id}吗？`,
      onOk: () => this.deleteDashbaord(id),
    });
  }

  deleteDashbaord(id) {
    const param = id.split('b/')[1];
    this.spinnerService.show();
    this.dashboardService.deleteDashboard(param).then(() => {
      this.spinnerService.hide();
      this.dashboards = this.dashboards.filter(item => item.uri !== id);
    }).catch(err => {
      this.spinnerService.hide();
      this.notification.create('error', '异常', '仪表盘初始化异常，请联系管理员！');
      console.error(err);
    });
  }

  checkModifyForm() {
    for (const i in this.modifyForm.controls) {
      this.modifyForm.controls[ i ].markAsDirty();
    }
  }

  editDashboard(id) {
    this.baseInfo = {...this.dashboards.find(i => i.uri === id)};
    this.modifyForm.controls['name'].setValue(this.baseInfo.title);
    this.modifyForm.controls['tags'].setValue(this.baseInfo.tags);
    this.modifyForm.controls['remark'].setValue(this.baseInfo.desc);
    this.modalService.open({
      title: '修改仪表盘基本信息',
      content: this.modifyFormUrl,
      cancelText: 'cancel',
      onOk: () => {
        this.checkModifyForm();
        return new Promise((resolve, reject) => {
          if (this.modifyForm.valid) {
            resolve();
          } else {
            reject();
          }
        });
      }
    })
  }
 
  confirmDelete() {
    const choiceList = this.choiceList;
    if (choiceList.length === 0) return;
    this.modalService.warn({
      title: '删除',
      content: `已选择${choiceList.length}个仪表盘，确定删除？`,
      remark: choiceList.join(','),
      onOk: () => {
        console.log('XXXXX');
      },
    });
  }
  
  allSelectChange() {
    if (this.isAll) {
      this.choiceList = [];
    } else {
      this.choiceList = (this.dashboards || []).map(item => item.uri);
    }
  }

  tagChange($event) {
    this.includeTags = $event;
  }

  getFormControl(name) {
    return this.modifyForm.controls[ name ];
  }

  
}
