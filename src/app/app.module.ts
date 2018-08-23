import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {CoreModule} from '@app/core/core.module';
import {GLOBAL_CONFIG,config as appConfig} from '@app/config';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './components/app/app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,CoreModule,AppRoutingModule
  ],
  providers: [
  {provide:GLOBAL_CONFIG,useValue:appConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
