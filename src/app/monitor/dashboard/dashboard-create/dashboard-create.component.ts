import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService, TemplateService, DashboardService, LoadingService, MonitorService } from '../../../common/share.module';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NzNotificationService } from 'ng-zorro-antd';
import { Dashboard } from '../../../common/models/dashboard';
import { MonitorObject } from '../../../common/models/monitor/monitor-object';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-dashboard-create',
  templateUrl: './dashboard-create.component.html',
  styleUrls: ['./dashboard-create.component.scss']
})
export class DashboardCreateComponent implements OnInit, OnDestroy {

  currentStep = 0;
  templateList: Dashboard[];
  monitorList: MonitorObject[];
  isSelectAll = false;
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
  // 当前被选中的标签
  activeV: string;

  get displayTemplate(): Dashboard {
    if (!this.templateList || this.templateList.length === 0) {
      return null;
    }
    return this.templateList.find(item => item.id === this.selectTemplateId);
  }

  variables: Array<{name: string; query: string; mid?: Array<number>}>;

  monitorObjsOption: any[];
  hoverMonitorObj: any;

  get noNext() {
    if (this.currentStep === 1) {
      return this.variables.some(item => !item.mid.length);
    }
    return false;    
  }

  get displayMonitorObjs() {
    if (!this.hoverMonitorObj) return null;
    const selectItems = this.hoverMonitorObj.value;
    return this.monitorList.find(item => selectItems === item.id);
  }

  modifyForm: FormGroup;

  constructor(
    private monitorService: MonitorService,
    private title: TitleService,
    private template: TemplateService,
    private dashboard: DashboardService,
    private spinnerService: LoadingService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router) {
    this.title.sendMsg({
      showTitle: true,
      text: '新建仪表盘',
    });
    this.modifyForm = this.fb.group({
      name: [ '', [ Validators.required ] ],
      tags: [ '', [ Validators.required ] ],
      remark: [ '' ],
    });
  }

  modifyHoverObj(item) {
    if (!this.hoverMonitorObj || item.value !== this.hoverMonitorObj.value) {
      this.hoverMonitorObj = item;
    }
  }

  // 修改数据源左边的switch标记
  changeActiveV(v: string) {
    this.activeV = v;
    const currentV = this.variables.find(item => item.name === v);
    debugger;
    this.monitorObjsOption = this.monitorObjsOption.map(item => ({...item, checked: currentV.mid.includes(item.value)}));
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
    const currentTag = this.variables.findIndex(item => item.name === this.activeV);
    this.variables[currentTag].mid = this.monitorObjsOption.filter(item => item.checked).map(item => item.value);
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

  transformV(old: any) {
    const ret = [];
    old.forEach(item => {
      item.mid.forEach(id => ret.push({name: item.name, query: item.query, mid: id}));
    });
    return ret;
  }

  next() {
    if (this.currentStep === 0) {
      // 构造variables
      this.variables = [];
      if (this.displayTemplate) {
        this.variables = this.displayTemplate.variables.map(item => ({name: item.name, query: item.query, mid: []}));
        this.activeV = this.variables[0].name;
      }
      this.goToNext();
    } else if (this.currentStep === 2) {
      this.checkModifyForm();
      if (this.modifyForm.valid) {
        this.goToNext();
      }
    } else if (this.currentStep === 3) {
      // TODO create
      // make data 
      this.spinnerService.show();
      this.dashboard.createDashboard({
        tid: this.displayTemplate.id,
        // monitors: this.monitorObjsOption.filter(item => item.checked).map(mid => ({
        //   mid,
        //   name: this.displayTemplate.variables.name,
        // })),
        monitors: this.transformV(this.variables),
        title:  this.modifyForm.value['name'],
        tags: this.modifyForm.value['tags'],
        desc: this.modifyForm.value['desc']
      }).subscribe(() => {
        this.goToNext();
        this.count = 5;
        this.timer = setInterval( () => {
          this.count -= 1;
          if (this.count === 0) {
            this.router.navigate(['/monitor/dashboard/list']);
          }
        }, 1000);
        this.spinnerService.hide();
      }, err => {
        this.notification.create('error', '异常', '仪表盘初始化异常，请联系管理员！');
        this.spinnerService.hide();
      });
    
    } else {
      this.goToNext();
    }
  }
}
