import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { MonitorObject } from "../../models/monitor/monitor-object";

const MONITOR_OBJS_URL: string = "api/monitor/monitorobjs";
const MONITOR_TAGS_URL: string = "api/monitor/tags";

@Injectable()
export class MonitorService {
  constructor(private http: HttpClient) {}

  getMonitorObjs(): Observable<any> {
    return this.http.get(MONITOR_OBJS_URL);
  }

  getMonitorTags(): Observable<any> {
    return this.http.get(MONITOR_TAGS_URL);
  }

  addMonitorObject(monitorObj: MonitorObject): Observable<any> {
    return this.http.post(MONITOR_OBJS_URL, monitorObj);
  }

  editMonitorObject(monitorObj: MonitorObject): Observable<any> {
    const id = monitorObj.id;
    return this.http.put(MONITOR_OBJS_URL + "/" + id, monitorObj);
  }

  deleteMonitorObjects(monitorDeleteList: Array<any>): Observable<any> {
    let params = '';
    monitorDeleteList.forEach((value, index) => {
      if(index === 0) {
        params += '?id=' + value;
      } else {
        params += '&id=' + value;
      }
    });

    // TODO: 报错
    return this.http.delete(MONITOR_OBJS_URL);
  }
}
