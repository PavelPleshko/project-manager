import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {take} from 'rxjs/operators';

import {Task} from '../../interfaces/task';
import {TaskService} from '@app/core';

@Component({
  selector: 'sbg-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  task:Task;
  constructor(private route:ActivatedRoute,private router:Router,
  	private taskService:TaskService) { }
  
  ngOnInit() {
  	  this.route.data.pipe(take(1)).subscribe((data)=>{
      this.task = data.task;
    })
  }

  deleteTask(){
  	this.taskService.deleteSingleTask(this.task.id).pipe(take(1)).subscribe(data=>{
  		this.router.navigateByUrl('tasks');
  	})
  }

}
