import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';

@Injectable()
export class TemplateService {

  private templateUrl = "api/relations/templates";

  constructor(private http: HttpClient, private userService: UserService) { }

  getAll(): Promise<any> {
    return this.http.get(`${this.templateUrl}?renterType=USER&renterId=${this.userService.getUserInfo().userId}`)
        .toPromise()
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(params) {
    return this.http.post('api/relations', params);
  }

  createByFile(params) {
    return this.http.post('api/templates/files', params);
  }

  deleteTemplate(id): Promise<any> {
    return this.http.delete(`api/templates/${id}`).toPromise().catch(this.handleError);
  }

}
