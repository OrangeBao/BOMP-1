import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { NzModalService } from 'ng-zorro-antd';

import { ObjectEditorModalComponent } from '../object-editor-modal/object-editor-modal.component';
import { ObjectDeleteModalComponent } from '../object-delete-modal/object-delete-modal.component';

@Component({
  selector: "bomp-monitor-object-card",
  templateUrl: "./monitor-object-card.component.html",
  styleUrls: ["./monitor-object-card.component.scss"]
})
export class MonitorObjectCardComponent implements OnInit {
  @Input("isSelectable") public isSelectable: boolean;
  @Input("monitorObject") public monitorObject: any;

  @Output() public selectChanged: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('tplEdit')
  tplEdit: TemplateRef<any>;
  @ViewChild('tplDelete')
  tplDelete: TemplateRef<any>;

  isSelected: boolean = false;

  // TODO: isSelected变化后，应该清空选中的card的样式

  constructor(private modalService: NzModalService) {}

  ngOnInit() {}

  select() {
    if (this.isSelectable) {
      this.isSelected = !this.isSelected;

      this.selectChanged.emit({
        id: 1,
        selected: this.isSelected
      });
    }
  }

  edit(){
    this.modalService.open({
      title          : this.tplEdit,
      content        : ObjectEditorModalComponent,
      footer         : false,
      closable: true,
      maskClosable: false,
      componentParams: {
        monitorObject: this.monitorObject
      }
    });
  }

  delete(){
    const subscription = this.modalService.open({
      title          : this.tplDelete,
      content        : ObjectDeleteModalComponent,
      footer         : false,
      closable: true,
      maskClosable: false,
      componentParams: {
        monitorObjects: [this.monitorObject, this.monitorObject]
      },
    });

    subscription.subscribe(result => {
      if(result["deletedArray"]){
        const deletedArray = result.deletedArray;
        console.log(deletedArray);
      }
    })
  }
}
