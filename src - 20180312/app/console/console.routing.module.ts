import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../common/services/auth-guard/auth-guard.service';
import { ConsoleComponent } from './components/console.component';

const routes: Routes = [{
    path: '',
    component: ConsoleComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class ConsoleRoutingModule { }