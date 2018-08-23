import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/core';
import {User} from '@app/core/modules/auth/interfaces';
import {Observable} from 'rxjs';

@Component({
  selector: 'sbg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
authorizedUser:Observable<User>;

  constructor(private auth:AuthService) { }

  ngOnInit() {
  	this.authorizedUser = this.auth.authorizedUser$;
  }

}
