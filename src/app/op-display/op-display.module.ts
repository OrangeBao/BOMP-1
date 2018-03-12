import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpDisplayComponent } from './op-display.component';
import { ShareModule } from '../common/share.module';
import { OpDisplayRoutingModule } from './op-display-routing.module';

import { ListComponent } from './dashboard/list/list.component';
import { DetailComponent } from './dashboard/detail/detail.component';

@NgModule({
  imports: [
    CommonModule,
    OpDisplayRoutingModule,
    ShareModule
  ],
  declarations: [
    OpDisplayComponent,
    ListComponent,
    DetailComponent,
  ]
})
export class OpDisplayModule { }
