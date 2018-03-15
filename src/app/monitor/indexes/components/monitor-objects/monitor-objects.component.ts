import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { Router} from '@angular/router';
import { ModalService } from "zu-modal";

import { LoadingService } from "../../../../common/share.module";
import { MonitorService } from '../../../../common/services/monitor/monitor.service';
import { MonitorObject } from "../../../../common/models/monitor/monitor-object";

import { ObjectDeleteModalComponent } from '../object-delete-modal/object-delete-modal.component';

@Component({
  selector: "bomp-monitor-objects",
  templateUrl: "./monitor-objects.component.html",
  styleUrls: ["./monitor-objects.component.scss"]
})
export class MonitorObjectsComponent implements OnInit {
  @ViewChild('tplDelete')
  tplDelete: TemplateRef<any>;

  searchText: string = '';
  monitorTags: Array<string>;
  monitorObjects: Array<MonitorObject>;
  monitorFiltedObjects: Array<MonitorObject>;
  monitorDeleteList: Array<MonitorObject> = new Array<MonitorObject>();
  
  selectedTags = [];
  allChecked = false;
  isBatchDeleteable: boolean = false;

  constructor(
    private _router: Router, 
    private _monitorService: MonitorService,
    private spinnerService: LoadingService,
    private modalService: ModalService) {}

  ngOnInit() {
    this._monitorService.getMonitorObjs().subscribe({
      next: (data: any)=>{
        this.monitorObjects = data || [];

        // TODO: only for test
        this.monitorObjects.push(...this.monitorObjects);
        this.monitorObjects.push(...this.monitorObjects);

        this.monitorFiltedObjects = this.monitorObjects;
      }
    });

    this._monitorService.getMonitorTags().subscribe({
      next: (data: any)=>{
        this.monitorTags = data || [];
      }
    });
  }

  onSearch(): void {
    this.monitorFiltedObjects = this.monitorObjects.filter((item)=>{
      return this.searchText == '' ? true : item.name.includes(this.searchText) || item.tags.includes(this.searchText);
    });
  }

  changeCheckTag(tag) {
    if(this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(item => item !== tag);
    } else {
      if(tag === 'all'){
        this.selectedTags = [];
      } else {
        this.selectedTags = this.selectedTags.filter(item => item !== 'all');
      }
      this.selectedTags.push(tag);
    }

    this.monitorFiltedObjects = this.monitorObjects.filter((item)=>{
      return this.selectedTags.includes('all') ? true : item.tags.some(r=> this.selectedTags.includes(r));
    });
  }

  newObject() {
    this._router.navigateByUrl("/monitor/indexes/add");
  }

  batchDeleteObjects() {
    this.isBatchDeleteable = true;
  }

  // confirmBatchDelete() {
  //   const subscription = this._modalService.open({
  //     title          : this.tplDelete,
  //     content        : ObjectDeleteModalComponent,
  //     footer         : false,
  //     closable: true,
  //     maskClosable: false,
  //     componentParams: {
  //       monitorObjects: this.monitorDeleteList
  //     },
  //   });

  //   subscription.subscribe(result => {
  //     if(result["deletedArray"]){
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
  confirmBatchDelete() {
    this.modalService.warn({
      title: "批量删除",
      content: `已选择${this.monitorDeleteList.length}个仪表盘，确定删除？`,
      remark: this.monitorDeleteList.map(item => item.name).join(','),
      onOk: () => this.delete()
    });
  }

  delete(){
    this.spinnerService.show();
    this._monitorService
      .deleteMonitorObjects(this.monitorDeleteList)
      .subscribe(result => {
        this.spinnerService.hide();

        this.refreshMonitorObjects();
        this.monitorDeleteList = [];
      });
  }

  cancelBatchDelete() {
    this.isBatchDeleteable = false;
  }

  refreshMonitorObjects(){
     // 前端删除 or 后端重新获取数据???
    this.monitorObjects = this.monitorObjects.filter((item)=>{
      return !this.monitorDeleteList.includes(item);
    });
    this.monitorFiltedObjects = this.monitorObjects;
  }

  // output event
  cardSelectChanged(event: any){
    if(event.selected) {
      // 如果原来已存则不重复存
      if(!this.monitorDeleteList.some(r => { return r.id == event.monitorObject.id})){
        this.monitorDeleteList.push(event.monitorObject);
      }
    } else {
      this.monitorDeleteList = this.monitorDeleteList.filter(item => item.id !== event.monitorObject.id);
    }
  }

  cardDeleteChanged(event: any){
    this.monitorDeleteList.push(event.monitorObject);
    this.delete();
  }
}
