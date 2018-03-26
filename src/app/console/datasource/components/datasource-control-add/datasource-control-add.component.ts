import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

import { TitleService } from '../../../../common/share.module';
import { DataSource } from '../../../../common/models/data-source';
import { DataSourceService } from '../../../../common/services/data-source/data-source.service';

@Component({
  selector: 'app-datasource-control-add',
  templateUrl: './datasource-control-add.component.html',
  styleUrls: ['./datasource-control-add.component.scss']
})
export class DatasourceControlAddComponent implements OnInit, OnDestroy {
  @ViewChild('permissionSpan') permissionSpan: any;

  checkOptionsOne = [
    { label: '基础认证', value: 'Apple' },
    { label: '启用证书', value: 'Pear' },
    { label: 'TLS客户端认证', value: 'Orange' },
    { label: '启用CA认证', value: 'Purple' }
  ];

  validateForm: FormGroup;

  isFinished: boolean;
  count: number;
  timer: any;
  accessList: Array<string>;
  typeList: Array<string>;
  authenticationList: Array<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private title: TitleService,
    private dataSourceService: DataSourceService
  ) {
    this.title.sendMsg({
      showTitle: true,
      text: '添加数据源'
    });

    this.accessList = ['代理'];
    this.typeList = ['OpenTSDB', 'InfluxDB', 'AMS', 'Prometheus'];
    this.authenticationList = [
      { label: '基础认证', value: 'basicAuth' }
      // { label: "启用证书", value: "启用证书" },
      // { label: "TLS客户端认证", value: "TLS客户端认证" },
      // { label: "启用CA认证", value: "启用CA认证" }
    ];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      url: [null, [Validators.required]],
      access: [null, [Validators.required]],
      permission: ['只读', [Validators.required]],
      authentication: [this.authenticationList, [Validators.required]],
      description: [null]
      // basicAuthUser: [null, [Validators.required]],
      // basicAuthPassword: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: ''
    });
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  showAuthDialog() {
    // TODO: rxjs
    const flag: boolean =
      this.getFormControl('authentication').value.filter(
        r => r.value === 'basicAuth' && r.checked
      ).length > 0;

    if (flag) {
      const basicAuthUser: FormControl = new FormControl(
        null,
        Validators.required
      );
      this.validateForm.addControl('basicAuthUser', basicAuthUser);
      const basicAuthPassword: FormControl = new FormControl(
        null,
        Validators.required
      );
      this.validateForm.addControl('basicAuthPassword', basicAuthPassword);
    } else {
      this.validateForm.removeControl('basicAuthUser');
      this.validateForm.removeControl('basicAuthPassword');
    }

    return flag;
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  submitForm() {
    for (const field of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[field].markAsDirty();
    }

    if (this.validateForm.valid) {
      const dataSource: DataSource = new DataSource();
      Object.assign(dataSource, {
        name: this.getFormControl('name').value,
        type: this.getFormControl('type').value,
        url: this.getFormControl('url').value,
        permission: this.permissionSpan.nativeElement.innerHTML,
        // TODO: 怎么只返回checked的list
        // authentication: this.getFormControl("authentication").value,
        // authentication: this.getFormControl("authentication")
        //   .value.filter(r => r.checked)
        //   .map(r => r.value),
        basicAuth:
          this.getFormControl('authentication').value.filter(
            r => r.value === 'basicAuth' && r.checked
          ).length > 0,
        basicAuthUser: this.getFormControl('basicAuthUser').value,
        basicAuthPassword: this.getFormControl('basicAuthPassword').value,
        desc: this.getFormControl('description').value
      });

      this.dataSourceService.addDataSource(dataSource).subscribe(() => {
        this.isFinished = true;

        this.count = 5;
        this.timer = setInterval(() => {
          this.count -= 1;
          if (this.count === 0) {
            this.router.navigate(['/console/datasourcecontrol/table']);
          }
        }, 1000);
      });
    }
  }
}
