import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {NgbDropdownModule,NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { NavbarComponent } from './components';
import {CreateProjectModalComponent} from './components';

import {ErrorGetterDirective} from './directives/error-getter.directive';
import {ErrorTypeDirective} from './directives/error-type.directive';

export const VENDOR_MODULES = [
AngularFontAwesomeModule,NgbDropdownModule,NgbModalModule,FormsModule,ReactiveFormsModule
];
export const COMPONENTS = [
NavbarComponent,CreateProjectModalComponent,ErrorGetterDirective,ErrorTypeDirective
];

@NgModule({
  imports: [
    CommonModule,RouterModule,...VENDOR_MODULES
  ],
  declarations: [...COMPONENTS],
  exports:[...COMPONENTS,...VENDOR_MODULES],
  entryComponents:[CreateProjectModalComponent]
})
export class SharedModule { }
