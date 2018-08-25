import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

const ROUTES:Routes = [
	{
		path:'tasks',loadChildren:'./modules/task/task.module#TaskModule'
	},

	{
		path:'projects',loadChildren:'./modules/project/project.module#ProjectModule'
	},
	{
		path:'**',redirectTo:'tasks'
	}
];

@NgModule({
imports:[RouterModule.forRoot(ROUTES)],
exports:[RouterModule]
})

export class CoreRoutingModule{

}
