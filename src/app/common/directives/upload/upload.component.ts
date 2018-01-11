import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import defaultRequest from '../../utils/request.js';
import { File } from '../../models/file';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  showActive: boolean = false;
  fileList: Array<File> = new Array<File>();
  needUpdateFile = 0;
  currentFile = 0;
  constructor() { }

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
      action: `${environment.host}api/files/upload?orgId=1`,
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
        this.fileList.push(ret[0]);
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
    this.fileList = this.fileList.filter(f => f.id !== file.id);
    this.change.emit(this.fileList);
  }
  stopPop (event) {
    event.stopPropagation();
    event.preventDefault();
  }
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

  dragover(event) {
    this.stopPop(event);
    this.showActive = true;
  }
  dragleave() {
    this.stopPop(event);
    this.showActive = false;
  }
}
