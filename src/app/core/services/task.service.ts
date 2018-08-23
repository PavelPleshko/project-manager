import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject} from 'rxjs';

import {RestService} from './rest.service';
import {Task} from '@app/core/modules/task/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
tasks:BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);

  constructor(private restService:RestService) { }

  pushToCurrentTasks(tasks:Task[]):void{
  	this.tasks.next(tasks);
  }

  getTasks(params?:any):Observable<Task[]>{
  	return this.restService.getApi('tasks',params);
  }
}
