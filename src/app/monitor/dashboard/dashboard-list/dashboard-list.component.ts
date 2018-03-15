import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DashboardService } from '../../../common/services/dashboard/dashboard.service';
import { UserService } from '../../../common/services/user/user.service';
import { NotificationsService, LoadingService } from '../../../common/share.module';
import { ModalService } from 'zu-modal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Dashboard } from '../../../common/models/dashboard';
import { validateCounterRange } from '../../../common/directives/tag-input/tag-input.component';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
  @ViewChild('modifyFormUrl') modifyFormUrl: TemplateRef<any>;
  choiceList: Array<string> = [];
  isDeleteModel: boolean = false;

  isTouched: boolean = false;

  baseInfo: any = {};
  modifyForm: FormGroup;

  constructor(
      private dashboardService: DashboardService,
      private userService: UserService,
      private spinnerService: LoadingService,
      private notificationsService: NotificationsService,
      private modalService: ModalService,
      private fb: FormBuilder
  ) {
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

  ngOnInit() {
    this.spinnerService.show();
    this.dashboardService.getDashboardList().then(response => {
      this.spinnerService.hide();
      this.dashboards = response;
    }).catch(err => {
      this.spinnerService.hide();
      this.notificationsService.addError('系统异常，请联系管理员！');
      console.error(err);
    });
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
      this.notificationsService.addError('系统异常，请联系管理员！');
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
    // this.baseInfo = this.dashboards.find(i => i.uri === id);
    // this.modalService.show(this.editModalId);
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
  
  modifyInfo() {
    // if (!this.baseInfoForm.valid) {
    //   this.isTouched = true;
    // } else {
    //   // this.modalService.hide(this.editModalId);
    // }
  }

  isChoice(uri) {
    return this.choiceList.includes(uri);
  }

  deleteModel() {
    this.choiceList = [];
    this.isDeleteModel = !this.isDeleteModel;
  }
  addChoice(uri, event) {
    if (this.isDeleteModel) {
      if (this.choiceList.includes(uri)) {
        this.choiceList = this.choiceList.filter(i => i !== uri);
      } else {
        this.choiceList.push(uri);
      }
    }
  }
  confirmDelete() {
    const choiceList = this.choiceList;
    if (choiceList.length === 0) return;
    debugger;
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
