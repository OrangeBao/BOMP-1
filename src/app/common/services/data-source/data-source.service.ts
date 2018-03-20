import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import {Observable} from 'rxjs/Observable';
import { DataSource} from '../../models/data-source';

const DATA_SOURCE_URL = 'api/monitor/datasources';

@Injectable()
export class DataSourceService {

  constructor(private http: HttpClient, private userService: UserService) { }

  // getAll(): Promise<any> {
  //   return this.http.get(`api/manager/relations/datasources?renterType=USER&renterId=${this.userService.getUserInfo().userId}`)
  //       .toPromise()
  //       .catch(this.handleError);
  // }
  //new getAll
  getAll(number: number, size?: number): Observable<any> {
    let url = `api/monitor/datasources?number=${number}`;
    if(size) {
      url += `&size=${size}`;
    }
    return this.http.get(url);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  checkUrl(uri: string) {
    return this.http.get(`api/manager/datasources/checkConn?url=${uri}`)
        .toPromise()
        .catch(this.handleError);
  }

  checkUrlFile(fileId: Array<number>): Observable<any> {
    return this.http.put(`api/manager/datasources/checkConn`, fileId);
        // .toPromise()
        // .catch(this.handleError);
  }

  addDataSource(dataSource: DataSource): Observable<any> {
    return this.http.post(DATA_SOURCE_URL, dataSource);
  }
  // TODO: 还有用吗
  create(params): Promise<any> {
    return this.http.post('api/manager/datasources', params).toPromise().catch(this.handleError);
  }

  update(params): Promise<any> {
    return this.http.put(`api/manager/datasources/${params.id}`, params).toPromise();
  }

  createByFiles(fileIds: Array<number>): Observable<any> {
    return this.http.post(`api/manager/datasources/files`, fileIds);
  }

  // deleteDataSource(id): Promise<any> {
  //   return this.http.delete(`api/manager/datasources/${id}`).toPromise().catch(this.handleError);
  // }
  deleteDataSource(idArray: Array<number>): Observable<any> {
    let params = '';
    idArray.forEach((value, index) => {
      if(index === 0) {
        params += '?id=' + value;
      } else {
        params += '&id=' + value;
      }
    });

    return this.http.delete(DATA_SOURCE_URL + params);
  }
}
