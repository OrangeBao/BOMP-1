import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Dashboard } from '../../models/dashboard';

@Injectable()
export class DashboardService {

  private dashboardUrl = "api/manager/relations/dashboards";

  constructor(private http: HttpClient, private userService: UserService) { }

  getDashboardList(): Promise<any> {
    return this.http.get(`${this.dashboardUrl}?renterType=USER&renterId=${this.userService.getUserInfo().userId}`)
        .toPromise()
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(params): Promise<any> {
    return this.http.post('api/manager/dashboards', params).toPromise().catch(this.handleError);
  }
  deleteDashboard(slug): Promise<any> {
    return this.http.delete(`api/manager/dashboards/${slug}`).toPromise().catch(this.handleError);
  }
}
