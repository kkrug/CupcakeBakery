import { TestBed } from '@angular/core/testing';

import { CupcakeFactoryService } from './cupcake-factory.service';

describe('CupcakeFactoryService', () => {
  let service: CupcakeFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CupcakeFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
