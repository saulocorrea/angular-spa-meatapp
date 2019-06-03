import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoItem } from './carrinho-item-model';
import { MenuItem } from '../menu-item/menu-item.model';

@Component({
  selector: 'mt-carrinho',
  templateUrl: './carrinho.component.html'
})
export class CarrinhoComponent implements OnInit {

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit() {
  }

  items(): CarrinhoItem[] {
    return this.carrinhoService.items;
  }

  total(): number {
    return this.carrinhoService.total();
  }

  limpar() {
    this.carrinhoService.limpar();
  }

  removerItem(item: CarrinhoItem) {
    this.carrinhoService.removerItem(item);
  }

  adicionarItem(item: MenuItem) {
    this.carrinhoService.adicionarItem(item);
  }
}
