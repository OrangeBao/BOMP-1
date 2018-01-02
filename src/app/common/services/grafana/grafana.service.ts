import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GrafanaService {

  ele: any;
  constructor(private http: HttpClient, private userService: UserService) {}

  createIframe(ele) {
    document.getElementsByTagName('head')[0].appendChild(ele);
  }

  removeIframe(ele) {
    document.getElementsByTagName('head')[0].removeChild(ele);
  }

  login() {
    this.ele = document.createElement('iframe');
    const ele = this.ele;
    ele.style.display = 'none';
    ele.src = environment.grafanaHost + '/login#' + this.userService.getUserInfo().geass;
    this.createIframe(ele);
    const self = this;
    const onLoad = function(e) {
      setTimeout(() => self.removeIframe(ele), 4000);
    };
    if (ele.attachEvent) {
      ele.attachEvent('onload', onLoad);
    } else {
      ele.onload = onLoad;
    }
  }

  logout() {
    this.ele = document.createElement('iframe');
    const ele = this.ele;
    ele.style.display = 'none';
    ele.src = environment.grafanaHost + '/logout';
    this.createIframe(ele);
    const self = this;
    const onLoad = function(e) {
      setTimeout(() => self.removeIframe(ele), 4000);
    };
    if (ele.attachEvent) {
      ele.attachEvent('onload', onLoad);
    } else {
      ele.onload = onLoad;
    }
  }

}
