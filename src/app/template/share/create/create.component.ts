import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { File } from '../../../common/models/file';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../common/services/user/user.service';
import { TemplateService } from '../../../common/services/template/template.service';
import { NotificationsService } from '../../../common/share.module';
import { Ng4LoadingSpinnerService } from '../../../loading';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  files: Array<File> = new Array<File>();
  templateType = 'custom';
  grafanaHostDashboardUrl: SafeUrl;
  slug: string;
  constructor(
      private router: Router,
      protected notificationsService: NotificationsService,
      private templateService: TemplateService,
      private sanitizer: DomSanitizer,
      private userService: UserService,
      private spinnerService: Ng4LoadingSpinnerService
  ) { }

  get canCreate() {
    if (this.templateType === 'custom') {
      return !this.slug;
    } else {
      return this.files.length === 0;
    }
  }

  ngOnInit() {
    window.addEventListener('message', this.custTemplateHandler.bind(this), false);
    this.grafanaHostDashboardUrl = this.sanitizer
        .bypassSecurityTrustResourceUrl(
            environment.grafanaHost + 'dashboard/new?editview=settings&orgId='
            + this.userService.getUserInfo().graOrg.template);
  }

  createByForm() {
    this.spinnerService.show();
    this.templateService.create({
      renterType: 'USER',
      renterId: 0,
      module: 'TEMPLATE',
      moduleStr: `db/${this.slug}`
    }).subscribe(
        () => {
          this.spinnerService.hide();
          this.notificationsService.addInfo('创建成功');
          this.router.navigate(['/template/share/list']);
        },
        () => {
          this.spinnerService.hide();
          this.notificationsService.addError('创建失败');
        }
    );
  }
  create() {
    if (this.templateType === 'custom') {
      this.createByForm();
    } else {
      this.createByFiles();
    }
  }

  fileChange(fileList) {
    this.files = fileList;
  }

  custTemplateHandler(event) {
    if (event && event.data) {
      if (Object.prototype.toString.call(event.data) === '[object String]') {
        const res = JSON.parse(event.data);
        if (res.slug) {
          this.slug = res.slug;
        }
      }
    }
  }

  createByFiles() {
    this.spinnerService.show();
    this.templateService.createByFile(this.files.map(f => f.id)).subscribe(
        (res: any) => {
          this.spinnerService.hide();
          if (res.failed && res.failed.length > 0) {
            this.notificationsService.addError('创建失败');
          } else {
            this.notificationsService.addInfo('创建成功');
            this.router.navigate(['/template/share/list']);
          }
        },
        () => {
          this.spinnerService.hide();
          this.notificationsService.addError('创建失败');
        }
    );
  }

}
