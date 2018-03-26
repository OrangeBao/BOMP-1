import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

@Component({
  selector: 'app-tag-bar',
  templateUrl: './tag-bar.component.html',
  styleUrls: ['./tag-bar.component.scss'],
})
export class TagBarComponent implements OnInit {

  @Input() tags: string[];
  @Output() change = new EventEmitter();
  selectTag: string[] = [];
  isNone = true;
  @HostBinding('class.all') isShowAll = false;
  constructor() { }

  isSelect(tag) {
    return  this.selectTag.find(t => t === tag);
  }

  ngOnInit() {
  }

  select(tag) {
    this.isNone = false;
    if (this.selectTag.find(t => t === tag)) {
      this.selectTag = this.selectTag.filter(t => t !== tag);
    } else {
      this.selectTag.push(tag);
    }
    this.emitChange();
  }

  emitChange() {
    if (!this.isNone) {
      this.change.emit(this.selectTag);
    } else {
      this.change.emit([]);
    }
  }

  selectNone() {
    this.isNone = true;
    this.selectTag = [];
    this.emitChange();
  }

  showAll() {
    this.isShowAll = !this.isShowAll;
  }

}
