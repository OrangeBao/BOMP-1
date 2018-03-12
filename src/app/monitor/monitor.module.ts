import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { DashboardRoutingModule } from "./monitor-routing.module";
import { MonitorComponent } from "./monitor.component";
import { DashboardListComponent } from "./dashboard/dashboard-list/dashboard-list.component";
import { DashboardSummaryComponent } from "./dashboard/dashboard-summary/dashboard-summary.component";
import { DashboardCreateComponent } from "./dashboard/dashboard-create/dashboard-create.component";
// import { DashboardEditComponent } from './dashboard/dashboard-edit/dashboard-edit.component';
import { DataSourceListComponent } from "./data-source/data-source-list/data-source-list.component";
import { DataSourceCreateComponent } from "./data-source/data-source-create/data-source-create.component";
import { DataSourceEditComponent } from "./data-source/data-source-edit/data-source-edit.component";

import { ShareModule } from "../common/share.module";
import { DashboardScanComponent } from "./dashboard/dashboard-scan/dashboard-scan.component";
import { DashboardEditComponent } from "./dashboard/dashboard-edit/dashboard-edit.component";
// import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IndexesComponent } from "./indexes/indexes.component";
import { MonitorIndexesComponent } from "./indexes/components/monitor-indexes/monitor-indexes.component";
import { MonitorObjectsComponent } from "./indexes/components/monitor-objects/monitor-objects.component";
import { IndexEditorComponent } from "./indexes/components/index-editor/index-editor.component";

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,

    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule
  ],
  declarations: [
    MonitorComponent,
    DashboardListComponent,
    DashboardSummaryComponent,
    DashboardCreateComponent,
    DataSourceEditComponent,
    DataSourceListComponent,
    DashboardScanComponent,
    DashboardEditComponent,
    DataSourceCreateComponent,
    IndexesComponent,
    MonitorIndexesComponent,
    MonitorObjectsComponent,
    IndexEditorComponent
  ],
  entryComponents: [IndexEditorComponent]
})
export class MonitorModule {}
