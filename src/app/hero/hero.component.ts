import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';

@Component({
	selector: 'app-hero',
	templateUrl: './hero.component.html',
	styleUrls:  ['./hero.component.css']
})
export class HeroComponent {
	@Input() public hero: Hero;
	@Output() public delete = new EventEmitter<MouseEvent>();

	public onDeleteClick($event: MouseEvent): void {
		$event.stopPropagation();
		this.delete.next($event);
	}
}
