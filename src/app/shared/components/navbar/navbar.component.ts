import { Component, OnInit } from '@angular/core';
import {AuthService} from '@app/core';
import {User} from '@app/core/modules/auth/interfaces';
import {Observable} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CreateProjectModalComponent} from '../create-project-modal/create-project-modal.component';

@Component({
  selector: 'sbg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
authorizedUser:Observable<User>;

  constructor(private auth:AuthService,private modalService:NgbModal) { }

  ngOnInit() {
  	this.authorizedUser = this.auth.authorizedUser$;
  }

  openCreateProjectModal(){
  	let ref = this.modalService.open(CreateProjectModalComponent,{size:'sm',centered:true});
  }

}
