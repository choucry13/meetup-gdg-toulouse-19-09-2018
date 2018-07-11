import { Injectable } from '@angular/core';
import {Observable, zip} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

export interface CountryPhone {
  code: string;
  name: string;
  prefix: string;
  url: string;
}



@Injectable({
  providedIn: 'root'
})
export class NgxPhoneNumberService {

  constructor(private http: HttpClient) {
  }

  getAllCountryPhone(): Observable<CountryPhone[]> {
    // dinstinct all request we need
    const countries$ = this.http.get('./names.json');
    const phones$ = this.http.get<any>('./phones.json');
    // cs = countries
    // ps = phones
    return zip(countries$, phones$).pipe(map((items) => {
      const countries = items[0];
      const phones = items[1];
      console.log('countries', countries);
      console.log('phones', phones);
      return Object.keys(phones).map((phone) => {
        return {
          name: countries[phone],
          code: phone, prefix: phones[phone],
          url: `http://www.countryflags.io/${phone}/flat/32.png`
        } as CountryPhone;
      });
    }));
  }
}
