import { Component, OnInit,OnDestroy } from '@angular/core';
import {TaskService} from '@app/core';
import {map,take,takeUntil} from 'rxjs/operators';
import {Observable,Subject} from 'rxjs';

@Component({
  selector: 'sbg-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit,OnDestroy {
tasks;
destroy$:Subject<boolean>=new Subject<boolean>();
selectedSize:Observable<number>;
selectAll:boolean = false;

  constructor(private taskService:TaskService) { }

  ngOnInit() {
  	this.taskService.tasks.pipe(takeUntil(this.destroy$)).subscribe((tasks)=>{
  		this.tasks = tasks;
  	});
  	let selectedTasks = this.taskService.selectedTasks$;
  	this.selectedSize = selectedTasks.pipe(map(selected=>selected.size));
  }

  onSelectChanged(event:{item:any,selected:boolean}){
  	if(event.selected){
  		this.taskService.selectTask(event.item);
  	}else{
  		this.taskService.removeTaskFromSelected(event.item);
  	}
  }

  selectAllTasks():void{
  	this.selectAll = !this.selectAll;
  	if(this.selectAll){
  		this.taskService.addAllToSelected();
  	}else{
  		this.taskService.deleteAllFromSelected();
  	}

  }

  onDeletedTask(taskId:string):void{
    this.taskService.deleteSingleTask(taskId).pipe(take(1)).subscribe(()=>{
      this.taskService.requestFetch();
    })
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
