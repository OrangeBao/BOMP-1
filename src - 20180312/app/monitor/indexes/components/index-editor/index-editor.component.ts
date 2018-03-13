import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: 'bomp-index-editor',
  templateUrl: './index-editor.component.html',
  styleUrls: ['./index-editor.component.scss']
})
export class IndexEditorComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: ['aaa', [Validators.required]],

    });
  }

}
