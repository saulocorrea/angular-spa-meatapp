import { Component } from '@angular/core';
import { Student } from "./student/student.model";
@Component({
  selector: 'aca-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  students: Student[] = [
    {name: 'Saulo', isMatriculado: true, curso: 'Ciência da Computação'},
    {name: 'Bruna', isMatriculado: false},
    {name: 'Willian', isMatriculado: true, curso: 'Sistemas de Informação'}
  ]
}
