import {Directive,OnInit,TemplateRef,ViewContainerRef,
	OnDestroy,Input,Host,Optional,ElementRef,Renderer2} from '@angular/core';
import {} from '@angular/forms';
import {map,distinctUntilChanged} from 'rxjs/operators';
import {ErrorGetterDirective} from './error-getter.directive';

@Directive({
	selector:'[errorType]'
})

export class ErrorTypeDirective implements OnInit,OnDestroy{
@Input('errorType') type:string;
hasView:boolean=false;
controlSub;



constructor(private el:ElementRef,@Optional() @Host() private errorGetter:ErrorGetterDirective,
	private viewRef:ViewContainerRef,private templateRef:TemplateRef<any>){}

ngOnInit(){
		this.controlSub = this.errorGetter.controlValue$.subscribe(()=>{
			this.setVisible();
		})
}

setVisible():void{
	if(this.errorGetter.match(this.type)){
		if(!this.hasView){
			this.viewRef.createEmbeddedView(this.templateRef);
			this.hasView = true;
		}
	}else{
		if(this.hasView){
			this.viewRef.clear();
			this.hasView = false;
		}
	}
}

ngOnDestroy(){
	this.controlSub.unsubscribe();
}

}