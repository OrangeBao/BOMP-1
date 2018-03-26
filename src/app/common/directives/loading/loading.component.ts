import { Component, OnInit, HostBinding } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  @HostBinding('style.display') displayType = 'none';

  constructor(
    private spinnerService: LoadingService
  ) { }

  ngOnInit() {
    this.spinnerService.getMessage().subscribe((flag: boolean) => {
      if (flag) {
        this.displayType = '';
      } else {
        this.displayType = 'none';
      }
    });
  }

}
