import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bomp-monitor-objects',
  templateUrl: './monitor-objects.component.html',
  styleUrls: ['./monitor-objects.component.scss']
})
export class MonitorObjectsComponent implements OnInit {
  public hotTags = ["Movie", "Book", "Music"];
  public selectedTags = [];

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log('You are interested in: ', this.selectedTags);
  }

  constructor() { }

  ngOnInit() {
  }

}
