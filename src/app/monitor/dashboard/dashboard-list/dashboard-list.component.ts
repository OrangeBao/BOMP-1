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
import { identifierModuleUrl } from '@angular/compiler';

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
      tags              : [ '', [ validateCounterRange ] ],
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
      onOk: () => this.deleteDashbaord([id]),
    });
  }

  deleteDashbaord(id : string[]) {
    this.spinnerService.show();
    this.dashboardService.deleteDashboard(id).subscribe(() => {
      this.spinnerService.hide();
      this.notification.create('success', '提示', '删除仪表盘成功！');
      this.requestData(true, false);
    }, err => {
      this.spinnerService.hide();
      this.notification.create('error', '异常', '仪表盘初删除异常，请联系管理员！');
    });
  }

  checkModifyForm() {
    for (const i in this.modifyForm.controls) {
      this.modifyForm.controls[ i ].markAsDirty();
    }
  }

  editDashboard(id) {
    const self = this;
    this.baseInfo = {...this.dashboards.find(i => i.id === id)};
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
            self.dashboardService.updateDashboard(id, {
              title: this.modifyForm.value['name'],
              tags: this.modifyForm.value['tags'],
              desc: this.modifyForm.value['remark'],
            }).subscribe(data => {
              this.notification.create('success', '提示', '修改仪表盘成功！');
              self.requestData(true, false);
              resolve();
            }, err =>  this.notification.create('error', '异常', '修改仪表盘异常，请联系管理员！'));
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
    const self = this;
    this.modalService.warn({
      title: '删除',
      content: `已选择${choiceList.length}个仪表盘，确定删除？`,
      remark: this.dashboards.filter(item => this.choiceList.includes(item.id)).map(item => item.title).join(','),
      onOk: () => {
        self.deleteDashbaord(choiceList);
        self.deleteModel();
      },
    });
  }
  
  allSelectChange() {
    if (this.isAll) {
      this.choiceList = [];
    } else {
      this.choiceList = (this.dashboards || []).map(item => item.url);
    }
  }

  tagChange($event) {
    this.includeTags = $event;
  }

  getFormControl(name) {
    return this.modifyForm.controls[ name ];
  }

  
}
