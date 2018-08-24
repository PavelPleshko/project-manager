import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {CoreModule} from '@app/core/core.module';
import {GLOBAL_CONFIG,config as appConfig} from '@app/config';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,CoreModule,AppRoutingModule,SnotifyModule
  ],
  providers: [
  {provide:GLOBAL_CONFIG,useValue:appConfig},
  { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
