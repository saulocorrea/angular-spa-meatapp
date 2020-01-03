import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CarrinhoItem } from 'app/restaurants/restaurant-detail/carrinho/carrinho-item-model';

@Component({
  selector: 'mt-order-items',
  templateUrl: './order-items.component.html'
})
export class OrderItemsComponent implements OnInit {

  @Input() itens: CarrinhoItem[];

  @Output() incrementarQuantidade = new EventEmitter<CarrinhoItem>();
  @Output() decrementarQuantidade = new EventEmitter<CarrinhoItem>();
  @Output() remover = new EventEmitter<CarrinhoItem>();

  constructor() { }

  ngOnInit() {
  }

  emitIncrementarQuantidade(item: CarrinhoItem): void {
    this.incrementarQuantidade.emit(item);
  }

  emitDecrementarQuantidade(item: CarrinhoItem): void {
    this.decrementarQuantidade.emit(item);
  }

  emitRemover(item: CarrinhoItem): void {
    this.remover.emit(item);
  }
}
