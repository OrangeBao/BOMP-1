import { Component, OnInit } from "@angular/core";

@Component({
  selector: "bomp-monitor-objects",
  templateUrl: "./monitor-objects.component.html",
  styleUrls: ["./monitor-objects.component.scss"]
})
export class MonitorObjectsComponent implements OnInit {
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


  monitorObject: any = {
    name: 'BI套件指标（全）',
    description: 'BI套件指标（全）的描述信息可能会非常非常非常非常非常非常非常非常非常非常',
    indexNum: 3,
    dataSource: '控制台-数据源管理',
    tags: ["Movie", "Book", "Music"]
  }


  //

  allChecked = false;


  isBatchDeleteable: boolean = false;

  constructor() {}

  ngOnInit() {}

  newObject() {}

  batchDeleteObjects() {
    this.isBatchDeleteable = true;
  }

  checkAllObjects(){
    if(this.allChecked){

    }
  }

  confirmBatchDelete() {}

  cancelBatchDelete() {
    this.isBatchDeleteable = false;
  }


  // output event
  cardSelectChanged(event: any){
    console.log(event);
  }
}
