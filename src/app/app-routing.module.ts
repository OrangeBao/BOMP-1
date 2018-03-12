import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { TemplateComponent } from './template/template.component';
import { DocComponent } from './doc/doc.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './common/services/auth-guard/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'console',
    pathMatch: 'full'
  },
  {
    path: 'home',
    // component: HomeComponent,
    // canActivate: [AuthGuardService],
    loadChildren: './home/home.module#HomeModule'
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
    path: 'warning',
    loadChildren: './warning/warning.module#WarningModule'
  },
  {
    path: 'console',
    loadChildren: './console/console.module#ConsoleModule'
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
        useHash: true,
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [ ]
})
export class AppRoutingModule { }
