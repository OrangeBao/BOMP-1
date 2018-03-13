import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../../../common/services/user/user.service';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/operator/map';
import { NotificationsService, LoadingService } from '../../../common/share.module';
import { TemplateService } from '../../../common/services/template/template.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  grafanaHostDashboardUrl: SafeUrl;
  moduleStr = '';
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private templateService: TemplateService,
      protected notificationsService: NotificationsService,
      private sanitizer: DomSanitizer,
      private userService: UserService,
      private spinnerService: LoadingService
  ) { }

  ngOnInit() {
    window.addEventListener('message', this.custTemplateHandler.bind(this), false);
    this.route
        .fragment
        .map(fragment => fragment || '').subscribe(
            uri => {
              this.moduleStr = uri;
              this.grafanaHostDashboardUrl = this.sanitizer
                  .bypassSecurityTrustResourceUrl(
                      environment.grafanaHost + 'dashboard/' + uri + '?editview=settings&orgId='
                      + this.userService.getUserInfo().graOrg.template + '&from=now-24h&to=now&refresh=5s');
            }
        );
  }

  custTemplateHandler(event) {
    if (event && event.data) {
      if (Object.prototype.toString.call(event.data) === '[object String]') {
        const res = JSON.parse(event.data);
        if (res.slug) {
          this.moduleStr = `db/${res.slug}`;
        }
      }
    }
  }

  create() {
    this.spinnerService.show();
    this.templateService.create({
      renterType: 'USER',
      renterId: 0,
      module: 'TEMPLATE',
      moduleStr: this.moduleStr
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
}
