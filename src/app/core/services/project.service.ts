import { Injectable } from '@angular/core';
import {Observable,BehaviorSubject,Subject} from 'rxjs';
import {RestService} from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
projects$:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
selectedProjects:Set<any> =new Set();
fetchProjects$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
selectedProjects$:Subject<Set<any>> = new Subject<Set<any>>();


  constructor(private restService:RestService) {
   }

  requestFetch(){
  	this.fetchProjects$.next(true);
  }

  pushToCurrentProjects(projects:any[]):void{
  	this.projects$.next(projects);
  }

  //api

  getProjects(params?:any):Observable<any[]>{
    return this.restService.getApi('projects',params);
  } 

  createNewProject(body:any):Observable<any[]>{
  	return this.restService.postApi('projects',body);
  }


  //selection
  selectProject(item:any):void{
  	this.selectedProjects.add(item);
  	this.updateSelectedProjectsObs(this.selectedProjects);
  } 

  removeProjectFromSelected(item:any):void{
  	this.selectedProjects.delete(item);
  	this.updateSelectedProjectsObs(this.selectedProjects);
  }

  addAllToSelected():void{
  	this.selectedProjects = new Set([...Array.from(this.selectedProjects),...this.projects$.getValue()]);
  	this.updateSelectedProjectsObs(this.selectedProjects);
  }

  deleteAllFromSelected():void{
  	this.selectedProjects.clear();
  	this.updateSelectedProjectsObs(this.selectedProjects);
  }

  updateSelectedProjectsObs(selectedProjects:Set<any>):void{
  	this.selectedProjects$.next(selectedProjects);
  }
}
