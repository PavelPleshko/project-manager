import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject,Subject,merge} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {RestService} from './rest.service';
import {Task} from '@app/core/modules/task/interfaces';


export type TaskStatus = '' | 'COMPLETED';

export interface TaskFilter{
	status?:TaskStatus;
	limit:number;
	fields?:string;
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {
tasks:BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);
fetchTasks:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
shouldFetch:Observable<boolean>;
selectedTasks:Set<any> =new Set();
selectedTasks$:Subject<Set<any>> = new Subject<Set<any>>();
currentFilter:BehaviorSubject<TaskFilter> =new BehaviorSubject<TaskFilter>({
	limit:10,
	fields:'_all'
});

  constructor(private restService:RestService) {
  	this.shouldFetch = merge(this.fetchTasks,this.currentFilter).pipe(mapTo(true));
   }

  requestFetch(){
  	this.fetchTasks.next(true);
  }

  pushToCurrentTasks(tasks:Task[]):void{
  	this.tasks.next(tasks);
  }

  //api

  getTasks(params?:any):Observable<Task[]>{
  	return this.restService.getApi('tasks',params);
  }

  getSingleTask(taskId:string):Observable<Task>{
  	return this.restService.getApi(`tasks/${taskId}`);
  }

  deleteSingleTask(taskId:string):Observable<Task>{
  	return this.restService.deleteApi(`tasks/${taskId}`);
  }

  //selection
  selectTask(item:any):void{
  	this.selectedTasks.add(item);
  	this.updateSelectedTasksObs(this.selectedTasks);
  } 

  removeTaskFromSelected(item:any):void{
  	this.selectedTasks.delete(item);
  	this.updateSelectedTasksObs(this.selectedTasks);
  }

  addAllToSelected():void{
  	this.selectedTasks = new Set([...Array.from(this.selectedTasks),...this.tasks.getValue()]);
  	this.updateSelectedTasksObs(this.selectedTasks);
  }

  deleteAllFromSelected():void{
  	this.selectedTasks.clear();
  	this.updateSelectedTasksObs(this.selectedTasks);
  }

  updateSelectedTasksObs(selectedTasks:Set<any>):void{
  	this.selectedTasks$.next(selectedTasks);
  }

  //filtering
  updateFilter(filter:TaskFilter){
  	let mergedFilter:TaskFilter = {...this.currentFilter.getValue(),...filter};
  	mergedFilter = this.removeEmptyFields(mergedFilter);
  	this.currentFilter.next(mergedFilter);
  }

  removeEmptyFields(obj:TaskFilter):TaskFilter{
  	for(let key in obj){
  		if(!(!!(obj[key])) && obj[key] != 0){
  			delete obj[key];
  		}
  	}
  	return obj;
  }
}
