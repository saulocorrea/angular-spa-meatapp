import { CarrinhoItem } from "./carrinho-item-model";
import { MenuItem } from "../menu-item/menu-item.model";

export class CarrinhoService {
    
  items: CarrinhoItem[] = []

  total(): number {
    return this.items
      .map(item => item.valor())
      .reduce((prev, valor) => prev + valor, 0)
  }

  limpar() {
    this.items = []
  }

  adicionarItem(item: MenuItem) {
    let itemEncontrado = this.items.find((mItem) => mItem.menuItem.id == item.id)
    if (itemEncontrado) {
      this.incrementarQuantidade(itemEncontrado);
    } else {
      this.items.push(new CarrinhoItem(item));
    }
  }

  removerItem(item: CarrinhoItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  incrementarQuantidade(item: CarrinhoItem): void {
    item.quantidade = item.quantidade + 1;
  }

  decrementarQuantidade(item: CarrinhoItem): void {
    item.quantidade = item.quantidade - 1;
    if (item.quantidade === 0) {
      this.removerItem(item);
    }
  }
}
