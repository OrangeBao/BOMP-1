import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpDisplayComponent } from './op-display.component';
import { DashboardListComponent } from '../monitor/dashboard/dashboard-list/dashboard-list.component';
import { DataSourceListComponent } from '../monitor/data-source/data-source-list/data-source-list.component';
import { DashboardCreateComponent } from '../monitor/dashboard/dashboard-create/dashboard-create.component';
import { DataSourceCreateComponent } from '../monitor/data-source/data-source-create/data-source-create.component';
import { DataSourceEditComponent } from '../monitor/data-source/data-source-edit/data-source-edit.component';
import { AuthGuardService } from '../common/services/auth-guard/auth-guard.service';
import { DashboardScanComponent } from '../monitor/dashboard/dashboard-scan/dashboard-scan.component';
import { DashboardEditComponent } from '../monitor/dashboard/dashboard-edit/dashboard-edit.component';
import { IndexesComponent } from '../monitor/indexes/indexes.component';

const opDisplayRoutes: Routes = [
  {
    path: 'op_display',
    component: OpDisplayComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'dashboard/list',
        pathMatch: 'full'
      },
      {
        path: 'scan',
        component: DashboardScanComponent,
      },
      {
        path: 'edit',
        component: DashboardEditComponent,
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: DashboardListComponent,
          },
          {
            path: 'create',
            component: DashboardCreateComponent,
          }
        ]
      },
      {
        path: 'indexes',
        component: IndexesComponent
      },
      {
        path: 'data-source',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: DataSourceListComponent,
          },
          {
            path: 'create',
            component: DataSourceCreateComponent,
          },
          {
            path: 'edit/:id',
            component: DataSourceEditComponent,
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(opDisplayRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class OpDisplayRoutingModule { }
