import { Component, OnInit } from '@angular/core';
import { RadioOptionModel } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CarrinhoItem } from 'app/restaurants/restaurant-detail/carrinho/carrinho-item-model';
import { Pedido, PedidoItem } from './order-model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  valorFrete: number = 8;

  paymentOptions: RadioOptionModel[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' },
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  carrinhoTotalItens(): number {
    return this.orderService.carrinhoTotalItens();
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

  finalizarCompra(pedido: Pedido): void {
    pedido.orderItems = this.carrinhoItens()
      .map((item: CarrinhoItem) => new PedidoItem(item.quantidade, item.menuItem.id));

    console.log(pedido);

    this.orderService.finalizarPedido(pedido)
      .subscribe((orderId: string) => {
        console.log(`Compra concluída: ${orderId}`);

        this.orderService.limpar();
      });

  }
}
