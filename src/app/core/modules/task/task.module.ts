import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TaskRoutingModule} from './task-routing.module';
import {SharedModule} from '@app/shared/shared.module';

import {TaskResolver} from './services/task.resolver';

import { TasksComponent } from './components/tasks/tasks.component';
import { TaskTableComponent } from './components/tasks/task-table/task-table.component';
import { TaskSingleComponent } from './components/tasks/task-table/task-single/task-single.component';
import { TaskToolbarComponent } from './components/tasks/task-toolbar/task-toolbar.component';
import { TaskComponent } from './components/task/task.component';



export const MODULES = [
	 CommonModule,TaskRoutingModule,SharedModule
];
export const COMPONENTS = [
TasksComponent, TaskTableComponent, TaskSingleComponent,
TaskToolbarComponent, TaskComponent
];

@NgModule({
  imports: [
   	...MODULES
  ],
  providers:[TaskResolver],
  declarations: [...COMPONENTS]
})
export class TaskModule { }
