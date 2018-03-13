import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.scss']
})
export class IframeContainerComponent implements OnInit {

  @Input() isHiddenTitle = false;
  @Input() src: string;
  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.loadingService.show();
  }

  onload() {
    // TODO: grafana渲染延迟
    setTimeout(() => {
      this.loadingService.hide();
    }, 4000);
  }
}
