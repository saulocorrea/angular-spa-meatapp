import { MenuItem } from "../menu-item/menu-item.model";

export class CarrinhoItem {
  constructor(public menuItem: MenuItem,
              public quantidade: number = 1) {

  }

  valor(): number {
    return this.menuItem.price * this.quantidade;
  }
}
