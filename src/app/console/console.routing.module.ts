import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "../common/services/auth-guard/auth-guard.service";
import { ConsoleComponent } from "./console.component";
import { DatasourceControlTableComponent } from "./datasourcecontrol/components/datasource-control-table/datasource-control-table.component";
import { DatasourceControlAddComponent } from "./datasourcecontrol/components/datasource-control-add/datasource-control-add.component";
import { CollectionControlCardsComponent } from "./collectioncontrol/components/collection-control-cards/collection-control-cards.component";
import { CollectionControlAddComponent } from "./collectioncontrol/components/collection-control-add/collection-control-add.component";

const routes: Routes = [
  {
    path: "",
    component: ConsoleComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        redirectTo: "datasourcecontrol",
        pathMatch: "full"
      },
      {
        path: "datasourcecontrol",
        children: [
          {
            path: "",
            redirectTo: "table",
            pathMatch: "full"
          },
          {
            path: "table",
            component: DatasourceControlTableComponent
          },
          {
            path: "add",
            component: DatasourceControlAddComponent
          }
        ]
      },
      {
        path: "collectioncontrol",
        children: [
          {
            path: "",
            redirectTo: "cards",
            pathMatch: "full"
          },
          {
            path: "cards",
            component: CollectionControlCardsComponent
          },
          {
            path: "add",
            component: CollectionControlAddComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule {}
