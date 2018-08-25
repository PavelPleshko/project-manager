import { Injectable,Inject } from '@angular/core';
import {BehaviorSubject,Observable,forkJoin} from 'rxjs';
import {distinctUntilChanged,map,take} from 'rxjs/operators';

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

     forkJoin(this.getUserFromApi(),this.getBillingGroups()).pipe(map(([user,billing])=>{
      user.billing_groups = [...billing.items];
      return user;
    }),take(1)).subscribe((user)=>{
      this.userNext(user);
    })
  }

  userNext(user:User):void{
  	this.authorizedUser.next(user);
  }

  getUserFromApi():Observable<User>{
    return this.restService.getApi('user',{fields:'first_name,last_name'});
  } 

  getBillingGroups():Observable<any>{
  	return this.restService.getApi('billing/groups',{fields:'_all'});
  }

}
