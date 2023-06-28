import { Component, OnInit } from '@angular/core';
import { retry, take } from 'rxjs';
import { CurrencyApiService } from 'src/app/services/currency-api.service';
import { CountriesArray } from '../../../apiVariables';
import {
  APICountries,
  APICountriesKeys,
  CurrencyAPIAnswer,
} from '../../types/currency';

@Component({
  selector: 'app-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencyConvertorComponent implements OnInit {
  countries = [...CountriesArray];
  selectFrom: APICountries = 'USD';
  selectTo: APICountries = 'UAH';
  inputFrom: string = '1';
  inputTo: string = '';
  apiAnswer!: CurrencyAPIAnswer;

  constructor(private currencyAPI: CurrencyApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.currencyAPI
      .getCurrencyRate(this.selectFrom)
      .pipe(take(1), retry(2))
      .subscribe({
        next: (data) => {
          this.apiAnswer = data;
          this.inputChangeFrom(this.inputFrom);
        },
      });
  }

  changeFromSelect() {
    this.getData();
  }

  changeToSelect() {
    this.inputChangeFrom(this.inputFrom);
  }

  validateKeyDown(e: KeyboardEvent): boolean {
    const isDigit = /Digit/.test(e.code);
    const isTab = /Tab/.test(e.code);
    const isCtrl = e.ctrlKey;
    const isEscape = /Escape/.test(e.code);
    const isBackspace = /Backspace/.test(e.code);
    const isArrow = /Arrow/.test(e.code);
    const isPeriod = /Period/.test(e.code);
    const isPeriodOne = /\./.test((e.target as HTMLInputElement).value);

    if (
      isDigit ||
      isTab ||
      isCtrl ||
      isEscape ||
      isBackspace ||
      isArrow ||
      (isPeriod && !isPeriodOne)
    ) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  convertCurrency(
    countryFrom: APICountries,
    countryTo: APICountries,
    amount: string,
    reverse?: true
  ): string {
    const from = this.apiAnswer.rates[countryFrom as APICountriesKeys];
    const to = this.apiAnswer.rates[countryTo as APICountriesKeys];

    return reverse
      ? String(((from * Number(amount)) / to).toFixed(2))
      : String((to * (Number(amount) * from)).toFixed(2));
  }

  inputChangeFrom(value: string) {
    this.inputTo = this.convertCurrency(this.selectFrom, this.selectTo, value);
  }

  inputChangeTo(value: string) {
    this.inputFrom = this.convertCurrency(
      this.selectFrom,
      this.selectTo,
      value,
      true
    );
  }
}
