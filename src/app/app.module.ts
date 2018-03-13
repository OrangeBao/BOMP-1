import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { DashboardService } from './common/services/dashboard/dashboard.service';
import { TemplateService } from './common/services/template/template.service';
import { DataSourceService } from './common/services/data-source/data-source.service';
import { UserService } from './common/services/user/user.service';
import { DicService } from './common/services/dic/dic.service';
import { AuthGuardService } from './common/services/auth-guard/auth-guard.service';
import { GrafanaService } from './common/services/grafana/grafana.service';

import { APIInterceptor } from './common/interceptors/apiinterceptor';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { TabComponent } from './common/directives/tab/tab.component';

import { TemplateModule } from './template/template.module';
import { TransformMenuPipe } from './common/pipes/transform-menu.pipe';

import { ShareModule, NotificationsService} from './common/share.module';


export function configFactory(config: UserService, config2: GrafanaService) {
  return  () => config.load().then(() => config2.mockLogin()).catch(err => console.error(err));
  // return null; 
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    // HomeComponent,
    TabComponent,
    TransformMenuPipe
    // GobackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TemplateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [UserService, GrafanaService],
      multi: true
    },
    DashboardService,
    TemplateService,
    UserService,
    AuthGuardService,
    DataSourceService,
    NotificationsService,
    DicService,
    GrafanaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
