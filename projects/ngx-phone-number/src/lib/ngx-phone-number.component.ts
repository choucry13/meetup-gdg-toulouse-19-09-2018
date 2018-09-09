import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {CountryPhone, NgxPhoneNumberService} from './ngx-phone-number.service';
import {fromEvent, interval, Observable} from 'rxjs';
import {audit, map} from 'rxjs/operators';

@Component({
  selector: 'ngx-phone-number',
  template: `
      <main>
          <div *ngIf="countryPhoneSelected">
              <mat-form-field>
                  <label for="tel">Country phone selected: {{countryPhoneSelected.name}} with prefix : +
                      {{countryPhoneSelected.prefix}}</label>
                  <input matInput id="tel" type="tel"/>
              </mat-form-field>
              <button mat-button (click)="reset()">back</button>
              <br/>
          </div>
          <mat-form-field *ngIf="countryPhoneSelected == null">
              <input matInput type="tel" placeholder="select a country" [matAutocomplete]="phoneAuto"/>
          </mat-form-field>
          <mat-autocomplete #phoneAuto="matAutocomplete" (optionSelected)="showPrefix($event.option.value)">
              <mat-option *ngFor="let phone of countryPhonesFiltered$ | async" [value]="phone">
                  <img [src]="phone.url"/><span>{{phone.name}}</span>
              </mat-option>
          </mat-autocomplete>
      </main>
  `,
  styleUrls: ['./ngx-phone-number.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxPhoneNumberComponent implements OnInit {
  countryPhones$: Observable<CountryPhone[]>;
  countryPhonesFiltered$: Observable<CountryPhone[]>;

  countryPhoneSelected: CountryPhone;

  private _search = '';
  constructor(private service: NgxPhoneNumberService) { }

  ngOnInit() {
    this.countryPhones$ = this.service.getAllCountryPhone();
    this.countryPhonesFiltered$ = this.countryPhones$;

    this.countryPhonesFiltered$.subscribe((result) => console.log(result));

    const input = fromEvent(document, 'input');

    input.subscribe((event) => this.onChangeInput(event));
  }


  onChangeInput($event: any) {
    if ($event.data == null) {
      this._search = this._search ? this._search.slice(0, this._search.length - 1) : '';
    } else {
      this._search = this._search + $event.data;
    }
    this.countryPhonesFiltered$ = this.countryPhones$;
    this.countryPhonesFiltered$ = this.
    countryPhones$.pipe(map(cps => cps.filter(cp => cp.name.toLowerCase().indexOf(this._search.toLowerCase()) > -1)));

  }

  showPrefix(cp: CountryPhone) {
    this.countryPhoneSelected = cp;
  }

  reset() {
    this._search = '';
    this.countryPhonesFiltered$ = this.countryPhones$;
    this.countryPhoneSelected = null;
  }
}
