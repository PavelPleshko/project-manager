import {RouterModule,Routes} from '@angular/router';
import {TasksComponent} from './components/tasks/tasks.component';

const ROUTES:Routes = [
{path:'',pathMatch:'full',component:TasksComponent}
]

export const TaskRoutes = RouterModule.forChild(ROUTES);