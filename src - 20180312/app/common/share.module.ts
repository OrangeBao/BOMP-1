import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GobackComponent } from './directives/goback/goback.component';
import { UploadComponent } from './directives/upload/upload.component';

import { ContainerComponent } from './components/container/container.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsService } from './services/notifications.service';

import { IframeContainerComponent } from './directives/iframe-container/iframe-container.component';
import { StepBarComponent } from './directives/step-bar/step-bar.component';
import { SearchBarComponent } from './directives/search-bar/search-bar.component';
import { SelectComponent } from './directives/select/select.component';

import { LoadingComponent } from './directives/loading/loading.component';
import { LoadingService } from './services/loading/loading.service';

import { ModalComponent } from './directives/modal/modal.component';
import { ModalService } from './services/modal/modal.service';
import { TagBarComponent } from './directives/tag-bar/tag-bar.component';
import { AlertComponent } from './directives/alert/alert.component';
import { AlertService } from './services/alert/alert.service';
import { TagInputComponent } from './directives/tag-input/tag-input.component';

export * from './components/container/container.component';
export * from './components/notification/notification.component';
export * from './services/notifications.service';

export * from './services/loading/loading.service';
export * from './services/modal/modal.service';
export * from './services/alert/alert.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GobackComponent,
    UploadComponent,
    ContainerComponent,
    NotificationComponent,
    IframeContainerComponent,
    SelectComponent,
    StepBarComponent,
    SearchBarComponent,
    LoadingComponent,
    ModalComponent,
    TagBarComponent,
    AlertComponent,
    TagInputComponent,
  ],
  exports: [
    GobackComponent,
    UploadComponent,
    ContainerComponent,
    NotificationComponent,
    IframeContainerComponent,
    SelectComponent,
    StepBarComponent,
    SearchBarComponent,
    LoadingComponent,
    ModalComponent,
    TagBarComponent,
    AlertComponent,
    TagInputComponent
  ]
})
export class ShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareModule,
      providers: [
        NotificationsService,
        LoadingService,
        ModalService,
        AlertService
      ]
    };
  }
}
