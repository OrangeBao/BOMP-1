import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { TemplateComponent } from './template/template.component';
import { DocComponent } from './doc/doc.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './common/services/auth-guard/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  // {
  //   path: 'monitor',
  //   component: MonitorComponent,
  // },
  // {
  //   path: 'template',
  //   component: TemplateComponent,
  //   canActivate: [AuthGuardService],
  // },
  {
    path: 'doc',
    component: DocComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only,
        useHash: true
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class AppRoutingModule { }
