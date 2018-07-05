import { NgModule } from '@angular/core';
import { NgxPhoneNumberComponent } from './ngx-phone-number.component';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatOptionModule} from '@angular/material';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [NgxPhoneNumberComponent],
  exports: [NgxPhoneNumberComponent]
})
export class NgxPhoneNumberModule { }
