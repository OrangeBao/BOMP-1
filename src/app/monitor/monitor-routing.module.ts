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
import { TemplateComponent } from './template/template.component';
import { ObjectAddComponent} from './indexes/components/object-add/object-add.component';

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
        component: IndexesComponent
      }, {
        path: 'template',
        component: TemplateComponent
      }
    ]
  }, {
    path: 'monitorobj/add',
    component: ObjectAddComponent,
    canActivate: [AuthGuardService],
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
