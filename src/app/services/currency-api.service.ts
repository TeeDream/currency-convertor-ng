import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_LINK } from 'src/apiVariables';
import { APICountries, CurrencyAPIAnswer } from '../types/currency';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  constructor(private http: HttpClient) {}

  getCurrencyRate(
    BaseCountry: APICountries = 'USD'
  ): Observable<CurrencyAPIAnswer> {
    return this.http.get<CurrencyAPIAnswer>(
      `${API_BASE_LINK}latest?base=${BaseCountry}`
    );
  }
}
