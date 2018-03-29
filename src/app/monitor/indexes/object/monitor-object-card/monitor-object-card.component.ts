import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewChildren,
  TemplateRef,
  OnInit,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
  QueryList,
  ChangeDetectorRef,
  AfterViewChecked
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { ModalService } from 'zu-modal';

import { LoadingService } from '../../../../common/share.module';

import { MonitorService } from '../../../../common/services/monitor/monitor.service';
import { MonitorObject } from '../../../../common/models/monitor/monitor-object';

@Component({
  selector: 'app-monitor-object-card',
  templateUrl: './monitor-object-card.component.html',
  styleUrls: ['./monitor-object-card.component.scss']
})
export class MonitorObjectCardComponent
  implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  @Input('isSelectable') public isSelectable: boolean;
  @Input('isSelected') public isSelected: boolean;
  @Input('monitorObject') public monitorObject: MonitorObject;

  @Output() public editChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() public deleteChanged: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('tplEditForm') tplEditForm: TemplateRef<any>;
  @ViewChild('cardChild') cardChild: any;
  @ViewChildren('tagChildren') tagChildren: QueryList<any>;

  validateForm: FormGroup;

  isMouseOvered = false;
  ellipsisTags: Array<any> = new Array<any>();
  showEllipsisTags: boolean;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private notification: NzNotificationService,
    private _monitorService: MonitorService,
    private spinnerService: LoadingService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [this.monitorObject['name'], [Validators.required]],
      description: [this.monitorObject['desc'], [Validators.required]],
      tags: [this.monitorObject['tags'], [Validators.required]]
      // datasource: [null, [Validators.required]]
    });
  }

  ngAfterViewInit() {
    this.adjustTagsShow();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  // isSelectable 变化后，是否需清空选中的card的样式
  ngOnChanges(changes: SimpleChanges) {
    // if (changes.isSelected && !changes.isSelected.firstChange) {
    //   this.selectChanged.emit({
    //     monitorObject: this.monitorObject,
    //     selected: changes.isSelected.currentValue
    //   });
    // }
  }

  adjustTagsShow() {
    this.tagChildren.toArray().forEach(item => {
      // console.log(item.nativeElement.offsetWidth);
    });

    const tagsTotalWidth: number = this.tagChildren
      .toArray()
      .map(item => {
        return item.nativeElement.offsetWidth;
      })
      .reduce((previous, current) => {
        return previous + current + 6 + 3.3; // tag marin-left=6; span之间有#text=3.3?
      }, 7); // #的宽度

    if (tagsTotalWidth > this.cardChild.nativeElement.offsetWidth - 30) {
      // card padding = 15*2

      let tempWidth = 7; // #的宽度
      let tempIndex = 0;
      for (const item of this.tagChildren.toArray()) {
        if (
          tempWidth + item.nativeElement.offsetWidth <
          this.cardChild.nativeElement.offsetWidth - 30 - 32 // 省略号tag的宽度+margin=32
        ) {
          tempWidth += item.nativeElement.offsetWidth + 6 + 3.3;
          tempIndex++;
        } else {
          break;
        }
      }

      this.ellipsisTags = this.monitorObject.tags.slice(0, tempIndex);
      this.showEllipsisTags = true;
    }
  }

  showAllTags() {
    this.showEllipsisTags = false;
  }

  select() {
    // if (this.isSelectable) {
    //   this.isSelected = !this.isSelected;
    //   this.selectChanged.emit({
    //     monitorObject: this.monitorObject,
    //     selected: this.isSelected
    //   });
    // }
  }

  showMoreMenu(flag: boolean) {
    this.isMouseOvered = flag;
  }

  edit() {
    this.modalService.open({
      title: '编辑指标基本信息',
      content: this.tplEditForm,
      cancelText: 'cancel',
      onOk: () => {
        for (const field of Object.keys(this.validateForm.controls)) {
          this.validateForm.controls[field].markAsDirty();
        }

        return new Promise((resolve, reject) => {
          if (this.validateForm.valid) {
            resolve();
          } else {
            reject();
          }
        }).then(() => {
          const updatedMonitor = Object.assign(this.monitorObject, {
            name: this.getFormControl('name').value,
            desc: this.getFormControl('description').value,
            tags: this.getFormControl('tags').value
          });

          this._monitorService.editMonitorObject(updatedMonitor).subscribe({
            next: result => {
              this.notification.create('success', '提示', '监控对象修改成功！');
              this.editChanged.emit();
            },
            error: error => {
              this.notification.create('warning', '提示', error.error.message);
            }
          });
        });
      }
    });
  }

  confirmDelete() {
    this.deleteChanged.emit(this.monitorObject);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }
}
