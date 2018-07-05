import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CountryPhone, NgxPhoneNumberService} from './ngx-phone-number.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'ngx-phone-number',
  template: `
      <input matInput type="tel"  placeholder="prefix.." [matAutocomplete]="phoneAuto"/>
        <mat-autocomplete #phoneAuto="matAutocomplete">
            <mat-option *ngFor="let phone of countryPhones | async" [value]="phone">
                <span><img [src]="phone.url"/></span>{{phone.name}}
            </mat-option>
        </mat-autocomplete>
  `,
  encapsulation: ViewEncapsulation.None
})
export class NgxPhoneNumberComponent implements OnInit {
  countryPhones: Observable<CountryPhone[]>;
  constructor(private service: NgxPhoneNumberService) { }

  ngOnInit() {
    this.countryPhones = this.service.getAllCountryPhone();
  }

}
