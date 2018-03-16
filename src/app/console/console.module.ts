import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";

import { ShareModule } from "../common/share.module";

import { ConsoleRoutingModule } from "./console.routing.module";
import { ConsoleComponent } from "./console.component";
import { DatasourceControlTableComponent } from "./datasourcecontrol/components/datasource-control-table/datasource-control-table.component";
import { DatasourceControlAddComponent } from "./datasourcecontrol/components/datasource-control-add/datasource-control-add.component";
import { CollectionControlCardsComponent } from "./collectioncontrol/components/collection-control-cards/collection-control-cards.component";
import { CollectionControlAddComponent } from "./collectioncontrol/components/collection-control-add/collection-control-add.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    
    ShareModule,
    ConsoleRoutingModule
  ],
  declarations: [
    ConsoleComponent,
    DatasourceControlTableComponent,
    DatasourceControlAddComponent,
    CollectionControlCardsComponent,
    CollectionControlAddComponent
  ]
})
export class ConsoleModule {}
