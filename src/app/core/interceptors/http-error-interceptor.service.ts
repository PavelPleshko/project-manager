import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler,
 HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {SnotifyService} from 'ng-snotify';



@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{

  constructor(private snotifyService:SnotifyService) { }

intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
  		return next.handle(request).pipe(tap((event)=>{},(err)=>{
       if(err){
        this.snotifyService.error(
           err.error.message,
           `Error ${err.status}`,
           {
           showProgressBar:false,
           timeout:4000
           }
         );
       }
      }));;  
}
}


export const HttpErrorInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptorService,
    multi: true
};