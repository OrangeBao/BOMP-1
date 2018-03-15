import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TitleService } from '../../common/share.module';

@Component({
  selector: 'bomp-indexes',
  templateUrl: './indexes.component.html',
  styleUrls: ['./indexes.component.scss']
})
export class IndexesComponent implements OnInit {
  eventHandle: Subscription;
  titleData: {
    showTitle: boolean;
    text: string;
  } = {
    showTitle: false,
    text: ''
  };
  
  constructor(private _router: Router, private title: TitleService) { }

  ngOnInit() {
    this.eventHandle = this.title.getMessage().subscribe(msg => {
      this.titleData.showTitle = msg.showTitle;
      this.titleData.text = msg.text;
    })
  }

  ngOnDestroy() {
    this.eventHandle && this.eventHandle.unsubscribe();
  }

  tabSelectChange(path){
    this._router.navigateByUrl("/monitor/indexes/" + path);
  }
}
