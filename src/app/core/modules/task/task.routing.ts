import {RouterModule,Routes} from '@angular/router';
import {TasksComponent} from './components/tasks/tasks.component';
import {TaskComponent} from './components/task/task.component';
import {TaskResolver} from './services/task.resolver';

const ROUTES:Routes = [
{path:'',pathMatch:'full',component:TasksComponent},
{path:':taskId',component:TaskComponent,resolve:{task:TaskResolver}}
];

export const TaskRoutes = RouterModule.forChild(ROUTES);