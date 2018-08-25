import { Component, OnInit } from '@angular/core';
import {ProjectService} from '@app/core';
import {map,take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'sbg-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {
projects:any[];
selectedSize:Observable<number>;
selectAll:boolean = false;

  constructor(private projectService:ProjectService) { }

  ngOnInit() {
  		this.projectService.projects$.subscribe((projects)=>{
  			this.projects = projects;
  		});
	  	let selectedProjects = this.projectService.selectedProjects$;
	  	this.selectedSize = selectedProjects.pipe(map(selected=>selected.size));
  }

   onSelectChanged(event:{item:any,selected:boolean}){
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

}
