import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TemplateService {

  private templateUrl = "api/monitor/templates";

  constructor(private http: HttpClient, private userService: UserService) { }

  getTemplateList(): Observable<any> {
    return this.http.get(`${this.templateUrl}`);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(params) {
    return this.http.post('api/manager/relations', params);
  }

  createByFile(params) {
    return this.http.post('api/manager/templates/files', params);
  }

  deleteTemplate(id): Promise<any> {
    return this.http.delete(`api/manager/templates/${id}`).toPromise().catch(this.handleError);
  }

}
