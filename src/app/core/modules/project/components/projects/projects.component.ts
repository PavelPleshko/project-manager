import { Component, OnInit,OnDestroy } from '@angular/core';
import {pluck,take,takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {ProjectService} from '@app/core';

@Component({
  selector: 'sbg-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit,OnDestroy {
  destroy$:Subject<boolean>=new Subject<boolean>();

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  	 this.projectService.fetchProjects$.pipe(takeUntil(this.destroy$)).subscribe(()=>{
      this.getProjects({fields:'_all'});
    })
 
  }

  getProjects(params?:Object){
  	this.projectService.getProjects(params).pipe(pluck('items'),take(1)).subscribe((projectList:any[])=>{
  		this.projectService.pushToCurrentProjects(projectList);
  	})
  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
