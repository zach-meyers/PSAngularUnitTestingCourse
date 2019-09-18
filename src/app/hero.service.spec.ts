import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MessageService } from './message.service';
import { HeroService } from './hero.service';

describe('HeroService', () => {
	let mockMessageService;
	let httpTestingController: HttpTestingController;
	let service: HeroService;

	beforeEach(() => {
		mockMessageService = jasmine.createSpyObj(['add']);
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule ],
			providers: [
				HeroService,
				{ provide: MessageService, useValue: mockMessageService }
			]
		});
		httpTestingController = TestBed.get(HttpTestingController);
		service = TestBed.get(HeroService);
	});

	describe('getHero', () => {
		it('should call get with the correct url', () => {
			service.getHero(4).subscribe();

			const request = httpTestingController.expectOne('api/heroes/4');
			request.flush({ id: 4, name: 'Super Dude', strength: 100 });
			httpTestingController.verify();
		});
	});
});
