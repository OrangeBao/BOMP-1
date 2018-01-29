import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-op-display',
  templateUrl: './op-display.component.html',
  styleUrls: ['./op-display.component.scss']
})
export class OpDisplayComponent implements OnInit {

  constructor(private router: Router) { }

  get isShowTab() {
    const currentUrl = this.router.url.split('#')[0];
    return currentUrl !== '/op_display/scan' && currentUrl !== '/op_display/edit';
  }
  ngOnInit() {
  }

}
