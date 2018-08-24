import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Resolve, RouterStateSnapshot } from '@angular/router';
import {Observable,of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TaskService} from '@app/core';


@Injectable()
export class TaskResolver implements Resolve<any>{
  constructor(private taskService:TaskService) {}



resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<any>{
	let task = route.params['taskId'];
	return this.taskService.getSingleTask(task).pipe(catchError(err=>of(err)));

}
}