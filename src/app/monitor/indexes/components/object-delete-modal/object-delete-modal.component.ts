import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'bomp-object-delete-modal',
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
    const deletedArray: Array<string> = _.map(this.monitorObjects, _.partialRight(_.pick, ['name']));
    this.subject.next({deletedArray: deletedArray});
  }

  cancel(e) {
    this.subject.destroy('onCancel');
  }

}
