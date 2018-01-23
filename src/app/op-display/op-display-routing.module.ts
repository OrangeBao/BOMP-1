import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpDisplayComponent } from './op-display.component';
import { ListComponent } from './dashboard/list/list.component';
import { DetailComponent } from './dashboard/detail/detail.component';

const opDisplayRoutes: Routes = [
  {
    path: 'op_display',
    component: OpDisplayComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'share/list',
        pathMatch: 'full'
      },
      {
        path: 'share',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ListComponent,
          },
          {
            path: 'create',
            component: DetailComponent,
          }
        ]
      }
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
