import { TestBed } from '@angular/core/testing';

import { UserheaderService } from './userheader.service';

describe('UserheaderService', () => {
  let service: UserheaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserheaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
