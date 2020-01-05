import { Injectable } from "@angular/core";
import { CarrinhoService } from "app/restaurants/restaurant-detail/carrinho/carrinho.service";
import { CarrinhoItem } from "app/restaurants/restaurant-detail/carrinho/carrinho-item-model";

@Injectable()
export class OrderService {
    
  constructor(private carrinhoService: CarrinhoService) { }

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
}
