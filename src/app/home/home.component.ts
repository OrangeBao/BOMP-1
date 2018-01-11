import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user/user.service';
import { environment } from '../../environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private sanitizer: DomSanitizer, private userService: UserService) { }
  hasHomePage: boolean;
  homePage: SafeUrl;
  ngOnInit() {
      if (this.userService.getHomePage()) {
          this.hasHomePage = true;
          this.homePage = this.sanitizer
                  .bypassSecurityTrustResourceUrl(
                      environment.grafanaHost + 'dashboard/' +
                      this.userService.getHomePage() + '?orgId='
                      + this.userService.getDashboardId() + '&from=now-24h&to=now&refresh=5');
      } else {
          this.hasHomePage = false;
      }
  }
}
