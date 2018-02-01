import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataSourceService } from '../../../common/services/data-source/data-source.service';
import { DataSource } from '../../../common/models/data-source';
import { File } from '../../../common/models/file';
import { NotificationsService, LoadingService } from '../../../common/share.module';
import { DicService } from '../../../common/services/dic/dic.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-data-source-edit',
  templateUrl: './data-source-edit.component.html',
  styleUrls: ['./data-source-edit.component.scss']
})
export class DataSourceEditComponent implements OnInit {
  constructor(
      private dicService: DicService,
      protected notificationsService: NotificationsService,
      private location: Location,
      private dataSourceService: DataSourceService,
      private router: Router,
      private route: ActivatedRoute,
      private spinnerService: LoadingService
  ) { }
  dataSource: DataSource = new DataSource();
  scrapeInterval: string;
  u: any;
  reg: any;
  method = 'independent';
  isCheck = false;
  files: Array<File>;
  isTestUrl: boolean = true;
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
    this.route.params
        .switchMap((params: Params) => this.dataSourceService.getAll()
            .then(data => data.filter((d) => d.id === parseInt(params.id, 10))[0]))
        .subscribe(data => {
          this.dataSource.name = data.name;
          this.dataSource.url = data.url;
          this.dataSource.lang1 = data.lang1;
          this.dataSource.id = data.id;
          this.dataSource.desc = data.desc;
          this.dataSource.regionId = data.regionId;
          this.scrapeInterval = data.options.scrape_interval.slice(0, -1);
          this.reg = this.region.filter(r => r.key === data.regionId)[0];
          const uKey = data.options.scrape_interval.slice(-1);
          this.u = this.unit.filter(u => u.key === uKey)[0];
        });
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
    if (this.isTestUrl && this.checkInput()) {
      const params = {
        name: this.dataSource.name,
        regionId:  this.reg.key,
        url: this.dataSource.url,
        lang1: this.dataSource.lang1,
        desc: this.dataSource.desc,
        id: this.dataSource.id,
        options: {
          honor_labels: true,
          scrape_interval: this.scrapeInterval + this.u.key
        }
      };
      this.spinnerService.show();
      this.dataSourceService.update(params).then(() => {
        this.spinnerService.hide();
        this.notificationsService.addInfo('更新成功！');
        this.router.navigate(['../list'], { relativeTo: this.route });
      }).catch(err => {
        console.log(err);
        this.notificationsService.addError('更新失败！');
      });
    }
  }

  get region() {
    return this.dicService.getRegion();
  }

  get unit() {
    return this.dicService.getTimeUnit();
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

}
