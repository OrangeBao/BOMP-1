import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingService {
  private spinnerSubject: Subject<any> = new Subject<any>();
  constructor() { }

  getMessage(): Observable<any> {
    return this.spinnerSubject.asObservable();
  }

  show(): void {
    this.spinnerSubject.next(true);
  }

  hide(): void {
    this.spinnerSubject.next(false);
  }
}
