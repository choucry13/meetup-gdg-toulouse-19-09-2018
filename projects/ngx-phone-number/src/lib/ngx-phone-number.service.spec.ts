import { TestBed, inject } from '@angular/core/testing';

import { NgxPhoneNumberService } from './ngx-phone-number.service';

describe('NgxPhoneNumberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxPhoneNumberService]
    });
  });

  it('should be created', inject([NgxPhoneNumberService], (service: NgxPhoneNumberService) => {
    expect(service).toBeTruthy();
  }));
});
