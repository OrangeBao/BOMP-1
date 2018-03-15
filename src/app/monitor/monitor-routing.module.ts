import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor.component';
import { AuthGuardService } from '../common/services/auth-guard/auth-guard.service';
import { DashboardListComponent } from './dashboard/dashboard-list/dashboard-list.component';
import { DashboardCreateComponent } from './dashboard/dashboard-create/dashboard-create.component';

// import { TargetComponent } from './target/target.component';
import { ItemComponent } from './target/item/item.component';
import { ObjectComponent } from './target/object/object.component';

import { IndexesComponent } from './indexes/indexes.component';
import { MonitorObjectsComponent } from "./indexes/components/monitor-objects/monitor-objects.component";
import { MonitorIndexesComponent } from "./indexes/components/monitor-indexes/monitor-indexes.component";
import { ObjectAddComponent} from './indexes/components/object-add/object-add.component';

import { TemplateComponent } from './template/template.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'indexes',
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
            data: { showTitle: 'true' },
            component: DashboardCreateComponent,
          }
        ]
      // }, {
      //   path: 'target',
      //   component: TargetComponent,
      //   children: [
      //     {
      //       path: 'item',
      //       component: ItemComponent,
      //     },
      //     {
      //       path: 'object',
      //       component: ObjectComponent,
      //     },
      //   ]
      }, {
        path: 'indexes',
        component: IndexesComponent,
        children: [
          {
            path: '',
            redirectTo: 'object',
            pathMatch: 'full'
          },
          {
            path: 'object',
            component: MonitorObjectsComponent
          },
          {
            path: 'index',
            component: MonitorIndexesComponent
          },
          {
            path: 'add',
            component: ObjectAddComponent
          }
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
