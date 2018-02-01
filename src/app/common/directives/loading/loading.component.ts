import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  host: {
    '[style.display]': "showSpinner ? '' : 'none'"
  }
})
export class LoadingComponent implements OnInit {

  showSpinner:boolean = false;
  constructor(
    private spinnerService: LoadingService
  ) { }

  ngOnInit() {
    this.spinnerService.getMessage().subscribe((flag: boolean) => {
      this.showSpinner = flag
    });
  }

}
