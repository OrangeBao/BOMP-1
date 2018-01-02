import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  constructor(private router: Router) { }

  get isShowTab() {
    const currentUrl = this.router.url.split('#')[0];
    return currentUrl !== '/monitor/scan' && currentUrl !== '/monitor/edit';
  }
  ngOnInit() {
  }
}
