import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-index-editor-modal',
  templateUrl: './index-editor-modal.component.html',
  styleUrls: ['./index-editor-modal.component.scss']
})
export class IndexEditorModalComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['aaa', [Validators.required]]
    });
  }
}
