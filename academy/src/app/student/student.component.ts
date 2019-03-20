import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aca-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass']
})
export class StudentComponent implements OnInit {

  name: string = 'Saulo'
  isMatriculado: boolean = true

  constructor() { }

  ngOnInit() {
  }

}
