import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Dashboard } from '../../models/dashboard';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getDashboardList(params?: any): Observable<any> {
    return this.http.get(`api/monitor/dashboards`, {params});
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  createDashboard(params): Observable<any> {
    return this.http.post('api/monitor/dashboards', params);
  }

  updateDashboard(dashboardId, params): Observable<any> {
    return this.http.put(`api/monitor/dashboards/${dashboardId}`, params);
  }
  
  deleteDashboard(ids: number[]): Observable<any> {
    return this.http.delete(`api/monitor/dashboards?${ids.map(id => 'id=' + id).join('&')}`);
  }

}
