import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, mergeAll, shareReplay, tap} from 'rxjs/operators';


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
    return this.http.get('./names.json').pipe(
      map(countries => {
        return this.http.get('./phone.json').pipe(
          map((phones) => {
            return Object.keys(phones).map((phone) => {
              return {
                name: countries[phone],
                code: phone, prefix: phones[phone],
                url: `http://www.countryflags.io/${phone}/flat/32.png`
              } as CountryPhone;
            });
          }));
      }), mergeAll());
  }
}
