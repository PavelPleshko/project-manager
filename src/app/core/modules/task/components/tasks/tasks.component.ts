import { Component, OnInit } from '@angular/core';
import {pluck} from 'rxjs/operators';

import {TaskService} from '@app/core';
import {Task} from '../../interfaces/task';

@Component({
  selector: 'sbg-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  constructor(private taskService:TaskService) { }

  ngOnInit() {
  	this.getTasks({fields:'_all'});
  }

  getTasks(params?:Object){
  	this.taskService.getTasks(params).pipe(pluck('items')).subscribe((taskList:Task[])=>{
  		console.log(taskList);
  		this.taskService.pushToCurrentTasks(taskList);
  	})
  }

}
