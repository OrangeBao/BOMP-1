import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { File } from '../../../common/models/file';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../common/services/user/user.service';

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
  constructor(private sanitizer: DomSanitizer, private userService: UserService) { }

  ngOnInit() {
    window.addEventListener('message', this.custTemplateHandler, false);
    this.grafanaHostDashboardUrl = this.sanitizer
        .bypassSecurityTrustResourceUrl(environment.grafanaHost + 'dashboard/new?editview=settings&orgId=' +  this.userService.getUserInfo().graOrg.template);
  }

  create() {}

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

  uploadfile() {}

}
