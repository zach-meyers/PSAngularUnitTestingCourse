import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroComponent } from './hero.component';

describe('HeroComponent (integration tests)', () => {
	let fixture: ComponentFixture<HeroComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HeroComponent],
			schemas: [NO_ERRORS_SCHEMA]
		});
		fixture = TestBed.createComponent(HeroComponent);
	});

	it('should have the correct hero', () => {
		fixture.componentInstance.hero = { id: 1, name: 'Spider Dude', strength: 8 };

		expect(fixture.componentInstance.hero.name).toEqual('Spider Dude');
	});

	it('should render the hero name in an anchor tag', () => {
		fixture.componentInstance.hero = { id: 1, name: 'Spider Dude', strength: 8 };
		fixture.detectChanges();

		const debugElement = fixture.debugElement.query(By.css('a'));
		expect(debugElement.nativeElement.textContent).toContain('Spider Dude');
	});
});
