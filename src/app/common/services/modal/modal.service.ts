import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Modal } from '../../models/modal';
@Injectable()
export class ModalService {
  private spinnerSubject: Subject<Modal> = new Subject<Modal>();
  constructor() { }

  getMessage(): Observable<Modal> {
    return this.spinnerSubject.asObservable();
  }

  show(modalId: string):void {
    this.spinnerSubject.next({
      flag: true,
      modalId
    });
  }

  hide(modalId: string):void {
    this.spinnerSubject.next({
      flag: false,
      modalId
    });
  }

}
