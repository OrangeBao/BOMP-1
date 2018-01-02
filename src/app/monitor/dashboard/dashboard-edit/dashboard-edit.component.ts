import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../common/services/user/user.service';
import { environment } from '../../../../environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss']
})
export class DashboardEditComponent implements OnInit {
  pageUrl: SafeUrl;
  constructor(
      private sanitizer: DomSanitizer,
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route
        .fragment
        .map(fragment => fragment || '').subscribe(
        uri => {
          this.pageUrl = this.sanitizer
              .bypassSecurityTrustResourceUrl(environment.grafanaHost + 'dashboard/' + uri + '?orgId=' + this.userService.getDashboardId());
        }
    );
  }

}
