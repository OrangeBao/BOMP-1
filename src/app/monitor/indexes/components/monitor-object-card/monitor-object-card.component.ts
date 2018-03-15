import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  TemplateRef,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { NzModalService } from "ng-zorro-antd";

import { ObjectEditorModalComponent } from "../object-editor-modal/object-editor-modal.component";
import { ObjectDeleteModalComponent } from "../object-delete-modal/object-delete-modal.component";
import { MonitorService } from "../../../../common/services/monitor/monitor.service";

@Component({
  selector: "bomp-monitor-object-card",
  templateUrl: "./monitor-object-card.component.html",
  styleUrls: ["./monitor-object-card.component.scss"]
})
export class MonitorObjectCardComponent implements OnInit {
  @Input("isSelectable") public isSelectable: boolean;
  @Input("monitorObject") public monitorObject: any;

  @Output() public selectChanged: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("tplEdit") tplEdit: TemplateRef<any>;
  @ViewChild("tplDelete") tplDelete: TemplateRef<any>;

  isSelected: boolean = false;
  isMouseOvered: boolean = false;

  // TODO: isSelectable 变化后，应该清空选中的card的样式

  constructor(
    private _modalService: NzModalService,
    private _monitorService: MonitorService
  ) {}

  ngOnInit() {}

  // ngOnChanges(changes: SimpleChanges) {
    // if(!changes.isSelectable){
    // }
  // }

  select() {
    if (this.isSelectable) {
      this.isSelected = !this.isSelected;

      this.selectChanged.emit({
        monitorObject: this.monitorObject,
        selected: this.isSelected
      });
    }
  }

  showMoreMenu(flag: boolean) {
    this.isMouseOvered = flag;
  }

  edit() {
    this._modalService.open({
      title: this.tplEdit,
      content: ObjectEditorModalComponent,
      footer: false,
      closable: true,
      maskClosable: false,
      componentParams: {
        monitorObject: this.monitorObject
      }
    });
  }

  delete() {
    const subscription = this._modalService.open({
      title: this.tplDelete,
      content: ObjectDeleteModalComponent,
      footer: false,
      closable: true,
      maskClosable: false,
      componentParams: {
        monitorObjects: [this.monitorObject]
      }
    });

    subscription.subscribe(result => {
      if (result["deletedArray"]) {
        const deletedArray = result.deletedArray;

        this._monitorService
          .deleteMonitorObjects(deletedArray)
          .subscribe(result => {
            console.log(111);
          });

        subscription.destroy();  
      }
    });
  }
}
