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
import { ModalService } from "zu-modal";

import { LoadingService } from "../../../../common/share.module";

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
  @Input("isSelected") public isSelected: boolean;
  @Input("monitorObject") public monitorObject: any;

  @Output() public selectChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() public deleteChanged: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("tplEdit") tplEdit: TemplateRef<any>;
  @ViewChild("tplDelete") tplDelete: TemplateRef<any>;


  isMouseOvered: boolean = false;

  constructor(
    private _modalService: NzModalService,
    private _monitorService: MonitorService,
    private spinnerService: LoadingService,
    private modalService: ModalService
  ) {}

  ngOnInit() {}

  // isSelectable 变化后，是否需清空选中的card的样式
  ngOnChanges(changes: SimpleChanges) {
    if(changes.isSelected && !changes.isSelected.firstChange){
      this.selectChanged.emit({
        monitorObject: this.monitorObject,
        selected: changes.isSelected.currentValue
      });
    }
  }

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

  // confirmDelete() {
  //   const subscription = this._modalService.open({
  //     title: this.tplDelete,
  //     content: ObjectDeleteModalComponent,
  //     footer: false,
  //     closable: true,
  //     maskClosable: false,
  //     componentParams: {
  //       monitorObjects: [this.monitorObject]
  //     }
  //   });
  //   subscription.subscribe(result => {
  //     if (result["deletedArray"]) {
  //       const deletedArray = result.deletedArray;
  //       this._monitorService
  //         .deleteMonitorObjects(deletedArray)
  //         .subscribe(result => {
  //           console.log(111);
  //         });
  //       subscription.destroy();
  //     }
  //   });
  // }
  confirmDelete() {
    this.modalService.warn({
      title: "删除",
      content: `确定删除监控对象${this.monitorObject.name}吗？`,
      onOk: () => {
        this.deleteChanged.emit({
          monitorObject: this.monitorObject
        });
      }
    });
  }

  // delete(id) {
    // const deletedArray = [id];
    // this.spinnerService.show();
    // this._monitorService
    //   .deleteMonitorObjects(deletedArray)
    //   .subscribe(result => {
    //     this.spinnerService.hide();
    //     this.deleteChanged.emit({
    //       monitorObject: this.monitorObject
    //     });
    //   });
  // }
}