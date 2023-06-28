import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, retry, take } from 'rxjs';
import { CurrencyApiService } from 'src/app/services/currency-api.service';
import { CurrencyAPIAnswer } from 'src/app/types/currency';

@Component({
  selector: 'app-currency-convertor-header',
  templateUrl: './currency-convertor-header.component.html',
  styleUrls: ['./currency-convertor-header.component.scss'],
})
export class CurrencyConvertorHeaderComponent implements OnInit {
  USD!: Observable<CurrencyAPIAnswer>;
  EUR!: Observable<CurrencyAPIAnswer>;

  @Input() title: string | undefined;

  constructor(private currencyAPIAnswer: CurrencyApiService) {}

  ngOnInit(): void {
    this.USD = this.currencyAPIAnswer
      .getCurrencyRate('USD')
      .pipe(take(1), retry(2));
    this.EUR = this.currencyAPIAnswer
      .getCurrencyRate('EUR')
      .pipe(take(1), retry(2));
  }
}
