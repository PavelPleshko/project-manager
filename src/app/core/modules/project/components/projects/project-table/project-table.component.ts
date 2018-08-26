import { Component, OnInit,OnDestroy,ChangeDetectionStrategy} from '@angular/core';
import {ProjectService} from '@app/core';
import {map,take,takeUntil} from 'rxjs/operators';
import {Observable,Subject} from 'rxjs';

@Component({
  selector: 'sbg-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectTableComponent implements OnInit,OnDestroy {
projects:any[];
selectedSize:Observable<number>;
selectAll:boolean = false;
destroy$:Subject<boolean> = new Subject<boolean>();

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  		this.projectService.projects$.pipe(takeUntil(this.destroy$)).subscribe((projects)=>{
  			this.projects = projects;
  		});
	  	let selectedProjects = this.projectService.selectedProjects$;
	  	this.selectedSize = selectedProjects.pipe(map(selected=>selected.size));
  }

   onSelectChanged(event:{item:any,selected:boolean}):void{
  	if(event.selected){
  		this.projectService.selectProject(event.item);
  	}else{
  		this.projectService.removeProjectFromSelected(event.item);
  	}
  }

  selectAllProjects():void{
  	this.selectAll = !this.selectAll;
  	if(this.selectAll){
  		this.projectService.addAllToSelected();
  	}else{
  		this.projectService.deleteAllFromSelected();
  	}

  }

  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
