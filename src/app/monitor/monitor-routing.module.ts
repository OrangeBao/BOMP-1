import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor.component';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DataSourceListComponent } from './data-source/data-source-list/data-source-list.component';
import { DashboardCreateComponent } from './dashboard/dashboard-create/dashboard-create.component';
import { DataSourceCreateComponent } from './data-source/data-source-create/data-source-create.component';
import { DataSourceEditComponent } from './data-source/data-source-edit/data-source-edit.component';
import { AuthGuardService } from '../common/services/auth-guard/auth-guard.service';
import { DashboardScanComponent } from './dashboard/dashboard-scan/dashboard-scan.component';
import { DashboardEditComponent } from './dashboard/dashboard-edit/dashboard-edit.component';

const dashboardRoutes: Routes = [
  {
    path: 'monitor',
    component: MonitorComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'scan',
        component: DashboardScanComponent,
      },
      {
        path: 'edit',
        component: DashboardEditComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard/list',
        pathMatch: 'full'
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
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class DashboardRoutingModule { }
