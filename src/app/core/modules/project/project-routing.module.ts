import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {ProjectsComponent} from './components/projects/projects.component';

const ROUTES:Routes = [
{path:'',pathMatch:'full',component:ProjectsComponent}
];

@NgModule({
imports:[RouterModule.forChild(ROUTES)],
exports:[RouterModule]
})

export class ProjectRoutingModule{

}

