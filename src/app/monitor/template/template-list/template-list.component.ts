import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ModalService } from 'zu-modal';
import { NzNotificationService } from 'ng-zorro-antd';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { TemplateService } from '../../../common/services/template/template.service';
import { UserService } from '../../../common/services/user/user.service';
import { LoadingService } from '../../../common/share.module';
import { Template } from '../../../common/models/template';
import { validateCounterRange } from '../../../common/directives/tag-input/tag-input.component';
import { PageComponent } from '../../../common/components/page.component';


@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent extends PageComponent<Template> implements OnInit {

  @ViewChild('modifyFormUrl') modifyFormUrl: TemplateRef<any>;

  baseInfo: any = {};  
  
  constructor(
      private templateService: TemplateService,
      private userService: UserService,
      private spinnerService: LoadingService,
      private notification: NzNotificationService,
      private modalService: ModalService,
  ) {
    super();
  }

  appendData(queryParams) {
    return this.templateService.getTemplateList().pipe(
      catchError(err => {
        this.notification.create('error', '异常', '模板始化异常，请联系管理员！');
        return Observable.of({
          content: []
        });
      })
    );
  }

  ngOnInit() {
    debugger;
    this.requestData(true);
  }

  deleteDataSource(id) {
    this.modalService.warn({
      title: '删除',
      content: `确定删除模板${id}吗？`,
      onOk: () => this.deleteRequest([id]),
    });
  }

  batchDeleteDataSource() {
    const choiceList = this.choiceList;
    if (choiceList.length === 0) return;
    const self = this;
    this.modalService.warn({
      title: '删除',
      content: `已选择${choiceList.length}个模板，确定删除？`,
      remark: this.dataSource.filter(item => this.choiceList.includes(item.id)).map(item => item.title).join(','),
      onOk: () => {
        self.deleteRequest(choiceList);
        self.batchModel();
      },
    });
  }

  deleteRequest(id : string[]) {
    this.spinnerService.show();
    this.templateService.deleteTemplate(id).subscribe(() => {
      this.spinnerService.hide();
      this.notification.create('success', '提示', '模板删除成功！');
      this.requestData(true);
    }, err => {
      this.spinnerService.hide();
      this.notification.create('error', '异常', '模板删除失败，请联系管理员！');
    });
  }

}
