import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from '../../models/user-info.model';

@Injectable()
export class UserService {

  private userUrl = 'api/user/currentUser';
  private userInfo: UserInfo;
  constructor(private http: HttpClient) {
  }

  load() {
    return this.http.get(this.userUrl)
        .toPromise().then((response: UserInfo) => {
          this.userInfo = response;
          localStorage.setItem('userId', '' + this.userInfo.userId);
        })
        .catch(this.handleError);
  }

  getUserInfo() {
    return this.userInfo;
  }
  checkMenu(url) {
    if (!this.userInfo) {
      return false;
    }
    return this.userInfo.menus.indexOf(url.split('/')[1]) !== -1;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  setHomePage(moduleStr: string) {
    return this.http.put('api/manager/relations/homePage', { renterId: this.getUserInfo().userId, moduleStr})
        .toPromise().then(res => this.userInfo.homePage = moduleStr)
        .catch(this.handleError);
  }

  getHomePage(): string {
    return this.userInfo.homePage;
  }

  getDashboardId(): number {
    return this.userInfo.graOrg && this.userInfo.graOrg.dashboard;
  }

}
