import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class GrafanaService {

  ele: any;
  resolve: Function;
  resolveHandler = (event) => {
    if (event && event.data) {
      if (event.data === 'login' || event.data === 'logout') {
        this.resolve();
      }
    }
  }
  constructor(private http: HttpClient, private userService: UserService) {
    window.addEventListener('message', this.resolveHandler, false);
  }

  mockLogin() {
    return new Promise((resolve, reject) => {
      if (environment.notLogin) {
        resolve();
      }
      if (this.userService.getUserInfo().geass) {
        this.login(resolve);
      } else {
        this.logout(resolve);
      }
      setTimeout(() => {
        reject('连接超时');
      }, 10000);
    }).catch(err => {
      console.error(err);
    });
  }

  createIframe(ele) {
    document.getElementsByTagName('head')[0].appendChild(ele);
  }

  removeIframe(ele) {
    document.getElementsByTagName('head')[0].removeChild(ele);
  }

  login(resolve) {
    this.resolve = resolve;
    this.ele = document.createElement('iframe');
    const ele = this.ele;
    ele.style.display = 'none';
    ele.src = environment.grafanaHost + 'autoLogin#' + this.userService.getUserInfo().geass;
    this.createIframe(ele);
    const self = this;
    const onLoad = function(e) {
      // setTimeout(() => {
      //   self.removeIframe(ele);
      // }, 10000);
    };
    if (ele.attachEvent) {
      ele.attachEvent('onload', onLoad);
    } else {
      ele.onload = onLoad;
    }
  }

  logout(resolve) {
    this.resolve = resolve;
    this.ele = document.createElement('iframe');
    const ele = this.ele;
    ele.style.display = 'none';
    ele.src = environment.grafanaHost + 'autoLogout';
    this.createIframe(ele);
    const self = this;
    const onLoad = function(e) {
      // setTimeout(() => {
      //   self.removeIframe(ele);
      // }, 10000);
    };
    if (ele.attachEvent) {
      ele.attachEvent('onload', onLoad);
    } else {
      ele.onload = onLoad;
    }
  }

}
