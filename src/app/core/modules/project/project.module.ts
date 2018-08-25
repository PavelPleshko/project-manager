import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProjectRoutingModule} from './project-routing.module';
import {SharedModule} from '@app/shared/shared.module';

import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectTableComponent } from './components/projects/project-table/project-table.component';
import { ProjectSingleComponent } from './components/projects/project-table/project-single/project-single.component';

export const MODULES = [
	CommonModule,ProjectRoutingModule,SharedModule
];
export const COMPONENTS = [
	ProjectsComponent, ProjectTableComponent, ProjectSingleComponent
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [...COMPONENTS]
})
export class ProjectModule { }
