import { CurrencyCodes } from './../../enums/currency-codes.enum';
import { CurrencyRatesResponse } from 'src/app/interfaces/currency-rates-response.interface';
import { CurrencyConvertService } from './../../services/currency-convert.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyRates } from 'src/app/interfaces/currency-rates.interface';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public supportedCurrencies: CurrencyCodes[] = [
    CurrencyCodes.Hryvna,
    CurrencyCodes.UnitedStatesDollar,
    CurrencyCodes.Euro,
    CurrencyCodes.Krona,
    CurrencyCodes.Zloty,
  ];
  public convertedFrom = CurrencyCodes.Hryvna;
  public convertedTo = CurrencyCodes.UnitedStatesDollar;
  public convertedFromValue!: number | null;
  public convertedToValue!: number | null;
  public rates: CurrencyRates = {};

  constructor(private currencyConvertServ: CurrencyConvertService) {}

  ngOnInit(): void {
    this.supportedCurrencies.forEach((currency: CurrencyCodes) => {
      this.getCurrencyRates(currency, this.supportedCurrencies);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private getCurrencyRates(
    convertedCurrency: CurrencyCodes,
    convertedToCurrencies: CurrencyCodes[]
  ): void {
    this.currencyConvertServ
      .getCurrencyRates(convertedCurrency, convertedToCurrencies)
      .subscribe((res: CurrencyRatesResponse) => {
        this.rates[res.base] = res.rates;
      });
  }

  public onConvertedFromValueChange(value: number | null): void {
    this.convertedFromValue = value;

    if (value === null) {
      this.convertedToValue = null;
      return;
    }

    this.convertedToValue = +(
      this.rates[this.convertedFrom][this.convertedTo] * value
    ).toFixed(2);
  }

  public onConvertedToValueChange(value: number): void {
    this.convertedToValue = value;

    if (value === null) {
      this.convertedFromValue = null;
      return;
    }

    this.convertedFromValue = +(
      value / this.rates[this.convertedFrom][this.convertedTo]
    ).toFixed(2);
  }

  public onCurrencyChange(): void {
    if (this.convertedFromValue === null) {
      this.convertedToValue = null;
      return;
    }

    this.convertedToValue = +(
      this.rates[this.convertedFrom][this.convertedTo] * this.convertedFromValue
    ).toFixed(2);
  }

  public onSwapCurrenciesBtnClick(): void {
    let tmp: any = this.convertedFrom;
    this.convertedFrom = this.convertedTo;
    this.convertedTo = tmp;

    tmp = this.convertedFromValue;
    this.convertedFromValue = this.convertedToValue;
    this.convertedToValue = tmp;
  }
}
