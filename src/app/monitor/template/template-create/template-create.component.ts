import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService, TemplateService, LoadingService, MonitorService } from '../../../common/share.module';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { validateUpload } from '../../../common/directives/upload/upload.component';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss']
})
export class TemplateCreateComponent implements OnInit, OnDestroy {

  modifyForm: FormGroup;
  createType: number = 1;

  constructor(
    private notification: NzNotificationService,
    private title: TitleService,
    private fb: FormBuilder,
    private template: TemplateService,
    private router: Router
  ) {
    this.title.sendMsg({
      showTitle: true,
      text: '新建模版',
    });
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: '',
    });
  }

  initForm() {
    if (this.createType === 0) {
      this.modifyForm = this.fb.group({
        name              : [ null, [ Validators.required ] ],
        remark            : [ null ],
        files             : [ null, [ validateUpload ] ],
      });
    } else {
      this.modifyForm = this.fb.group({
        files             : [ null, [ validateUpload ] ],
      });
    }
  }

  getFormControl(name) {
    return this.modifyForm.controls[ name ];
  }

  checkModifyForm() {
    for (const i in this.modifyForm.controls) {
      this.modifyForm.controls[ i ].markAsDirty();
    }
  }

  createTemplate() {
    this.checkModifyForm();
    if (this.modifyForm.valid) {
      if (this.createType === 0) {
        // TODO: add from 
      } else {
        this.template.createByFile(this.modifyForm.value.files).subscribe(data => {
          this.notification.create('success', '成功', '模板创建成功!');
          this.router.navigate(['/monitor/template/list']);
        }, data => {
          this.notification.create('error', '异常', '模板创建失败!');
        });
      }
    }
  }

}
