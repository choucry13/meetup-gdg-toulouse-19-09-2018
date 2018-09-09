import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPhoneNumberComponent } from './ngx-phone-number.component';

describe('NgxPhoneNumberComponent', () => {
  let component: NgxPhoneNumberComponent;
  let fixture: ComponentFixture<NgxPhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxPhoneNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
