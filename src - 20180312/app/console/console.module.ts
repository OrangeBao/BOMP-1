import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsoleRoutingModule } from './console.routing.module';
import { ConsoleComponent } from './components/console.component';

@NgModule({
  imports: [
    CommonModule,

    ConsoleRoutingModule
  ],
  declarations: [ConsoleComponent]
})
export class ConsoleModule { }