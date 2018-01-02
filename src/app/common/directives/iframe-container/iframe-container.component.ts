import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.scss']
})
export class IframeContainerComponent implements OnInit {

  isLoaded = false;
  @Input() isHiddenTitle = false;
  @Input() src: string;
  config = {
    c1: '#0055a5',
    c2: '#45aee7',
    width: '2'
  };
  constructor() { }

  ngOnInit() {
  }

  onload() {
    // TODO: grafana渲染延迟
    setTimeout(() => this.isLoaded = true, 4000);
  }
}
