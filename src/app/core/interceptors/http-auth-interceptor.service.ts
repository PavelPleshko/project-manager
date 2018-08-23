import { Injectable,Inject } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler,
 HttpEvent, HttpInterceptor, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import {GLOBAL_CONFIG,GlobalConfig} from '@app/config';




@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(@Inject(GLOBAL_CONFIG) private config:GlobalConfig) { }

intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
  		return this.handleRequest(request,next);  
}


handleRequest(request:HttpRequest<any>,next:HttpHandler):Observable<any>{
    let newRequest = request.clone({headers:this.headersWithToken()})
    return next.handle(newRequest);
}

headersWithToken():HttpHeaders{
  let headers = new HttpHeaders();
  headers = headers.set('X-SBG-Auth-Token',this.config.apiKey);
  return headers;
}

}


export const HttpAuthInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
};