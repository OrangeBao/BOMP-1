import { Component, OnInit } from '@angular/core';
import { TitleService, TemplateService, DashboardService, LoadingService, MonitorService } from '../../../common/share.module';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Dashboard } from '../../../common/models/dashboard';
import { MonitorObject } from '../../../common/models/monitor/monitor-object';
import 'rxjs/add/observable/forkJoin';


@Component({
  selector: 'app-dashboard-create',
  templateUrl: './dashboard-create.component.html',
  styleUrls: ['./dashboard-create.component.scss']
})
export class DashboardCreateComponent implements OnInit {

  currentStep: number = 0;
  templateList: Dashboard[];
  monitorList: MonitorObject[];
  isSelectAll: boolean = false;
  steps: string[] = [
    '选择模板',
    '选择监控对象',
    '基本信息',
    '预览',
    '发布'
  ];
  selectTemplateId: number;
  count: number;
  timer: any;

  get displayTemplate(): Dashboard {
    if (!this.templateList || this.templateList.length === 0) {
      return null;
    }
    return this.templateList.find(item => item.id === this.selectTemplateId);
  }

  monitorObjsOption: any[];
  hoverMonitorObj: any;

  get noNext() {
    if (this.currentStep === 1) {
      return !this.monitorObjsOption.some(item => item.checked);
    }
    return false;
    
  }

  get displayMonitorObjs() {
    if (!this.hoverMonitorObj) return null;
    const selectItems = this.hoverMonitorObj.value;
    return this.monitorList.find(item => selectItems === item.id);
  }

  modifyHoverObj(item) {
    if (!this.hoverMonitorObj || item.value !== this.hoverMonitorObj.value) {
      this.hoverMonitorObj = item;
    }
  }

  modifyForm: FormGroup;


  constructor(
    private monitorService: MonitorService,
    private title: TitleService,
    private template: TemplateService,
    private dashboard: DashboardService,
    private spinnerService: LoadingService,
    private fb: FormBuilder,
    private router: Router) {
    this.title.sendMsg({
      showTitle: true,
      text: '新建仪表盘',
    });
    this.modifyForm = this.fb.group({
      name              : [ '', [ Validators.required ] ],
      tags              : [ '', [ Validators.required ] ],
      remark            : [ '' ],
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    Observable.forkJoin(
      this.template.getTemplateList(),
      this.monitorService.getMonitorObjs()
    ).subscribe(([templates, monitorObjs])=> {
      this.templateList = templates.content;
      if (this.templateList && this.templateList.length > 0) {
        this.selectTemplateId = this.templateList[0].id;
      }
      this.monitorList = monitorObjs.content;
      this.monitorObjsOption = this.monitorList.map(item => ({label: item.name, value: item.id, checked: false}));
    }, () => {}, () => {
      this.spinnerService.hide();
    });
  }

  updateSelectMonitorObjs(event, id) {
    let isAllSelect = true;
    this.monitorObjsOption = this.monitorObjsOption.map(item => {
      if (item.id === id) {
        item.checked = event;
      }
      if (!item.checked) isAllSelect = false;
      return item;
    });
    if (this.isSelectAll !== isAllSelect) {
      this.isSelectAll = isAllSelect;
    }
  }

  selectAll(event) {
    this.isSelectAll = event;
    this.monitorObjsOption = this.monitorObjsOption.map(item => ({...item, checked: event}));
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: '',
    });
    this.timer && clearInterval(this.timer);
  }

  getFormControl(name) {
    return this.modifyForm.controls[ name ];
  }

  checkModifyForm() {
    for (const i in this.modifyForm.controls) {
      this.modifyForm.controls[ i ].markAsDirty();
    }
  }

  goToNext() {
    this.currentStep += 1;
  }

  next() {
    if (this.currentStep === 2) {
      this.checkModifyForm();
      if (this.modifyForm.valid) {
        this.goToNext();
      }
    } else if (this.currentStep === 3) {
      // TODO create
      // make data 
      this.dashboard.createDashboard({
        tid: this.displayTemplate.id,
        // TODO refacotr monitors
        // monitors: this.monitorObjsOption.filter(item => item.checked).map(mid => ({
        //   mid,
        //   name: this.displayTemplate.variables.name,
        // })),
        title:  this.displayTemplate.title,
        tags: this.displayTemplate.tags,
        desc: this.displayTemplate.desc
      })
      this.goToNext();
      this.count = 5;
      this.timer = setInterval( () => {
        this.count -= 1;
        if (this.count === 0) {
          this.router.navigate(['/monitor/dashboard/list']);
        }
      }, 1000);
    } else {
      this.goToNext();
    }
  }
}
