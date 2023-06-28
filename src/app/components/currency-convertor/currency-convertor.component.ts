import { Component, OnInit } from '@angular/core';
import { retry, take } from 'rxjs';
import { CurrencyApiService } from 'src/app/services/currency-api.service';
import { CountriesArray } from '../../../apiVariables';
import {
  APICountries,
  APICountriesKeys,
  CurrencyAPIAnswer,
} from '../../types/currency';
import { ValidatorService } from 'src/app/services/validator.service';

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
  apiAnswer!: CurrencyAPIAnswer | null;

  constructor(
    private currencyAPI: CurrencyApiService,
    private validator: ValidatorService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  reverse(e?: KeyboardEvent): void {
    if (e && !(e.code === 'Enter' || e.code === 'Space')) return;

    [this.selectTo, this.selectFrom] = [this.selectFrom, this.selectTo];
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

  getRate(): string {
    if (!this.apiAnswer) return '';

    return String(this.apiAnswer.rates[this.selectTo as APICountriesKeys]);
  }

  changeFromSelect() {
    this.getData();
  }

  changeToSelect() {
    this.inputChangeFrom(this.inputFrom);
  }

  validateKeyDown(e: KeyboardEvent): boolean {
    return this.validator.validateKeyDown(e);
  }

  convertCurrency(
    countryFrom: APICountries,
    countryTo: APICountries,
    amount: string,
    reverse?: true
  ): string {
    if (!this.apiAnswer) return '';

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
