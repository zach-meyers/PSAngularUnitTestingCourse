import { Component, Input, Output, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from './../hero.service';
import { HeroesComponent } from './heroes.component';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent (shallow integration tests)', () => {
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

describe('HeroesComponent (deep integration tests)', () => {
	let heroes: Hero[];
	let mockHeroService: any;
	let fixture: ComponentFixture<HeroesComponent>;

	beforeEach(() => {
		heroes = [
			{ id: 1, name: 'Spider Dude', strength: 8 },
			{ id: 2, name: 'Wonderful Woman', strength: 24 },
			{ id: 3, name: 'Super Dude', strength: 55 }
		];

		mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

		TestBed.configureTestingModule({
			declarations: [HeroesComponent, HeroComponent],
			providers: [{ provide: HeroService, useValue: mockHeroService }],
			schemas: [NO_ERRORS_SCHEMA]
		});
		fixture = TestBed.createComponent(HeroesComponent);
	});

	it('should render each hero as a HeroComponent', () => {
		mockHeroService.getHeroes.and.returnValue(of(heroes));

		// run ngOnInit
		fixture.detectChanges();

		const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
		expect(heroComponentDEs.length).toEqual(3);
		for (let i = 0; i < heroComponentDEs.length; i++) {
			expect(heroComponentDEs[i].componentInstance.hero).toEqual(heroes[i]);
		}
	});
});
