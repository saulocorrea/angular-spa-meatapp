import { Component, OnInit, Input } from '@angular/core';
import { Student } from "./student.model";

@Component({
  selector: 'aca-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass']
})
export class StudentComponent implements OnInit {

  @Input() student: Student

  constructor() { }

  ngOnInit() {
  }

  clicked() {
    console.log(`Clique sobre o nome: ${this.student.name}`)
  }

}
