import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataSourceService } from '../../../common/services/data-source/data-source.service';
import { DataSource } from '../../../common/models/data-source';
import { File } from '../../../common/models/file';
import { NotificationsService, LoadingService } from '../../../common/share.module';
import { DicService } from '../../../common/services/dic/dic.service';

@Component({
  selector: 'app-data-source-create',
  templateUrl: './data-source-create.component.html',
  styleUrls: ['./data-source-create.component.scss']
})
export class DataSourceCreateComponent implements OnInit {
  constructor(
      private dicService: DicService,
      protected notificationsService: NotificationsService,
      private location: Location,
      private dataSourceService: DataSourceService,
      private router: Router,
      private activeRoute:  ActivatedRoute,
      private spinnerService: LoadingService
  ) { }
  dataSource: DataSource = new DataSource();
  scrapeInterval: string;
  u: any;
  reg: any;
  method = 'independent';
  isCheck = false;
  files: Array<File>;
  isTestUrl: boolean;
  get isError() {
    if (this.isCheck) {
      return {
        name: !this.dataSource.name,
        url: !this.dataSource.url,
        lang1: !this.dataSource.lang1,
        desc: !this.dataSource.desc,
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
  ngOnInit() {
    this.reg = this.region[0];
    this.u = this.unit[0];
  }

  goBack(): void {
    this.location.back();
  }
  checkInput() {
    this.isCheck = true;
    const isError = this.isError;
    return Object.keys(isError).every(k => {
      return !isError[k];
    });
  }
  publish(): void {
    if (this.isTestUrl) {
      if (this.method === 'independent' && this.checkInput()) {
        const params = {
          name: this.dataSource.name,
          regionId:  this.reg.key,
          url: this.dataSource.url,
          lang1: this.dataSource.lang1,
          desc: this.dataSource.desc,
          options: {
            honor_labels: true,
            scrape_interval: this.scrapeInterval + this.u.key
          }
        };
        this.spinnerService.show();
        this.dataSourceService.create(params).then(() => {
          this.spinnerService.hide();
          this.notificationsService.addInfo('创建成功！');
          this.router.navigate(['../list'], { relativeTo: this.activeRoute });
        }).catch(err => {
          this.spinnerService.hide();
          this.notificationsService.addError('系统异常，请联系管理员！');
          console.error(err);
        });
      } else if (this.method === 'batch') {
        this.spinnerService.show();
        this.dataSourceService.createByFiles(this.files.map(f => f.id)).subscribe(
            (res: any) => {
              this.spinnerService.hide();
              if (res.failed && res.failed.length > 0) {
                this.notificationsService.addError('创建失败！');
              } else {
                this.notificationsService.addInfo('成功!');
                this.router.navigate(['../list'], { relativeTo: this.activeRoute });
              }
            },
            () => {
              this.spinnerService.hide();
              this.notificationsService.addError('创建失败！');
            }
        );
      }
    }
  }

  get region() {
    return this.dicService.getRegion();
  }

  get unit() {
    return this.dicService.getTimeUnit();
  }

  testUri() {
    if (!this.dataSource.url) {
      return;
    }
    this.spinnerService.show();
    this.dataSourceService.checkUrl(this.dataSource.url).then(res => {
      this.spinnerService.hide();
      if (res.isOk) {
        this.isTestUrl = true;
        this.notificationsService.addInfo('测试通过！');
      } else  {
        this.notificationsService.addError('url不符合要求！');
      }
    }).catch(err => {
      this.spinnerService.hide();
      this.notificationsService.addError('系统异常，请联系管理员！');
      console.error(err);
    });
  }

  changeUnit(v) {
    this.u = v;
  }

  changeRegion(v) {
    this.reg = v;
  }

  fileChange(fileList) {
    this.files = fileList;
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

  fileUploadError(err) {
    this.spinnerService.hide();
    this.notificationsService.addError('系统异常，请联系管理员！');
    console.error(err);
  }

  fileStartUpload() {
    this.spinnerService.show();
  }
  fileEnd() {
    this.spinnerService.hide();
  }
}
