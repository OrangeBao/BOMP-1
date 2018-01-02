import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { TemplateService } from '../../../common/services/template/template.service';
import { DataSourceService } from '../../../common/services/data-source/data-source.service';
import { DashboardService } from '../../../common/services/dashboard/dashboard.service';
import { UserService } from '../../../common/services/user/user.service';
import { DicService } from '../../../common/services/dic/dic.service';
import { DataSource } from '../../../common/models/data-source';
import { environment } from '../../../../environments/environment';
import { File } from '../../../common/models/file';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from '../../../loading';
import { NotificationsService } from '../../../common/share.module';

@Component({
  selector: 'app-dashboard-create',
  templateUrl: './dashboard-create.component.html',
  styleUrls: ['./dashboard-create.component.scss']
})
export class DashboardCreateComponent implements OnInit {

  constructor(
      private dicService: DicService,
      private notificationsService: NotificationsService,
      private spinnerService: Ng4LoadingSpinnerService,
      private dashboardService: DashboardService,
      private sanitizer: DomSanitizer,
              private router: Router,
              private templateService: TemplateService,
              private dataSourceService: DataSourceService,
              private userService: UserService) { }
  files: Array<File> = new Array<File>();
  scrapeInterval: string;
  selectedTemp: any = {};
  selectedData: any = [];
  current = 1;
  tempKeyword = '';
  dataKeyword = '';
  template: Array<any>;
  dataSource: Array<any>;
  templateType = 'quote';
  dataSourceType = 'quote';
  dataSourceDemo: DataSource = new DataSource();
  slug = '';
  u: any;
  reg: any;
  method = 'independent';
  grafanaHostDashboardUrl: SafeUrl;
  isCheck = false;
  isTestUrl = false;
  get isError() {
    if (this.isCheck) {
      return {
        name: !this.dataSourceDemo.name,
        url: !this.dataSourceDemo.url,
        lang1: !this.dataSourceDemo.lang1,
        desc: !this.dataSourceDemo.desc,
        scrapeInterval: !this.scrapeInterval
      };
    }
    return {
      name: false,
      url: false,
      lang1: false,
      desc: false,
      scrapeInterval: false
    };
  }
  get noNext() {
    if (this.current === 1) {
      if (this.templateType === 'quote') {
        return !(this.selectedTemp && this.selectedTemp.uri);
      } else {
        return !this.slug;
      }
    }
    if (this.current === 2) {
      if (this.dataSourceType === 'quote') {
        return !(this.selectedData && this.selectedData.length > 0);
      } else {
        if (this.method === 'independent') {
          return !(this.isTestUrl && this.checkInput());
        } else {
          return !(this.files && this.files.length > 0 && this.isTestUrl);
        }
      }
    }
    return true;
  }
  get params() {
    let type = '';
    let datas = [];
    if ('quote' === this.dataSourceType) {
      type = 'DATASOURCE';
      datas = this.selectedData.map(d => ({id: d.id}));
    } else if ('custom' === this.dataSourceType) {
      if ('independent' === this.method) {
        type = 'CUSTOM';
        datas.push({
          name: this.dataSourceDemo.name,
          regionId:  this.reg.key,
          regionName:  this.reg.value,
          url: this.dataSourceDemo.url,
          lang1: this.dataSourceDemo.lang1,
          desc: this.dataSourceDemo.desc,
          options: {
            honor_labels: true,
            scrape_interval: this.scrapeInterval + this.u.key
          }
        });
      } else {
        type = 'FILE';
        datas = this.files.map(d => ({id: d.id}));
      }
    }
    let template = this.slug;
    if (this.templateType === 'quote') {
      template = this.selectedTemp && this.selectedTemp.uri && this.selectedTemp.uri.split('/')[1];
    }
    return {
      template,
      datasource: {
        type,
        datas
      },
      relations: [
        {
          renterType: 'USER',
          renterId: 0
        }
      ]
    };
  }
  get region() {
    return this.dicService.getRegion();
  }

