import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { NzModalService } from 'ng-zorro-antd';

import { IndexEditorModalComponent } from '../index-editor-modal/index-editor-modal.component';

@Component({
  selector: "bomp-monitor-indexes",
  templateUrl: "./monitor-indexes.component.html",
  styleUrls: ["./monitor-indexes.component.scss"]
})
export class MonitorIndexesComponent implements OnInit {
  // @ViewChild('tpl')
  // tpl: TemplateRef<any>;

  _allChecked = false;
  _indeterminate = false;
  _displayData = [];
  data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    }
  ];

  _displayDataChange($event) {
    this._displayData = $event;
    this._refreshStatus();
  }

  _refreshStatus() {
    const allChecked = this._displayData.every(value => value.checked === true);
    const allUnChecked = this._displayData.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = !allChecked && !allUnChecked;
  }

  _checkAll(value) {
    if (value) {
      this._displayData.forEach(data => {
        data.checked = true;
      });
    } else {
      this._displayData.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }

  constructor(private modalService: NzModalService) {}

  ngOnInit() {}



  editIndex(data: any) {
    console.log(data);

    this.modalService.open({
      title          : '编辑指标',
      content        : IndexEditorModalComponent,
      footer         : false,
      closable: true,
      maskClosable: false,
      componentParams: {
        index: data
      }
    });
  }
}
