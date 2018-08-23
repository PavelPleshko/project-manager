import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TaskRoutes} from './task.routing';
import {SharedModule} from '@app/shared/shared.module';

import { TasksComponent } from './components/tasks/tasks.component';
import { TaskTableComponent } from './components/tasks/task-table/task-table.component';
import { TaskSingleComponent } from './components/tasks/task-table/task-single/task-single.component';
import { TaskToolbarComponent } from './components/tasks/task-toolbar/task-toolbar.component';


export const COMPONENTS = [
TasksComponent, TaskTableComponent, TaskSingleComponent
];

@NgModule({
  imports: [
    CommonModule,TaskRoutes,SharedModule
  ],
  declarations: [...COMPONENTS, TaskToolbarComponent]
})
export class TaskModule { }
