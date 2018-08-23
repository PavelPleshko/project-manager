import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: '[sbgTaskSingle]',
  templateUrl: './task-single.component.html',
  styleUrls: ['./task-single.component.css']
})
export class TaskSingleComponent implements OnInit {
@Input() task:any;
  constructor() { }

  ngOnInit() {
  }

}
