import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

describe('HeroService', () => {

  let messageServiceStub: Partial<MessageService>;
  let messageService: MessageService;
  let httpClientSpy: { get: jasmine.Spy };
  let heroService: HeroService;

  beforeEach(async(() => {

    messageServiceStub = {
      add(message: string) {
        console.log(message);
      }
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: MessageService, useValue: messageServiceStub}]
    })
    .compileComponents();

    messageService = TestBed.get(MessageService);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    heroService = new HeroService(<any> httpClientSpy, messageService);
  }));

  it('should return expected heroes (HttpClient called once)', () => {
    const expectedHeroes: Hero[] =
      [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
  
    httpClientSpy.get.and.returnValue(of(expectedHeroes));
  
    heroService.getHeroes().subscribe(
      heroes => expect(heroes).toEqual(expectedHeroes, 'expected heroes'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });
});
