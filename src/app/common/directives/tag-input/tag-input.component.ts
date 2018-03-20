import { Component, OnInit, Input, forwardRef, ViewChild, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR,
  ValidatorFn, AbstractControl, ValidationErrors,
  NG_VALIDATORS } from '@angular/forms';

export const EXE_COUNTER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagInputComponent),
  multi: true
};

export const validateCounterRange: ValidatorFn = (control: AbstractControl): 
  ValidationErrors => {
    return (control.value && control.value.length > 0) ?
         null : { 'required': true};
};

export const EXE_COUNTER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useValue: validateCounterRange,
    multi: true
};

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [EXE_COUNTER_VALUE_ACCESSOR, EXE_COUNTER_VALIDATOR]
})
export class TagInputComponent implements ControlValueAccessor {

  @Input() _tags: string[] = [];

  @ViewChild('tagInput') inputTemp: any;

  flag: boolean = false;
  inValue: string = '';

  change(event) {
    this.inValue = event.target.value;
  }
  get tags() {
      return this._tags;
  }

  set tags(value: string[]) {
      this._tags = value;
      this.propagateChange(this._tags);
  }

  propagateChange = (_: any) => { };

  writeValue(value: any) {
      if (value) {
          this.tags = value;
      }
  }

  registerOnChange(fn: any) {
      this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  deleteTag(index) {
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)]
  }

  addTag() {
    if (this.inValue && this.inValue.length > 0) {
      this.tags = [...this.tags, this.inValue]
      this.inputTemp.nativeElement.value = '';
    }
    this.flag = false;
  }

  addNew() {
    this.flag = true;
    setTimeout(() => this.inputTemp.nativeElement.focus(), 100);
    ;
  }

}
