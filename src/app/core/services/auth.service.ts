import { Injectable,Inject } from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

import {User} from '@app/core/modules/auth/interfaces';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	authorizedUser:BehaviorSubject<User> = new BehaviorSubject<User>(null);
	authorizedUser$:Observable<User>;

  constructor(private restService:RestService){ 
  	this.authorizedUser$ = this.authorizedUser.asObservable().pipe(distinctUntilChanged());
  }

  userNext(user:User):void{
  	this.authorizedUser.next(user);
  }

  getUserFromApi():Observable<User>{
  	return this.restService.getApi('user',{fields:'first_name,last_name'});
  }

}
