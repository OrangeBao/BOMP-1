import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule} from '../common/share.module';

import { AuthGuardService } from '../common/services/auth-guard/auth-guard.service';
import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        ShareModule,
        HomeRoutingModule
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [
        AuthGuardService
    ],
})
export class HomeModule { }
