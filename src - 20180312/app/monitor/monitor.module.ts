import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DashboardSummaryComponent } from './dashboard/dashboard-summary/dashboard-summary.component';
import { DashboardCreateComponent } from './dashboard/dashboard-create/dashboard-create.component';
// import { DashboardEditComponent } from './dashboard/dashboard-edit/dashboard-edit.component';

import { ShareModule } from '../common/share.module';
import { DashboardScanComponent } from './dashboard/dashboard-scan/dashboard-scan.component';
import { DashboardEditComponent } from './dashboard/dashboard-edit/dashboard-edit.component';
import { TargetComponent } from './target/target.component';
import { ItemComponent } from './target/item/item.component';
import { ObjectComponent } from './target/object/object.component';
import { TemplateComponent } from './template/template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { NgZorroAntdModule } from 'ng-zorro-antd';

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
    DashboardScanComponent,
    DashboardEditComponent,
    TargetComponent,
    ItemComponent,
    ObjectComponent,
    TemplateComponent,
    DashboardComponent,
  ]
})
export class MonitorModule { }
