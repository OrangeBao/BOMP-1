import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

import { TitleService } from "../../../../common/share.module";
import { DataSource } from "../../../../common/models/data-source";
import { DataSourceService } from "../../../../common/services/data-source/data-source.service";

@Component({
  selector: "app-datasource-control-add",
  templateUrl: "./datasource-control-add.component.html",
  styleUrls: ["./datasource-control-add.component.scss"]
})
export class DatasourceControlAddComponent implements OnInit {
  @ViewChild("permissionSpan") permissionSpan: any;

  checkOptionsOne = [
    { label: "基础认证", value: "Apple" },
    { label: "启用证书", value: "Pear" },
    { label: "TLS客户端认证", value: "Orange" },
    { label: "启用CA认证", value: "Purple" }
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
      text: "添加数据源"
    });

    this.accessList = ["代理"];
    this.typeList = ["OpenTSDB", "InfluxDB", "AMS", "Prometheus"];
    this.authenticationList = [
      { label: "基础认证", value: "Apple" },
      { label: "启用证书", value: "Pear" },
      { label: "TLS客户端认证", value: "Orange" },
      { label: "启用CA认证", value: "Purple" }
    ];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      url: [null, [Validators.required]],
      access: [null, [Validators.required]],
      permission: ["只读", [Validators.required]],
      authentication: [this.authenticationList, [Validators.required]],
      description: [null]
    });
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: ""
    });
    this.timer && clearInterval(this.timer);
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      let dataSource: DataSource = new DataSource();
      Object.assign(dataSource, {
        name: this.getFormControl("name").value,
        type: this.getFormControl("type").value,
        url: this.getFormControl("url").value,
        permission: this.permissionSpan.nativeElement.innerHTML,
        // TODO: 怎么只返回checked的list
        // authentication: this.getFormControl("authentication").value,
        authentication: this.getFormControl("authentication").value.filter(r=> r.checked).map(r=>r.value),
        desc: this.getFormControl("description").value
      });

      console.log(dataSource);

      // this.dataSourceService.addDataSource(dataSource).subscribe(()=>{
      //   this.isFinished = true;

      //   this.count = 5;
      //   this.timer = setInterval( () => {
      //     this.count -= 1;
      //     if (this.count === 0) {
      //       this.router.navigate(['/console/datasourcecontrol/table']);
      //     }
      //   }, 1000);
      // });
    }
  }
}
