import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HeroService } from './../hero.service';
import { Hero } from '../hero';
import { HeroesComponent } from './heroes.component';
import { By } from '@angular/platform-browser';

describe('HeroesComponent (integration tests)', () => {
	let heroes: Hero[];
	let mockHeroService: any;
	let fixture: ComponentFixture<HeroesComponent>;

	@Component({
		selector: 'app-hero',
		template: '<div></div>'
	})
	class FakeHeroComponent {
		@Input() public hero: Hero;
		@Output() public delete = new EventEmitter<MouseEvent>();
	}

	beforeEach(() => {
		heroes = [
			{ id: 1, name: 'Spider Dude', strength: 8 },
			{ id: 2, name: 'Wonderful Woman', strength: 24 },
			{ id: 3, name: 'Super Dude', strength: 55 }
		];

		mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

		TestBed.configureTestingModule({
			declarations: [HeroesComponent, FakeHeroComponent],
			providers: [{ provide: HeroService, useValue: mockHeroService }]
		});
		fixture = TestBed.createComponent(HeroesComponent);
	});

	it('should set heroes correctly from the service', () => {
		mockHeroService.getHeroes.and.returnValue(of(heroes));
		fixture.detectChanges();

		expect(fixture.componentInstance.heroes.length).toBe(heroes.length);
	});

	it('should create one <li> element for each hero', () => {
		mockHeroService.getHeroes.and.returnValue(of(heroes));
		fixture.detectChanges();

		expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(heroes.length);
	});
});
