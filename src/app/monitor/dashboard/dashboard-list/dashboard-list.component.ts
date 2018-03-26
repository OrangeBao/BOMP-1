import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { ModalService } from 'zu-modal';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { DashboardService } from '../../../common/services/dashboard/dashboard.service';
import { UserService } from '../../../common/services/user/user.service';
import { LoadingService } from '../../../common/share.module';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Dashboard } from '../../../common/models/dashboard';
import { validateCounterRange } from '../../../common/directives/tag-input/tag-input.component';
import { PageComponent } from '../../../common/components/page.component';


@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent extends PageComponent<Dashboard> implements OnInit  {
  @ViewChild('modifyFormUrl') modifyFormUrl: TemplateRef<any>;

  baseInfo: any = {};
  modifyForm: FormGroup;

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

  get homePage() {
    return this.userService.getUserInfo().homePage;
  }


  appendData(queryParams) {
    return this.dashboardService.getDashboardList().pipe(
      catchError(err => {
        this.notification.create('error', '异常', '仪表盘初始化异常，请联系管理员！');
        return Observable.of({
          content: []
        });
      })
    );
  }

  ngOnInit() {
    this.requestData(true);
  }

  setHomePage(uri) {
    this.spinnerService.show();
    this.userService.setHomePage(uri).then(() => this.spinnerService.hide());
  }

  deleteDataSource(id) {
    this.modalService.warn({
      title: '删除',
      content: `确定删除仪表${id}吗？`,
      onOk: () => this.deleteRequest([id]),
    });
  }

  batchDeleteDataSource() {
    const choiceList = this.choiceList;
    if (choiceList.length === 0) return;
    const self = this;
    this.modalService.warn({
      title: '删除',
      content: `已选择${choiceList.length}个仪表盘，确定删除？`,
      remark: this.dataSource.filter(item => this.choiceList.includes(item.id)).map(item => item.title).join(','),
      onOk: () => {
        self.deleteRequest(choiceList);
        self.batchModel();
      },
    });
  }

  deleteRequest(id: string[]) {
    this.spinnerService.show();
    this.dashboardService.deleteDashboard(id).subscribe(() => {
      this.spinnerService.hide();
      this.notification.create('success', '提示', '删除仪表盘成功！');
      this.requestData(true);
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

  getFormControl(name) {
    return this.modifyForm.controls[ name ];
  }

  editDashboard(id) {
    const self = this;
    this.baseInfo = {...this.dataSource.find(i => i.id === id)};
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
              this.requestData(true);
              resolve();
            }, err =>  this.notification.create('error', '异常', '修改仪表盘异常，请联系管理员！'));
          } else {
            reject();
          }
        });
      }
    });
  }  
}
