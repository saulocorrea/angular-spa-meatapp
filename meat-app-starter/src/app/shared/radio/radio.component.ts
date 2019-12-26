import { Component, OnInit, Input } from '@angular/core';
import { RadioOptionModel } from './radio-option.model';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html'
})
export class RadioComponent implements OnInit {

  @Input() options: RadioOptionModel[];

  value: any;

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any): void {
    this.value = value;
  }
}
