import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DashboardSummaryComponent } from './dashboard/dashboard-summary/dashboard-summary.component';
import { DashboardCreateComponent } from './dashboard/dashboard-create/dashboard-create.component';
// import { DashboardEditComponent } from './dashboard/dashboard-edit/dashboard-edit.component';
import { DataSourceListComponent } from './data-source/data-source-list/data-source-list.component';
import { DataSourceCreateComponent } from './data-source/data-source-create/data-source-create.component';
import { DataSourceEditComponent } from './data-source/data-source-edit/data-source-edit.component';

import { StepBarComponent } from '../common/directives/step-bar/step-bar.component';
import { SearchBarComponent } from '../common/directives/search-bar/search-bar.component';
import { SelectComponent } from '../common/directives/select/select.component';
// import { UploadComponent } from '../common/directives/upload/upload.component';
// import { GobackComponent } from '../common/directives/goback/goback.component';
import { ShareModule } from '../common/share.module';
import { DashboardScanComponent } from './dashboard/dashboard-scan/dashboard-scan.component';
import { DashboardEditComponent } from './dashboard/dashboard-edit/dashboard-edit.component';
// import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ShareModule,
    // NgZorroAntdModule
  ],
  declarations: [
    MonitorComponent,
    DashboardListComponent,
    DashboardSummaryComponent,
    DashboardCreateComponent,
    DataSourceEditComponent,
    DataSourceListComponent,
    StepBarComponent,
    SearchBarComponent,
    DataSourceCreateComponent,
    SelectComponent,
    DashboardScanComponent,
    DashboardEditComponent
    // UploadComponent,
    // GobackComponent
  ]
})
export class MonitorModule { }
