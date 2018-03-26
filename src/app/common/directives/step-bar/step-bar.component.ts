import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-bar',
  templateUrl: './step-bar.component.html',
  styleUrls: ['./step-bar.component.scss']
})
export class StepBarComponent implements OnInit {

  constructor() {
    this.current = 1;
  }

  @Input() steps: string[];

  @Input() current;
  ngOnInit() {
  }

  getStatus(step) {
    if (step === this.current) {
      return 'active';
    } else if (step < this.current) {
      return 'pass';
    } else {
      return '';
    }
  }

  getText(step) {
    if (step >= this.current) {
      return step + 1;
    } else {
      return '✓';
    }
  }

}
