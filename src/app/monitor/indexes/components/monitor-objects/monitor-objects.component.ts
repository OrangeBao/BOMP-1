import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import { Router} from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { MonitorService } from '../../../../common/services/monitor/monitor.service';
import { MonitorObject } from "../../../../common/models/monitor/monitor-object";

import { ObjectDeleteModalComponent } from '../object-delete-modal/object-delete-modal.component';

@Component({
  selector: "bomp-monitor-objects",
  templateUrl: "./monitor-objects.component.html",
  styleUrls: ["./monitor-objects.component.scss"]
})
export class MonitorObjectsComponent implements OnInit {
  // TODO: temp
  public hotTags = ["Movie", "Book", "Music"];
  public selectedTags = [];

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log("You are interested in: ", this.selectedTags);
  }

  changeCheckTag(tag) {
    if(this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(item => item !== tag);
    } else {
      this.selectedTags.push(tag);
    }
  }
  // temp end

  @ViewChild('tplDelete')
  tplDelete: TemplateRef<any>;

  searchText: string;
  monitorTags: Array<string>;
  monitorObjects: Array<MonitorObject>;
  monitorFiltedObjects: Array<MonitorObject>;
  monitorDeleteList: Array<MonitorObject> = new Array<MonitorObject>();
  

  allChecked = false;
  isBatchDeleteable: boolean = false;

  constructor(private _router: Router, private _monitorService: MonitorService, private _modalService: NzModalService) {}

  ngOnInit() {
    this._monitorService.getMonitorObjs().subscribe({
      next: (data: any)=>{
        this.monitorObjects = data || [];
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
      return item.name.includes(this.searchText) || item.tags.includes(this.searchText);
    });
  }

  newObject() {
    this._router.navigateByUrl("/monitor/monitorobj/add") 
  }

  batchDeleteObjects() {
    this.isBatchDeleteable = true;
  }

  checkAllObjects(){
    if(this.allChecked){

    }
  }

  confirmBatchDelete() {
    const subscription = this._modalService.open({
      title          : this.tplDelete,
      content        : ObjectDeleteModalComponent,
      footer         : false,
      closable: true,
      maskClosable: false,
      componentParams: {
        monitorObjects: this.monitorDeleteList
      },
    });

    subscription.subscribe(result => {
      if(result["deletedArray"]){
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

  cancelBatchDelete() {
    this.isBatchDeleteable = false;
  }


  // output event
  cardSelectChanged(event: any){
    if(event.selected) {
      this.monitorDeleteList.push(event.monitorObject);
    } else {
      this.monitorDeleteList = this.monitorDeleteList.filter(item => item.id !== event.monitorObject.id);
    }
  }
}
