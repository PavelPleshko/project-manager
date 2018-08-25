import { Component, OnInit,OnDestroy } from '@angular/core';
import {pluck,take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import {ProjectService} from '@app/core';

@Component({
  selector: 'sbg-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit,OnDestroy {
 subscriptions:Subscription[]=[];
  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  	  let shouldFetch = this.projectService.fetchProjects$.subscribe(()=>{
      this.getProjects({fields:'_all'});
    })
    this.subscriptions.push(shouldFetch);
  }

  getProjects(params?:Object){
  	this.projectService.getProjects(params).pipe(pluck('items'),take(1)).subscribe((projectList:any[])=>{
  		console.log(projectList);
  		this.projectService.pushToCurrentProjects(projectList);
  	})
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub=>{
      sub.unsubscribe();
    })
  }

}
