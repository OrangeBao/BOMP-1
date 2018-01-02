import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataSourceService {

  constructor(private http: HttpClient, private userService: UserService) { }

  getAll(): Promise<any> {
    return this.http.get(`api/relations/datasources?renterType=USER&renterId=${this.userService.getUserInfo().userId}`)
        .toPromise()
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  checkUrl(uri: string) {
    return this.http.get(`api/datasources/checkConn?url=${uri}`)
        .toPromise()
        .catch(this.handleError);
  }

  checkUrlFile(fileId: Array<number>): Observable<any> {
    return this.http.put(`api/datasources/checkConn`, fileId);
        // .toPromise()
        // .catch(this.handleError);
  }

  create(params): Promise<any> {
    return this.http.post('api/datasources', params).toPromise().catch(this.handleError);
  }

  update(params): Promise<any> {
    return this.http.put(`api/datasources/${params.id}`, params).toPromise();
  }

  createByFiles(fileIds: Array<number>): Observable<any> {
    return this.http.post(`api/datasources/files`, fileIds);
  }

}
