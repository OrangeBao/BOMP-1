import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
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

  validateForm: FormGroup;

  isFinished: boolean;
  count: number;
  timer: any;
  typeList: Array<string>;

  constructor(private fb: FormBuilder, private router: Router, private title: TitleService, private dataSourceService: DataSourceService) {
    this.title.sendMsg({
      showTitle: true,
      text: "添加数据源"
    });

    this.typeList = ["OpenTSDB", "InfluxDB", "AMS", "Prometheus"];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      url: [null, [Validators.required]],
      // permission: ["只读", [Validators.required]],
      type: [null, [Validators.required]],
      basicAuthUser: [null],
      basicAuthPassword: [null],
      description: [null]
    });
  }

  ngOnDestroy() {
    this.title.sendMsg({
      showTitle: false,
      text: '',
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

    let dataSource: DataSource = new DataSource();
    Object.assign(dataSource, {
      name: this.getFormControl("name").value,
      url: this.getFormControl("url").value,
      permission: this.permissionSpan.nativeElement.innerHTML,
      type: this.getFormControl("type").value,
      basicAuthUser: this.getFormControl("basicAuthUser").value,
      basicAuthPassword: this.getFormControl("basicAuthPassword").value,
      desc: this.getFormControl("description").value
    });

    this.dataSourceService.addDataSource(dataSource).subscribe(()=>{
      this.isFinished = true;

      this.count = 5;
      this.timer = setInterval( () => {
        this.count -= 1;
        if (this.count === 0) {
          this.router.navigate(['/console/datasourcecontrol/table']);
        }
      }, 1000);
    });

  }
}
