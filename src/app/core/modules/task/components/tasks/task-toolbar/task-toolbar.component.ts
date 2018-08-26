import { Component, OnInit,OnDestroy,DoCheck,ChangeDetectionStrategy,AfterViewInit } from '@angular/core';
import {TaskService,TaskFilter} from '@app/core';
import {Observable,Subject} from 'rxjs';
import {map,takeUntil} from 'rxjs/operators';

@Component({
  selector: 'sbg-task-toolbar',
  templateUrl: './task-toolbar.component.html',
  styleUrls: ['./task-toolbar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskToolbarComponent implements OnInit,OnDestroy{

currentFilter:TaskFilter = {
	status:undefined,
	limit:undefined
}
results$:Observable<number>;
destroy$:Subject<boolean> = new Subject<boolean>();

  constructor(private taskService:TaskService) {

 	}

   ngOnInit(){
      this.results$ = this.taskService.tasks.pipe(map((results)=>results && results.length),takeUntil(this.destroy$));
      this.taskService.currentFilter.subscribe((filter:TaskFilter)=>{
        this.currentFilter = filter;
      })
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

ngOnDestroy(){
  this.destroy$.next(true);
  this.destroy$.complete();
}

}
