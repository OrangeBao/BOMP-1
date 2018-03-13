import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  @Output() search = new EventEmitter<string>();
  @Input() placeholder;

  ngOnInit() {
  }


  onKeyPress(event) {
    if (13 === event.keyCode) {
      this.search.emit(event.target.value);
    }
  }

}
