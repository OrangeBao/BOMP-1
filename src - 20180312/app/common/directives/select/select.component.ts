import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  showDropMenu = false;
  selectItem: any;
  get value() {
   this.selectItem = this.selectItem || this.default || this.options[0];
   return  this.selectItem && this.selectItem.value;
  }
  constructor() {}

  @Input() options: Array<any>;
  @Input() default: {};
  @Output() change = new EventEmitter<{}>();

  ngOnInit() {
    this.selectItem = this.default || this.options[0];
  }

  switchDropMenu() {
    this.showDropMenu = !this.showDropMenu;
  }
  choice(item) {
    const key = item.key;
    this.selectItem = this.options.filter(o => o.key === key)[0];
    this.switchDropMenu();
    this.change.emit(item);
  }
}
