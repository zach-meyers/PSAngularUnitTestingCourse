import { Hero } from './../hero';
import { HeroesComponent } from './heroes.component';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
	let component: HeroesComponent;
	let heroes: Hero[];
	let mockHeroService: any;

	beforeEach(() => {
		heroes = [
			{ id: 1, name: 'Spider Dude', strength: 8 },
			{ id: 2, name: 'Wonderful Woman', strength: 24 },
			{ id: 3, name: 'Super Dude', strength: 55 }
		];

		mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

		component = new HeroesComponent(mockHeroService);
	});

	describe('delete', () => {
		it('should remove the indicated hero from the heroes list', () => {
			mockHeroService.deleteHero.and.returnValue(of(true));
			component.heroes = heroes;

			component.delete(heroes[2]);

			const isDeleted = !(component.heroes.includes(heroes[2]));
			expect(isDeleted).toBe(true);
		});

		it('should call deleteHero with correct hero', () => {
			mockHeroService.deleteHero.and.returnValue(of(true));
			component.heroes = heroes;

			component.delete(heroes[2]);

			expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
		});
	});
});
