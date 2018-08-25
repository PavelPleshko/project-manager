import { Component, OnInit,OnDestroy } from '@angular/core';
import {pluck,take,map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {TaskService} from '@app/core';
import {Task} from '../../interfaces/task';

@Component({
  selector: 'sbg-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit,OnDestroy {
  subscriptions:Subscription[]=[];
  constructor(private taskService:TaskService) { }

  ngOnInit() {
    let shouldFetch = this.taskService.shouldFetch.subscribe(()=>{
      let filter = this.taskService.currentFilter.getValue();
      this.getTasks(filter);
    });
   
    this.subscriptions.push(shouldFetch);
  	
  }

  getTasks(params?:Object){
  	this.taskService.getTasks(params).pipe(pluck('items'),take(1)).subscribe((taskList:Task[])=>{
  		this.taskService.pushToCurrentTasks(taskList);
  	})
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub=>{
      sub.unsubscribe();
    })
  }

}
