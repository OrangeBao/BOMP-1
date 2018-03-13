import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor.component';
import { AuthGuardService } from '../common/services/auth-guard/auth-guard.service';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DashboardCreateComponent } from './dashboard/dashboard-create/dashboard-create.component';

import { TargetComponent } from './target/target.component';
import { ItemComponent } from './target/item/item.component';
import { ObjectComponent } from './target/object/object.component';

import { TemplateComponent } from './template/template.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    canActivate: [AuthGuardService],
    children: [
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
      }, {
        path: 'target',
        component: TargetComponent,
        children: [
          {
            path: 'item',
            component: ItemComponent,
          },
          {
            path: 'object',
            component: ObjectComponent,
          },
        ]
      }, {
        path: 'template',
        component: TemplateComponent
      }
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
