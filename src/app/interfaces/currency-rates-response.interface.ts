import { CurrencyCodes } from '../enums/currency-codes.enum';

export interface CurrencyRatesResponse {
  base: CurrencyCodes;
  rates: Record<CurrencyCodes, number>;
}
