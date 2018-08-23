import { Component,OnInit } from '@angular/core';

import {AuthService} from '@app/core';

@Component({
  selector: 'sbg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private auth:AuthService){

  }

  ngOnInit(){
  	this.auth.getUserFromApi().subscribe((user)=>{
  		this.auth.userNext(user);
  	})
  }
}
