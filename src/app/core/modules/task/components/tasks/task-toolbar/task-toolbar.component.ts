import { Component, OnInit } from '@angular/core';
import {TaskService,TaskFilter} from '@app/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'sbg-task-toolbar',
  templateUrl: './task-toolbar.component.html',
  styleUrls: ['./task-toolbar.component.scss']
})
export class TaskToolbarComponent implements OnInit {

currentFilter:TaskFilter = {
	status:undefined,
	limit:undefined
}
results$:Observable<number>;

  constructor(private taskService:TaskService) {
  		this.results$ = this.taskService.tasks.pipe(map((results)=>results && results.length));
  		this.taskService.currentFilter.subscribe((filter:TaskFilter)=>{
  			this.currentFilter = filter;
  		})
 	}

  ngOnInit() {

  }

  updateFilters(){
    this.taskService.updateFilter(this.currentFilter);
  }

  onStatusFilterChange(event):void{
  	let target = event.target;
  	if(target.checked){
  		this.currentFilter.status = target.value;
  	}else{
  		this.currentFilter.status = '';
  	}
  	this.updateFilters();
  }

  clearFilter(filterName:string):void{
  	this.currentFilter = {...this.currentFilter,[filterName]:null};
  	this.updateFilters();
  }


}
