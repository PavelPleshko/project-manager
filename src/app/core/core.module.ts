import { NgModule,Optional,SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CoreRoutes} from './core.routing';
import { CoreComponent } from './components/core/core.component';
import {SharedModule} from '@app/shared/shared.module';
import {HttpAuthInterceptor} from './interceptors/http-auth-interceptor.service';
import {HttpErrorInterceptor} from './interceptors/http-error-interceptor.service';

export const COMPONENTS = [
CoreComponent
];

export const ANGULAR_MODULES = [
CommonModule,CoreRoutes,HttpClientModule,SharedModule
];



@NgModule({
  imports: [
    ...ANGULAR_MODULES
  ],
  providers:[
		HttpAuthInterceptor,
		HttpErrorInterceptor
		
  ],
  declarations: [...COMPONENTS],
  exports:[SharedModule]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule:CoreModule){
		if(parentModule){
			throw new Error("CoreModule is already imported and loaded. Import only in AppModule");
		}
	}
 }
