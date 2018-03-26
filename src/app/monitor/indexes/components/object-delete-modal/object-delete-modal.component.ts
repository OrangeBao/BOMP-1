import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'app-object-delete-modal',
  templateUrl: './object-delete-modal.component.html',
  styleUrls: ['./object-delete-modal.component.scss']
})
export class ObjectDeleteModalComponent implements OnInit {
  @Input() monitorObjects: Array<any>;

  constructor(private subject: NzModalSubject) {
  }

  ngOnInit() {

  }

  confirm(e) {
    const deletedArray: Array<any> = this.monitorObjects.map(item => item.id);
    this.subject.next({deletedArray: deletedArray});
  }

  cancel(e) {
    this.subject.destroy('onCancel');
  }

}
