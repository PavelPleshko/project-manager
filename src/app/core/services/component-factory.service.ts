import { Injectable,Injector,ComponentFactoryResolver } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentFactoryService {
	 contextReceivedSource = new Subject<any>();
   contextReceived$ = this.contextReceivedSource.asObservable();

  constructor(){ 
  }

  receiveContext(componentFactoryResolver:ComponentFactoryResolver,injector:Injector){
    this.contextReceivedSource.next({resolver:componentFactoryResolver,injector:injector});
  }


}
