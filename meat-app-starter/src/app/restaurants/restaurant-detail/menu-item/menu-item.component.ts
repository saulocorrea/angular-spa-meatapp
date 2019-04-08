import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit {

  @Input() item: MenuItem  
  @Output() adicionar = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  emitAdicionarEvent() {
    this.adicionar.emit(this.item)
  }

}
