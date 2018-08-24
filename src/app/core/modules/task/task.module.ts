import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TaskRoutes} from './task.routing';
import {SharedModule} from '@app/shared/shared.module';

import {TaskResolver} from './services/task.resolver';

import { TasksComponent } from './components/tasks/tasks.component';
import { TaskTableComponent } from './components/tasks/task-table/task-table.component';
import { TaskSingleComponent } from './components/tasks/task-table/task-single/task-single.component';
import { TaskToolbarComponent } from './components/tasks/task-toolbar/task-toolbar.component';
import { TaskComponent } from './components/task/task.component';



export const COMPONENTS = [
TasksComponent, TaskTableComponent, TaskSingleComponent
];

@NgModule({
  imports: [
    CommonModule,TaskRoutes,SharedModule
  ],
  providers:[TaskResolver],
  declarations: [...COMPONENTS, TaskToolbarComponent, TaskComponent]
})
export class TaskModule { }
