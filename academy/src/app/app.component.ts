import { Component } from '@angular/core';

@Component({
  selector: 'aca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  saulo = {name: 'Saulo', isMatriculado: true, curso: 'Ciência da Computação'}
  bruna = {name: 'Bruna', isMatriculado: false}
  willian = {name: 'Willian', isMatriculado: true, curso: 'Sistemas de Informação'}
}
