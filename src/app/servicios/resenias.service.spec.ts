import { TestBed } from '@angular/core/testing';

import { ReseniasService } from './resenias.service';

describe('ReseniasService', () => {
  let service: ReseniasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReseniasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
