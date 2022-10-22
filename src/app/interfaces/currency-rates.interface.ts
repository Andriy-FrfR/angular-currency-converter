import { CurrencyCodes } from '../enums/currency-codes.enum';

export interface CurrencyRates {
  [key: string]: Record<CurrencyCodes, number>;
}
