import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService, TemplateService, LoadingService, MonitorService } from '../../../common/share.module';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { validateUpload } from '../../../common/directives/upload/upload.component';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss']
})
export class TemplateCreateComponent implements OnInit, OnDestroy {

  modifyForm: FormGroup;
  createType: number = 0;

  constructor(private title: TitleService, private fb: FormBuilder) {
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
        name              : [ null, [ Validators.required ] ],
        remark            : [ null ],
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
  }

}
