import { Component, OnChanges,SimpleChanges,Input,Output,EventEmitter,
	HostBinding,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[sbgProjectSingle]',
  templateUrl: './project-single.component.html',
  styleUrls: ['./project-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProjectSingleComponent implements OnChanges {
@Input() project:any;
@Input() forceSelect:boolean;
@Output() selectChanged:EventEmitter<{item:any,selected:boolean}> = new EventEmitter<{item:any,selected:boolean}>();
@Output() deletedTask:EventEmitter<string> = new EventEmitter<string>();

@HostBinding('class.selected')
get selected(){
	return this._selected;
}
set selected(value:boolean){
	if(value !== this._selected){
		this._selected = value;
	}
}
_selected:boolean = false;
  constructor() { }

  ngOnChanges(changes:SimpleChanges) {
  		if(changes.forceSelect){

  		this.selected = this.forceSelect;
  	}
  }

   toggleSelected(){
  	this.selected = !this.selected;
  	this.selectChanged.emit({item:this.project,selected:this.selected});
  }

}
