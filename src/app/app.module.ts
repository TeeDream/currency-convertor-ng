import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CurrencyConvertorHeaderComponent } from './components/currency-convertor-header/currency-convertor-header.component';
import { CurrencyConvertorComponent } from './components/currency-convertor/currency-convertor.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyConvertorComponent,
    CurrencyConvertorHeaderComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
