import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalService } from "zu-modal";

import { LoadingService } from "../../../../common/share.module";
import { DataSource } from "../../../../common/models/data-source";
import { DataSourceService } from "../../../../common/services/data-source/data-source.service";

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
    private spinnerService: LoadingService,
    private modalService: ModalService,
    private datasourceService: DataSourceService
  ) {}

  ngOnInit() {
    // this.datasourceService.getAll().subscribe(data => {
    //   this.dataSources = data;

    //   this.dataSources.push(...this.dataSources);
    //   this.dataSources.push(...this.dataSources);
    // });
  }

  onConfirmDelete(dataSource: DataSource) {
    this.modalService.warn({
      title: "删除",
      content: `确定删除数据源：${dataSource.name}吗？`,
      onOk: () => {
        this.spinnerService.show();
        this.datasourceService
          .deleteDataSource([dataSource.id])
          .subscribe(result => {
            this.spinnerService.hide();

            // this.refreshMonitorObjects();
          });
      }
    });
  }
  

  addDatasource() {
    this.router.navigateByUrl("/console/datasourcecontrol/add");
  }
}
