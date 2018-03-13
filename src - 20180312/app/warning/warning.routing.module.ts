import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WarningComponent } from './components/warning.component';

const routes: Routes = [{
    path: '',
    component: WarningComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ]
})
export class WarningRoutingModule { }