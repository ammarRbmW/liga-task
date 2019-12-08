import {Component, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
})
export class InputValidationComponent implements OnInit {
  public formGroup: FormGroup;

  @Input() field: string;
  @Input() placeholder: string;
  @Input() type = 'text';
  @Input() inputForm: FormGroup;
  @Output() outForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.formGroup = this.inputForm;
  }
}
