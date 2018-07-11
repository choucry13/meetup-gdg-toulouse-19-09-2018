import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {CountryPhone, NgxPhoneNumberService} from './ngx-phone-number.service';
import {Observable} from 'rxjs';
import {filter, map, mergeAll, shareReplay, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'ngx-phone-number',
  template: `
        <div *ngIf="countryPhoneSelected">
            <label for="tel">Country phone selected: {{countryPhoneSelected.name}} with prefix : + {{countryPhoneSelected.prefix}}</label>
            <input id="tel" type="tel" />
            <button (click)="reset()" >back</button>
            <br />
        </div>
      <input matInput type="tel"  placeholder="nom.." [matAutocomplete]="phoneAuto" *ngIf="countryPhoneSelected == null"/>
        <mat-autocomplete #phoneAuto="matAutocomplete" (optionSelected)="showPrefix($event.option.value)">
            <mat-option *ngFor="let phone of countryPhonesFiltered | async" [value]="phone">
                <span><img [src]="phone.url"/></span>{{phone.name}}
            </mat-option>
        </mat-autocomplete>
  `,
  encapsulation: ViewEncapsulation.None
})
export class NgxPhoneNumberComponent implements OnInit {
  countryPhones: Observable<CountryPhone[]>;
  countryPhonesFiltered: Observable<CountryPhone[]>;

  countryPhoneSelected: CountryPhone;

  private _search = '';
  constructor(private service: NgxPhoneNumberService) { }

  ngOnInit() {
    this.countryPhones = this.service.getAllCountryPhone();
    this.countryPhonesFiltered = this.countryPhones;
  }

  @HostListener('input', ['$event'])
  onChangeInput($event: any) {
    if ($event.data == null) {
      this._search = this._search ? this._search.slice(0, this._search.length - 1) : '';
    } else {
      this._search = this._search + $event.data;
    }
    this.countryPhonesFiltered = this.countryPhones;
    this.countryPhonesFiltered = this.
    countryPhones.pipe(map(cps => cps.filter(cp => cp.name.toLowerCase().indexOf(this._search.toLowerCase()) > -1)));
  }

  showPrefix(cp: CountryPhone) {
    this.countryPhoneSelected = cp;
  }

  reset() {
    this._search = '';
    this.countryPhonesFiltered = this.countryPhones;
    this.countryPhoneSelected = null;
  }
}
