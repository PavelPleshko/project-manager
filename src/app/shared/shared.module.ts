import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';


import { NavbarComponent } from './components';

export const VENDOR_MODULES = [
AngularFontAwesomeModule,NgbDropdownModule,FormsModule
];
export const COMPONENTS = [
NavbarComponent
];

@NgModule({
  imports: [
    CommonModule,RouterModule,...VENDOR_MODULES
  ],
  declarations: [...COMPONENTS],
  exports:[...COMPONENTS,...VENDOR_MODULES]
})
export class SharedModule { }
