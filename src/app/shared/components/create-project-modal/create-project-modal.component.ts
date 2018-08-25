import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ProjectService,AuthService} from '@app/core';
import {User} from '@app/core/modules/auth/interfaces';

@Component({
  selector: 'sbg-create-project-modal',
  templateUrl: './create-project-modal.component.html',
  styleUrls: ['./create-project-modal.component.scss']
})
export class CreateProjectModalComponent implements OnInit {
user:User;
submitted:boolean = false;
createForm:FormGroup;
  constructor(private projectService:ProjectService,private auth:AuthService,
  private modal:NgbActiveModal,private router:Router,private fb:FormBuilder
  	) { }

  ngOnInit() {
  	this.auth.authorizedUser$.subscribe(user=>this.user = user);
  	this.createForm = this.fb.group({
  		name:['',Validators.compose([Validators.required,
  			Validators.minLength(4)])],
  		billing_group:[this.user.billing_groups[0]['id'],Validators.required]
  	})
  }

  closeModal(){
  	this.modal.close();
  }

  createProject(){
  	//api error is handled globally with notification service
  		let body = this.createForm.value;
  		this.submitted=true;
  		this.projectService.createNewProject(body).subscribe(_=>{
  			this.modal.close();
  			this.projectService.fetchProjects$.next(true);
  			this.router.navigateByUrl('projects');
  		});
  	}


  

}
