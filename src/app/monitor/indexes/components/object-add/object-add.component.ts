import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { NzInputDirectiveComponent } from 'ng-zorro-antd';

import { TitleService } from '../../../../common/share.module';
import { DataSource } from '../../../../common/models/data-source';
import { DataSourceService } from '../../../../common/services/data-source/data-source.service';
import { MonitorService } from '../../../../common/services/monitor/monitor.service';
import { MonitorObject } from '../../../../common/models/monitor/monitor-object';

@Component({
  selector: 'app-object-add',
  templateUrl: './object-add.component.html',
  styleUrls: ['./object-add.component.scss']
})
export class ObjectAddComponent implements OnInit, OnDestroy {
  @ViewChild('input') input: NzInputDirectiveComponent;

  isFinished: boolean;
  count: number;
  timer: any;

  validateForm: FormGroup;
  dataSourceList: Array<DataSource>;
  // tempTags: Array<any> = [];
  // isAddingTag: boolean = false;
  // newTagValue: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private title: TitleService,
    private dataSourceService: DataSourceService,
    private monitorService: MonitorService
  ) {
    // TODO: 放ngOnInit会报错???
    this.title.sendMsg({
      showTitle: true,
      text: '新建指标'
    });
  }

  ngOnInit() {
    this.dataSourceService.getAll(0).subscribe(data => {
      this.dataSourceList = data.content || [];
    });

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      tags: [null, [Validators.required]],
      datasource: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: ''
    });
  }

  // deleteTag(removedTag: any): void {
  //   this.tempTags = this.tempTags.filter(tag => tag !== removedTag);
  // }

  // addTag() {
  //   this.isAddingTag = true;

  //   // 没有setTimeout就是undefined
  //   // console.log(this.input);
  //   setTimeout(() => {
  //     // console.log(this.input.nativeElement);
  //     this.input.nativeElement.focus();
  //   }, 0);
  // }

  // confirmAddTag() {
  //   if (this.newTagValue) {
  //     this.tempTags.push(this.newTagValue);
  //   }
  //   this.isAddingTag = false;
  //   this.newTagValue = "";
  // }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  submitForm() {
    for (const field of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[field].markAsDirty();
    }

    if (this.validateForm.valid) {
      const monitorObject: MonitorObject = new MonitorObject();
      Object.assign(monitorObject, {
        name: this.getFormControl('name').value,
        desc: this.getFormControl('description').value,
        tags: this.getFormControl('tags').value,
        datasource: this.getFormControl('datasource').value
      });

      this.monitorService.editMonitorObject(monitorObject).subscribe(result => {
        this.isFinished = true;

        this.count = 5;
        this.timer = setInterval(() => {
          this.count -= 1;
          if (this.count === 0) {
            this.router.navigate(['/monitor/indexes/object']);
          }
        }, 1000);
      });
    }
  }
}
