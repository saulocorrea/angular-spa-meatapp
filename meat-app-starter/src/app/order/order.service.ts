import { Injectable } from "@angular/core";
import { CarrinhoService } from "app/restaurants/restaurant-detail/carrinho/carrinho.service";
import { CarrinhoItem } from "app/restaurants/restaurant-detail/carrinho/carrinho-item-model";
import { Observable } from "rxjs/Observable";
import { Pedido } from "./order-model";
import { Http, Headers, RequestOptions } from "@angular/http";
import { MEAT_API } from "app/app.api";

@Injectable()
export class OrderService {
  
  constructor(
    private carrinhoService: CarrinhoService,
    private http: Http) { }

  carrinhoItens(): CarrinhoItem[] {
    return this.carrinhoService.items;
  }

  incrementarQuantidade(item: CarrinhoItem): void {
    this.carrinhoService.incrementarQuantidade(item);
  }

  decrementarQuantidade(item: CarrinhoItem): void {
    this.carrinhoService.decrementarQuantidade(item);
  }

  removerItem(item: CarrinhoItem): void {
    this.carrinhoService.removerItem(item);
  }

  carrinhoTotalItens(): number {
    return this.carrinhoService.total();
  }

  finalizarPedido(pedido: Pedido): Observable<string> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
        `${MEAT_API}/orders`,
        JSON.stringify(pedido),
        new RequestOptions({ headers: headers }))
      .map(response => response.json())
      .map(order => order.id);
  }

  limpar() {
    this.carrinhoService.limpar();
  }
}
