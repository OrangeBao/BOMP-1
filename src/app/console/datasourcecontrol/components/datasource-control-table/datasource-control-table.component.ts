import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalService } from "zu-modal";

import { DataSourceService } from "../../../../common/services/data-source/data-source.service";
import { DataSource } from "../../../../common/models/data-source";

@Component({
  selector: "app-datasource-control-table",
  templateUrl: "./datasource-control-table.component.html",
  styleUrls: ["./datasource-control-table.component.scss"]
})
export class DatasourceControlTableComponent implements OnInit {
  // temp
  displayData = [];
  // end temp

  dataSources: Array<DataSource> = [];
  searchText: string;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private datasourceService: DataSourceService
  ) {}

  ngOnInit() {
    this.datasourceService.getAll().subscribe(data => {
      console.log(data);

      this.dataSources = data;
    });
  }

  onSearch(): void {
    // this.monitorFiltedObjects = this.monitorObjects.filter(item => {
    //   return this.searchText == ""
    //     ? true
    //     : item.name.includes(this.searchText) ||
    //         item.tags.includes(this.searchText);
    // });
  }

  displayDataChange($event) {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus() {}

  addDatasource() {
    this.router.navigateByUrl("/console/datasourcecontrol/add");
  }
}
