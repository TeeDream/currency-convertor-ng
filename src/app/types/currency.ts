import { CountriesArray } from 'src/apiVariables';

export type APICountries = (typeof CountriesArray)[keyof typeof CountriesArray];
export type APICountriesKeys = (typeof CountriesArray)[keyof APICountries];

export interface CurrencyAPIAnswer {
  motd: MOTD;
  success: boolean;
  base: APICountries;
  date: string;
  rates: { [K in (typeof CountriesArray)[keyof APICountries]]: number };
}

export interface MOTD {
  msg: string;
  url: string;
}
