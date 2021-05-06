import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-order-resumo',
  templateUrl: './order-resumo.component.html'
})
export class OrderResumoComponent implements OnInit {

  rated: boolean
  rateValue: number

  constructor() { }

  ngOnInit() {
  }

  rate(rate: number) {
    this.rated = true;
    this.rateValue = rate;
  }

}
