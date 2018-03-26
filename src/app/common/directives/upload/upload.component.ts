import { Component, OnInit, Output, EventEmitter, HostListener, Input, forwardRef } from '@angular/core';
import defaultRequest from '../../utils/request.js';
import { File } from '../../models/file';
import { environment } from '../../../../environments/environment';

import { ControlValueAccessor, NG_VALUE_ACCESSOR,
  ValidatorFn, AbstractControl, ValidationErrors,
  NG_VALIDATORS } from '@angular/forms';

export const EXE_COUNTER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UploadComponent),
  multi: true
};

export const validateUpload: ValidatorFn = (control: AbstractControl): ValidationErrors => {
    return (control.value && control.value.length > 0) ?
          null : { 'required': true};
};

export const EXE_COUNTER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useValue: validateUpload,
    multi: true
};

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  host: {
    '[class.is-active]': 'showActive'
  },
  providers: [EXE_COUNTER_VALUE_ACCESSOR, EXE_COUNTER_VALIDATOR]
})
export class UploadComponent implements OnInit, ControlValueAccessor{
  showActive: boolean = false;

  @Input() _fileList: Array<File> = new Array<File>();
  needUpdateFile = 0;
  currentFile = 0;
  constructor() { }

  get fileList() {
      return this._fileList;
  }

  set fileList(value: Array<File>) {
      this._fileList = value;
      this.propagateChange(this._fileList);
  }

  propagateChange = (_: any) => { };

  writeValue(value: any) {
    if (value) {
        this.fileList = value;
    }
  }

  registerOnChange(fn: any) {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }


  @Output() change = new EventEmitter<Array<File>>();
  @Output() error = new EventEmitter<any>();
  @Output() start = new EventEmitter<any>();
  @Output() end = new EventEmitter<any>();
  ngOnInit() {
  }

  uploadFile(event) {
    event.currentTarget.children[0].click();
  }
  
  endEmit() {
    if (this.currentFile + 1 === this.needUpdateFile) {
      this.end.emit();
      this.currentFile = 0;
      this.needUpdateFile = 0;
    }
    this.currentFile += 1;
  }

  uploadTrigger(event) {
    this.start.emit();
    this.needUpdateFile = 1;
    this.currentFile = 0;
    this.sendFile(event.target.files[0]);
  }

  sendFile(file) {
    defaultRequest({
      action: `${environment.host + environment.uploadUrl}`,
      filename: 'files',
      file: file,
      data: {},
      headers: {},
      withCredentials: false,
      onProgress: e => {
        console.log('process');
      },
      onSuccess: ret => {
        console.log('success');
        this.fileList = [...this.fileList, ret[0]];
        this.change.emit(this.fileList);
        this.endEmit();
      },
      onError: (err, ret) => {
        console.log('error');
        this.error.emit(err);
      },
    });
  }

  removeFile(file) {
    this.fileList = this.fileList.filter(f => f.hash !== file.hash);
    this.change.emit(this.fileList);
  }

  stopPop (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  dropFile(event) {
    this.showActive = false;
    this.stopPop(event);
    this.start.emit();
    this.needUpdateFile = event.dataTransfer.files.length;
    this.currentFile = 0;
    for (let i = 0; i <  event.dataTransfer.files.length; i++) {
      this.sendFile(event.dataTransfer.files[i]);
    }
  }
  
  @HostListener('dragover', ['$event'])
  dragover(event) {
    this.stopPop(event);
    this.showActive = true;
  }

  @HostListener('dragleave', ['$event'])
  dragleave() {
    this.stopPop(event);
    this.showActive = false;
  }
}
