import { CurrencyCodes } from './../../enums/currency-codes.enum';
import { Subscription } from 'rxjs';
import { CurrencyConvertService } from './../../services/currency-convert.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyRatesResponse } from 'src/app/interfaces/currency-rates-response.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  public USDAmount = 0;
  public EURAmount = 0;

  constructor(private currencyConvertServ: CurrencyConvertService) {}

  ngOnInit(): void {
    this.currencyConvertServ
      .getCurrencyRates(CurrencyCodes.Hryvna, [
        CurrencyCodes.UnitedStatesDollar,
        CurrencyCodes.Euro,
      ])
      .subscribe((res: CurrencyRatesResponse) => {
        this.USDAmount = 1 / res.rates[CurrencyCodes.UnitedStatesDollar];
        this.EURAmount = 1 / res.rates[CurrencyCodes.Euro];
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
