import { Component, OnInit } from '@angular/core';
import {TaskService} from '@app/core';

@Component({
  selector: 'sbg-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {
tasks;
  constructor(private taskService:TaskService) { }

  ngOnInit() {
  	this.tasks = this.taskService.tasks;
  }

}
