import {RouterModule,Routes} from '@angular/router';

const ROUTES:Routes = [
	{
		path:'tasks',loadChildren:'./modules/task/task.module#TaskModule'
	},
	{
		path:'projects',loadChildren:'./modules/project/project.module#ProjectModule'
	}
];


export const CoreRoutes = RouterModule.forChild(ROUTES);