import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-order-total',
  templateUrl: './order-total.component.html'
})
export class OrderTotalComponent implements OnInit {

  @Input() valorItens: number;
  @Input() valorFrete: number;
  
  constructor() { }

  ngOnInit() {
  }

  total(): number {
    return this.valorItens + this.valorFrete;
  }
}
