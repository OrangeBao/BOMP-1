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

import { ShareModule } from "../common/share.module";
import { DashboardScanComponent } from "./dashboard/dashboard-scan/dashboard-scan.component";
import { DashboardEditComponent } from "./dashboard/dashboard-edit/dashboard-edit.component";
// import { TargetComponent } from './target/target.component';
// import { ItemComponent } from './target/item/item.component';
// import { ObjectComponent } from './target/object/object.component';
import { TemplateComponent } from "./template/template.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { IndexesComponent } from "./indexes/indexes.component";
import { MonitorIndexesComponent } from "./indexes/components/monitor-indexes/monitor-indexes.component";
import { MonitorObjectsComponent } from "./indexes/components/monitor-objects/monitor-objects.component";
import { IndexEditorModalComponent } from "./indexes/components/index-editor-modal/index-editor-modal.component";
import { MonitorObjectCardComponent } from "./indexes/components/monitor-object-card/monitor-object-card.component";
import { ObjectEditorModalComponent } from './indexes/components/object-editor-modal/object-editor-modal.component';
import { ObjectDeleteModalComponent } from './indexes/components/object-delete-modal/object-delete-modal.component';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,

    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ShareModule,
  ],
  declarations: [
    MonitorComponent,
    DashboardListComponent,
    DashboardSummaryComponent,
    DashboardCreateComponent,
    DashboardScanComponent,
    DashboardEditComponent,
    // TargetComponent,
    // ItemComponent,
    // ObjectComponent,
    TemplateComponent,
    DashboardComponent,
    IndexesComponent,
    MonitorIndexesComponent,
    MonitorObjectsComponent,
    IndexEditorModalComponent,
    MonitorObjectCardComponent,
    ObjectEditorModalComponent,
    ObjectDeleteModalComponent
  ],
  entryComponents: [IndexEditorModalComponent, ObjectEditorModalComponent, ObjectDeleteModalComponent]
})
export class MonitorModule {}
