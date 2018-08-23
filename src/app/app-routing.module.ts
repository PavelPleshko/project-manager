import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {CoreComponent} from '@app/core';

const ROUTES:Routes = [
	{path:'manager',component:CoreComponent},
	{path:'**',redirectTo:'manager'}
];

@NgModule({
imports:[RouterModule.forRoot(ROUTES)],
exports:[RouterModule]
})

export class AppRoutingModule{

}
