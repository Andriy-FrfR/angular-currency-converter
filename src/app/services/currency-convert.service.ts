import { CurrencyCodes } from './../enums/currency-codes.enum';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyRatesResponse } from '../interfaces/currency-rates-response.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CurrencyConvertService {
  constructor(private http: HttpClient) {}

  getCurrencyRates(
    convertedCurrency: CurrencyCodes,
    convertedToCurrencies: CurrencyCodes[]
  ): Observable<CurrencyRatesResponse> {
    return this.http.get<CurrencyRatesResponse>(
      `${
        environment.API_BASE_URL
      }/latest?base=${convertedCurrency}&symbols=${convertedToCurrencies.join(
        ','
      )}`
    );
  }
}
