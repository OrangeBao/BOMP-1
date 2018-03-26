import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TemplateService {

  private templateUrl = "api/monitor/templates";

  constructor(private http: HttpClient, private userService: UserService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getTemplateList(): Observable<any> {
    return this.http.get(`${this.templateUrl}`);
  }

  create(params) {
    return this.http.post('api/manager/relations', params);
  }

  createByFile(params): Observable<any> {
    return this.http.post('api/monitor/templates/import', params);
  }

  deleteTemplate(ids: string[]): Observable<any> {
    return this.http.delete(`api/monitor/templates?${ids.map(id => 'id=' + id).join('&')}`);
  }

}
