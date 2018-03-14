import { Component, ViewChild, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { NzInputDirectiveComponent } from "ng-zorro-antd";
import { NzModalSubject } from 'ng-zorro-antd';

import { DataSource } from '../../../../common/models/data-source';
import { DataSourceService } from '../../../../common/services/data-source/data-source.service';
import { MonitorService } from '../../../../common/services/monitor/monitor.service';
import { MonitorObject } from '../../../../common/models/monitor/monitor-object';

@Component({
  selector: 'app-object-add',
  templateUrl: './object-add.component.html',
  styleUrls: ['./object-add.component.scss']
})
export class ObjectAddComponent implements OnInit {
  @ViewChild("input") input: NzInputDirectiveComponent;

  validateForm: FormGroup;
  dataSourceList: Array<DataSource>;
  tempTags: Array<any> = [];
  isAddingTag: boolean = false;
  newTagValue: string;

  constructor(private fb: FormBuilder, private subject: NzModalSubject, private _dataSourceService: DataSourceService, private _monitorService: MonitorService) { }

  ngOnInit() {
    this._dataSourceService.getAll().subscribe((data) => {
      this.dataSourceList = data;
    });

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      datasource: [null, [Validators.required]]
    });
  }

  deleteTag(removedTag: any): void {
    this.tempTags = this.tempTags.filter(tag => tag !== removedTag);
  }

  addTag() {
    this.isAddingTag = true;

    // TODO: 没有setTimeout就是undefined
    // console.log(this.input);
    setTimeout(() => {
      // console.log(this.input.nativeElement);
      this.input.nativeElement.focus();
    }, 0);
  }

  confirmAddTag() {
    if (this.newTagValue) {
      this.tempTags.push(this.newTagValue);
    }
    this.isAddingTag = false;
    this.newTagValue = "";
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }

    let monitorObject: MonitorObject = new MonitorObject();
    monitorObject.name = this.getFormControl('name').value;
    monitorObject.desc = this.getFormControl('description').value;
    monitorObject.tags = this.tempTags;
    monitorObject.datasource = this.getFormControl('datasource').value;

    this._monitorService.editMonitorObject(monitorObject).subscribe((result)=>{
      if(result.status === "success") {
        // TODO: 弹出成功模态窗
      }
    });
  }
}
