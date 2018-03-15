import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TitleService {
  private spinnerSubject: Subject<any> = new Subject<any>();
  constructor() { }

  getMessage(): Observable<any> {
    return this.spinnerSubject.asObservable();
  }

  sendMsg(msg: any):void {
    this.spinnerSubject.next(msg);
  }

}
