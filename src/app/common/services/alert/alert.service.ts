import { Injectable } from '@angular/core';
import { Alert, AlertType } from '../../models/alert';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlertService {
  private spinnerSubject: Subject<Alert> = new Subject<Alert>();
  constructor() { }

  getMessage(): Observable<Alert> {
    return this.spinnerSubject.asObservable();
  }

  success(alert: Alert) {
    alert.type = AlertType.SUCCESS;
    this.spinnerSubject.next(alert);
  }

  warn(alert: Alert) {
    alert.type = AlertType.WARNING;
    this.spinnerSubject.next(alert);
  }

  error(alert: Alert) {
    alert.type = AlertType.ERROR;
    this.spinnerSubject.next(alert);
  }

  info(alert: Alert) {
    alert.type = AlertType.INFO;
    this.spinnerSubject.next(alert);
  }

}