  get unit() {
    return [
      { key: 's', value: '秒' },
      { key: 'm', value: '分' },
      { key: 'h', value: '时' },
      { key: 'd', value: '天' }
    ];
  }

  changeUnit(v) {
    this.u = v;
  }

  changeRegion(v) {
    this.reg = v;
  }
  get displayTemplate() {
    if (!this.tempKeyword) {
      return this.template;
    } else if (!this.template) {
      return [];
    } else {
      return this.template.filter(t => t.title.indexOf(this.tempKeyword) !== -1);
    }
  }
  get displayDataSource() {
    if (!this.dataKeyword) {
      return this.dataSource;
    } else if (!this.dataSource) {
      return [];
    } else {
      return this.dataSource.filter(t => t.lang1.indexOf(this.dataKeyword) !== -1);
    }
  }
  selectedTempIdChange(id: number) {
    this.selectedTemp = this.template && this.template.filter(t => t.id === id)[0];
  }
  selectedDataIdChange(data) {
    if (this.selectedData && this.selectedData.filter(t => t.id === data.id).length > 0) {
      this.selectedData = this.selectedData.filter(t => t.id !== data.id);
    } else {
      this.selectedData = [...this.selectedData, data];
    }
  }
  ngOnInit() {
    this.spinnerService.show();
    this.templateService.getAll().then(response => {
      this.template = response;
      this.selectedTemp = this.template[0];
    }).then(() => this.dataSourceService.getAll().then(data => this.dataSource = data))
        .then(() => this.spinnerService.hide());

    window.addEventListener('message', this.custTemplateHandler.bind(this), false);
    this.grafanaHostDashboardUrl = this.sanitizer
        .bypassSecurityTrustResourceUrl(environment.grafanaHost + 'dashboard/new?editview=settings&orgId='
            + this.userService.getUserInfo().graOrg.template);
    this.reg = this.region[0];
    this.u = this.unit[0];
  }
  custTemplateHandler(event) {
    if (event && event.data) {
      if (Object.prototype.toString.call(event.data) === '[object String]') {
        const res = JSON.parse(event.data);
        if (res.slug) {
          this.slug = res.slug;
        }
      }
    }
  }
  next() {
    if (this.noNext) {
      return;
    }
    // if (this.current === 2 && this.params.datasource.type === 'CUSTOM') {
    //   if (!this.isTestUrl || !this.checkInput()) {
    //     return;
    //   }
    // }
    this.current += 1;
  }
  last() {
    this.current -= 1;
  }
  fileChange(fileList) {
    this.files = fileList;
  }

  checkInput() {
    this.isCheck = true;
    const isError = this.isError;
    return Object.keys(isError).every(k => {
      return !isError[k];
    });
  }

  testUri() {
    if (!this.dataSourceDemo.url) {
      return;
    }
    this.spinnerService.show();
    this.dataSourceService.checkUrl(this.dataSourceDemo.url).then(res => {
      this.spinnerService.hide();
      if (res.isOk) {
        this.isTestUrl = true;
        this.notificationsService.addInfo('测试通过！');
      } else {
        this.notificationsService.addError('url不符合要求！');
      }
    });
  }

  fileCheck() {
    if (!this.files || this.files.length === 0) {
      return;
    }
    this.spinnerService.show();
    this.dataSourceService.checkUrlFile(this.files.map(f => f.id)).subscribe(
        (res: any) => {
          this.spinnerService.hide();
          if (res.failed && res.failed.length > 0) {
            this.notificationsService.addError('url不符合要求！');
          } else {
            this.isTestUrl = true;
            this.notificationsService.addInfo('测试通过！');
          }
        },
        () => {
          this.spinnerService.hide();
          this.notificationsService.addError('url不符合要求！');
        }
    );
  }

  finish() {
    this.spinnerService.show();
    this.dashboardService.create(this.params).then(() => this.spinnerService.hide())
        .then(() => this.router.navigate(['/monitor/dashboard/list']));
  }

  log() {
    console.log('loading');
  }
}
