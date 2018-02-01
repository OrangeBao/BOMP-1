import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-op-display',
  templateUrl: './op-display.component.html',
  styleUrls: ['./op-display.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OpDisplayComponent implements OnInit {

  constructor(private router: Router) { }

  get isShowTab() {
    // const currentUrl = this.router.url.split('#')[0];
    // return currentUrl !== '/op_display/scan'
    //   && currentUrl !== '/op_display/edit';
    // TODO:
    return true;
  }

  get isHome() {
    const currentUrl = this.router.url.split('#')[0];
    return currentUrl !== '/op_display/dashboard/create'
      && currentUrl !== '/op_display/data-source/create';
  }

  get tText() {
    const currentUrl = this.router.url.split('#')[0];
    return ({
      '/op_display/dashboard/create': '新建仪表盘',
      '/op_display/data-source/create': '新建监控源',
    })[currentUrl] || '监控'
  }

  get dark() {
    const currentUrl = this.router.url.split('#')[0];
    return [
      '/op_display/dashboard/create',
      '/op_display/data-source/create'
    ].indexOf(currentUrl) !== -1;
  }

  ngOnInit() {
  }

}
