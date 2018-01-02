import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GobackComponent } from './directives/goback/goback.component';
import { UploadComponent } from './directives/upload/upload.component';

import {ContainerComponent} from './components/container/container.component';
import {NotificationComponent} from './components/notification/notification.component';
import {NotificationsService} from './services/notifications.service';
import { IframeContainerComponent } from './directives/iframe-container/iframe-container.component';

export * from './components/container/container.component';
export * from './components/notification/notification.component';
export * from './services/notifications.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GobackComponent,
    UploadComponent,
    ContainerComponent,
    NotificationComponent,
    IframeContainerComponent
  ],
  exports: [
    GobackComponent,
    UploadComponent,
    ContainerComponent,
    NotificationComponent,
    IframeContainerComponent
  ]
})
export class ShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareModule,
      providers: [
        NotificationsService
      ]
    };
  }
}
