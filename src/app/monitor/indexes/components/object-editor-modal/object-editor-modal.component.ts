import { Component, Input, ViewChild, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { NzInputDirectiveComponent } from "ng-zorro-antd";
import { NzModalSubject } from 'ng-zorro-antd';

import { MonitorService } from '../../../../common/services/monitor/monitor.service';

@Component({
  selector: "bomp-object-editor-modal",
  templateUrl: "./object-editor-modal.component.html",
  styleUrls: ["./object-editor-modal.component.scss"]
})
export class ObjectEditorModalComponent implements OnInit {
  _monitorObject: any;
  @Input('monitorObject')
  set monitorObject(value: any) {
    this._monitorObject = value;
    this.tempTags = this._monitorObject.tags.slice();
  }
  get monitorObject(): any {
    return this._monitorObject;
  }

  @ViewChild("input") input: NzInputDirectiveComponent;

  validateForm: FormGroup;
  tempTags: Array<any> = [];
  isAddingTag: boolean = false;
  newTagValue: string;

  constructor(private fb: FormBuilder, private subject: NzModalSubject, private _monitorService: MonitorService) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.monitorObject["name"], [Validators.required]],
      description: [this.monitorObject["desc"], [Validators.required]],
      // datasource: [null, [Validators.required]]
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
    
    this._monitorService.editMonitorObject(this.monitorObject).subscribe((result)=>{
      console.log(result);

      this.subject.destroy();
    });
  }

}
