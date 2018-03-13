import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent as PersonalListComponent } from './personal/list/list.component';
import { CreateComponent as PersonalCreateComponent } from './personal/create/create.component';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { ListComponent } from './share/list/list.component';
import { CreateComponent } from './share/create/create.component';

import { ShareModule } from '../common/share.module';
import { EditComponent } from './share/edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    TemplateRoutingModule,
    FormsModule,
    ShareModule
  ],
  declarations: [
    TemplateComponent,
    PersonalListComponent,
    ListComponent, CreateComponent,
    PersonalCreateComponent,
    EditComponent
  ]
})
export class TemplateModule { }
