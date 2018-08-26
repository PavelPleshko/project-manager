import {Directive,OnInit,Renderer2,
	OnDestroy,Input,Host,Optional,ElementRef} from '@angular/core';
import {ControlContainer,AbstractControl,FormGroupDirective} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Observable,Subscription,merge,of} from 'rxjs';

@Directive({
	selector:'[errorGetter]'
})

export class ErrorGetterDirective implements OnInit,OnDestroy{
@Input('errorGetter') controlName:string;
control:AbstractControl;
hasView:boolean=false;
controlValue$:Observable<any>;
controlSub:Subscription;
submitted:boolean=false;


setVisible(){
	if(this.control.invalid && (this.control.dirty || this.submitted)){
		this.renderer.setStyle(this.el.nativeElement,'display','block');
	}else{
		this.renderer.setStyle(this.el.nativeElement,'display','none');
	}
}

get form(){
	return this.fg.formDirective ? (this.fg.formDirective as FormGroupDirective).form : null;
}

 match(error: string){
    if (this.control && this.control.errors){
      if (~Object.keys(this.control.errors).indexOf(error)){
        return true;
      }
    }
    return false;
  }


constructor(private fg:ControlContainer,
	private el:ElementRef,private renderer:Renderer2){
	if(!this.fg){
		throw new Error("errorGetter directive should be used inside of FormGroup");
	}
}

ngOnInit(){
	this.control = this.form.get(this.controlName);
	let formSubmit$ = (<FormGroupDirective>this.fg).ngSubmit.pipe(map(()=>{
		this.submitted = true;
	}));
	this.controlValue$ = merge(this.control.valueChanges,of(''),formSubmit$);
	this.controlSub = this.controlValue$.subscribe(()=>{
		this.setVisible();
	})
}

ngOnDestroy(){
	this.controlSub.unsubscribe();
}

}