import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { ModalService } from '../../services/modal/modal.service';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  globalAlertId: string = "globalAlertId";
  alertInfo: Alert = new Alert();

  constructor(private alertService: AlertService, private modalService: ModalService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(alert => {
      this.alertInfo = alert;
      this.modalService.show(this.globalAlertId);
    });
  }

  cancelCallback(): Function {
    if (!this.alertInfo.cancel) return null;
    return () => {
      this.modalService.hide(this.globalAlertId);
      this.alertInfo.cancel && this.alertInfo.cancel();
    }
  }

  okCallback(): Function {
    return () => {
      this.modalService.hide(this.globalAlertId);
      this.alertInfo.ok && this.alertInfo.ok();
    };
  }

  get isShowCancel() {
    //TODO: 如何动态修改组件属性
    return !!this.alertInfo.cancel;
  }

}
