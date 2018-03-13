import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../common/services/auth-guard/auth-guard.service';
import { HomeComponent } from './home.component';

const routes: Routes = [{
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class HomeRoutingModule { }