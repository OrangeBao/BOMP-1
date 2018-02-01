import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-goback',
  templateUrl: './goback.component.html',
  styleUrls: ['./goback.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GobackComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }


  goBack(): void {
    this.location.back();
  }
}
