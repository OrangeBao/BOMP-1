import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TitleService } from '../common/share.module';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit, OnDestroy {
  eventHandle: Subscription;
  titleData: {
    showTitle: boolean;
    text: string;
  } = {
    showTitle: false,
    text: ''
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: TitleService
  ) {}

  ngOnInit() {
    this.eventHandle = this.title.getMessage().subscribe(msg => {
      this.titleData.showTitle = msg.showTitle;
      this.titleData.text = msg.text;
    });
  }

  ngOnDestroy() {
    if (this.eventHandle) {
      this.eventHandle.unsubscribe();
    }
  }
}
