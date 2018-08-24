import { Injectable,Inject } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {GLOBAL_CONFIG,GlobalConfig} from '@app/config';

@Injectable({
  providedIn: 'root'
})
export class RestService {
apiUrl:string;
  constructor(private http:HttpClient,@Inject(GLOBAL_CONFIG) private config:GlobalConfig) { 
  	this.apiUrl = this.config.mainApiUrl;
  }


  getApi(path:string,params?:any):Observable<any>{
  	params = this.getQueryString(params);
  	let url = path ? `${this.apiUrl}${path}` : this.apiUrl;
  	return this.http.get(url,{params});
  }

  deleteApi(path:string,params?:any):Observable<any>{
    params = this.getQueryString(params);
    let url = path ? `${this.apiUrl}${path}` : this.apiUrl;
    return this.http.delete(url,{params}); 
  }


  getQueryString(params?:Object):HttpParams{
  	let httpParams:HttpParams = new HttpParams();
  	if(params){
	  	for(let key in params){
	  		httpParams = httpParams.append(key,params[key]);
	  	}
  	}
  	return httpParams;
  }
}
