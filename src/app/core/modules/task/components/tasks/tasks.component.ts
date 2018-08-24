import { Component, OnInit } from '@angular/core';
import {pluck,take} from 'rxjs/operators';

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
    this.taskService.shouldFetch.subscribe(()=>{
      let filter = this.taskService.currentFilter.getValue();
      this.getTasks(filter);
    })
  	
  }

  getTasks(params?:Object){
  	this.taskService.getTasks(params).pipe(pluck('items'),take(1)).subscribe((taskList:Task[])=>{
  		this.taskService.pushToCurrentTasks(taskList);
  	})
  }

}
