import { TestBed } from '@angular/core/testing';

import { CardsStackService } from './cards-stack.service';

describe('CardsStackService', () => {
  let service: CardsStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
