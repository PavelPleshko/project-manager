import { Component, OnInit } from '@angular/core';

export type TaskStatus = 'all' | 'completed';

export interface TaskFilter{
	status:TaskStatus;
	name:string;
}

@Component({
  selector: 'sbg-task-toolbar',
  templateUrl: './task-toolbar.component.html',
  styleUrls: ['./task-toolbar.component.scss']
})
export class TaskToolbarComponent implements OnInit {
currentFilter:TaskFilter = {
	status:'all',
	name:''
}
  constructor() { }

  ngOnInit() {
  }

}
