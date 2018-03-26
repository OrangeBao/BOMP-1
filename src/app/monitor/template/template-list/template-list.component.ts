import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { TemplateService } from '../../../common/services/template/template.service';
import { UserService } from '../../../common/services/user/user.service';
import { LoadingService } from '../../../common/share.module';
import { ModalService } from 'zu-modal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Template } from '../../../common/models/template';
import { validateCounterRange } from '../../../common/directives/tag-input/tag-input.component';
import { NzNotificationService } from 'ng-zorro-antd';

import { PageComponent } from '../../../common/components/page.component';


@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent extends PageComponent implements OnInit {

  @ViewChild('modifyFormUrl') modifyFormUrl: TemplateRef<any>;

  baseInfo: any = {};
  modifyForm: FormGroup;

  sort: any;   // 排序
  filter: any; // 过滤

  constructor(
      private templateService: TemplateService,
      private userService: UserService,
      private spinnerService: LoadingService,
      private notification: NzNotificationService,
      private modal: ModalService,
      private fb: FormBuilder
  ) {
    super();
    this.modifyForm = this.fb.group({
      name              : [ '', [ Validators.required ] ],
      tags              : [ '', [ validateCounterRange ] ],
      remark            : [ '' ],
    });
  }

  templates: Array<Template>;
  // displayDashboards: Array<Dashboard>;
  includeTags: string[];

  get isAll() {
    return this.templates && this.choiceList.length === this.templates.length;
  }

  get allTags() {
    return (this.templates || []).reduce((ret, item) => {
      const temp = new Set([...ret, ...(item.tags || [])]);
      return Array.from(temp);
    }, []);
  }

  get displayData(): Array<Template> {
    if (!this.includeTags || this.includeTags.length === 0) return this.templates;
    return (this.templates || []).filter(item => 
      (item.tags || []).find(t => this.includeTags.includes(t)));
  }

  requestData(needLoading, append) {
    needLoading && this.spinnerService.show();
    this.templateService.getTemplateList().subscribe(response => {
      needLoading && this.spinnerService.hide();
      if (append) {
        this.templates = [...this.templates, ...response.content];
      } else {
        this.templates = response.content
      }
    }, err => {
      needLoading && this.spinnerService.hide();
      this.notification.create('error', '异常', '模板始化异常，请联系管理员！');
      console.error(err);
    });
  }

  fetchData(endLoad, showNoMore) {
    this.templateService.getTemplateList().subscribe(response => {
      if (response.last === true) {
        showNoMore();
      } else {
        endLoad();
      }
      this.templates = [...this.templates, ...response.content];
    }, err => {
      this.notification.create('error', '异常', '模板始化异常，请联系管理员！');
      console.error(err);
    });
  }

  ngOnInit() {
    this.requestData(true, false);
  }

  deleteDashbaordConfirm(id) {
    this.modal.warn({
      title: '删除',
      content: `确定删除模板${id}吗？`,
      onOk: () => this.deleteDashbaord([id]),
    });
  }

  deleteDashbaord(id: string[]) {
    this.spinnerService.show();
    this.templateService.deleteTemplate(id).subscribe(() => {
       this.spinnerService.hide();
       this.requestData(true, false);
       this.notification.create('success', '提示', '模板删除成功！');
    }, err => {
      this.spinnerService.hide();
      this.notification.create('error', '异常', '模板删除失败，请联系管理员！');
    });
  }

  checkModifyForm() {
    for (const i in this.modifyForm.controls) {
      this.modifyForm.controls[ i ].markAsDirty();
    }
  }

  editDashboard(id) {
    this.baseInfo = {...this.templates.find(i => i.id === id)};
    this.modifyForm.controls['name'].setValue(this.baseInfo.title);
    this.modifyForm.controls['tags'].setValue(this.baseInfo.tags);
    this.modifyForm.controls['remark'].setValue(this.baseInfo.desc);
    this.modal.open({
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
    const self = this;
    const choiceList = this.choiceList;
    if (choiceList.length === 0) return;
    this.modal.warn({
      title: '删除',
      content: `已选择${choiceList.length}个仪表盘，确定删除？`,
      remark: this.templates.filter(item => this.choiceList.includes(item.id)).map(item => item.title).join(','),
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
      this.choiceList = (this.templates || []).map(item => item.id);
    }
  }

  tagChange($event) {
    this.includeTags = $event;
  }

  getFormControl(name) {
    return this.modifyForm.controls[ name ];
  }

  waitTips() {
    this.modal.info({
      title: '提示',
      content: '抱歉！该功能正在开发中...'
    });
  }

  

}
