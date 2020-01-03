import { Component, OnInit } from '@angular/core';
import { RadioOptionModel } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CarrinhoItem } from 'app/restaurants/restaurant-detail/carrinho/carrinho-item-model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOptionModel[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' },
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  carrinhoItens(): CarrinhoItem[] {
    return this.orderService.carrinhoItens();
  }

  incrementarQuantidade(item: CarrinhoItem): void {
    this.orderService.incrementarQuantidade(item);
  }

  decrementarQuantidade(item: CarrinhoItem): void {
    this.orderService.decrementarQuantidade(item);
  }

  remover(item: CarrinhoItem): void {
    this.orderService.removerItem(item);
  }
}
