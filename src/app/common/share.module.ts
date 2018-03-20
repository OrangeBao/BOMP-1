import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GobackComponent } from './directives/goback/goback.component';
import { UploadComponent } from './directives/upload/upload.component';

import { IframeContainerComponent } from './directives/iframe-container/iframe-container.component';
import { StepBarComponent } from './directives/step-bar/step-bar.component';
import { SearchBarComponent } from './directives/search-bar/search-bar.component';
import { SelectComponent } from './directives/select/select.component';

import { LoadingComponent } from './directives/loading/loading.component';
import { LoadingService } from './services/loading/loading.service';

import { TagBarComponent } from './directives/tag-bar/tag-bar.component';
import { TagInputComponent } from './directives/tag-input/tag-input.component';
import { FormCheckboxInputComponent } from './directives/form-checkbox-input/form-checkbox-input.component';

import { TitleService } from './services/title/title.service';
import { DashboardService} from './services/dashboard/dashboard.service';
import { MonitorService } from './services/monitor/monitor.service';
import { TemplateService } from './services/template/template.service';

export * from './services/loading/loading.service';
export * from './services/title/title.service';

export * from './services/dashboard/dashboard.service';
export * from './services/monitor/monitor.service';
export * from './services/template/template.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GobackComponent,
    UploadComponent,
    IframeContainerComponent,
    SelectComponent,
    StepBarComponent,
    SearchBarComponent,
    LoadingComponent,
    TagBarComponent,
    TagInputComponent,
    FormCheckboxInputComponent,
  ],
  exports: [
    GobackComponent,
    UploadComponent,
    IframeContainerComponent,
    SelectComponent,
    StepBarComponent,
    SearchBarComponent,
    LoadingComponent,
    TagBarComponent,
    TagInputComponent,
    FormCheckboxInputComponent
  ]
})
export class ShareModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ShareModule,
      providers: [
        LoadingService,
        TitleService,
        DashboardService,
        MonitorService,
        TemplateService
      ]
    };
  }
}
