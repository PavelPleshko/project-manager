import { NgModule,Optional,SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {CoreRoutingModule} from './core-routing.module';

import { CoreComponent } from './components/core/core.component';
import {SharedModule} from '@app/shared/shared.module';

import {HttpAuthInterceptor} from './interceptors/http-auth-interceptor.service';
import {HttpErrorInterceptor} from './interceptors/http-error-interceptor.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

export const COMPONENTS = [
CoreComponent
];

export const ANGULAR_MODULES = [
CommonModule,CoreRoutingModule,HttpClientModule,SharedModule,SnotifyModule
];



@NgModule({
  imports: [
    ...ANGULAR_MODULES
  ],
  providers:[
		HttpAuthInterceptor,
		HttpErrorInterceptor,
		 { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
   		 SnotifyService
  ],
  declarations: [...COMPONENTS],
  exports:[SharedModule,...COMPONENTS],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule:CoreModule){
		if(parentModule){
			throw new Error("CoreModule is already imported and loaded. Import only in AppModule");
		}
	}
 }
