import { Component, OnInit } from '@angular/core';
import { RadioOptionModel } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CarrinhoItem } from 'app/restaurants/restaurant-detail/carrinho/carrinho-item-model';
import { Pedido, PedidoItem } from './order-model';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;

  orderForm: FormGroup;

  valorFrete: number = 8;

  paymentOptions: RadioOptionModel[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' },
  ];

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      emailConfirmation: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      number: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      optionalAddress: [''],
      paymentOption: ['', [Validators.required]]
    },
      {
        validator: OrderComponent.equalsTo
      });
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');
    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }

    return undefined;
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
        this.router.navigate(['/order-summary']);

        this.orderService.limpar();
      });

  }
}
