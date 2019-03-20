import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aca-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.sass']
})
export class StudentComponent implements OnInit {

  @Input() name: string
  @Input() isMatriculado: boolean

  constructor() { }

  ngOnInit() {
  }

}
