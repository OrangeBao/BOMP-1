import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template.component';
import { ListComponent as PersonalListComponent } from './personal/list/list.component';
import { CreateComponent as PersonalCreateComponent } from './personal/create/create.component';
import { ListComponent } from './share/list/list.component';
import { CreateComponent } from './share/create/create.component';
import { EditComponent } from './share/edit/edit.component';
import { AuthGuardService } from '../common/services/auth-guard/auth-guard.service';


const templateRoutes: Routes = [
  {
    path: 'template',
    component: TemplateComponent,
    canActivate: [AuthGuardService],
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
            component: CreateComponent,
          },
          {
            path: 'edit/:id',
            component: EditComponent,
          }
        ]
      },
      {
        path: 'personal',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: PersonalListComponent,
          },
          {
            path: 'create',
            component: PersonalCreateComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(templateRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class TemplateRoutingModule { }
