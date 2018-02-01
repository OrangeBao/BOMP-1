import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../../common/services/template/template.service';
import { UserService } from '../../../common/services/user/user.service';
import { NotificationsService, LoadingService } from '../../../common/share.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  template: Array<any>;
  constructor(
      private spinnerService: LoadingService,
      private templateService: TemplateService,
      private notificationsService: NotificationsService,
      private userService: UserService
  ) { }
  get homePage() {
    return this.userService.getUserInfo().homePage;
  }
  ngOnInit() {
    this.spinnerService.show();
    this.templateService.getAll().then(response => {
      this.template = response;
      this.spinnerService.hide();
    }).catch(err => {
      this.spinnerService.hide();
      this.notificationsService.addError('系统异常，请联系管理员！');
      console.error(err);
    });
  }

  deleteTemplate(id) {
    const param = id.split('b/')[1];
    this.spinnerService.show();
    this.templateService.deleteTemplate(param).then(() => {
      this.spinnerService.hide();
      this.template = this.template.filter(item => item.uri !== id);
    }).catch(err => {
      this.spinnerService.hide();
      this.notificationsService.addError('系统异常，请联系管理员！');
      console.error(err);
    });
  }
}
