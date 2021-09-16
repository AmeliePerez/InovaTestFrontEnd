export class Country {
  alpha3Code: string;
  name: string;
  nativeName?: string;
  population?: string;
  capital?: string;
  currencies?: { name: string }[];
  timezones?: string[];
  languages?: { name: string }[];
  borders?: string[];
  flag?: string;

  constructor(
    alpha3Code: string,
    name: string,
    nativeName?: string,
    population?: string,
    capital?: string,
    currencies?: { name: string }[],
    timezones?: string[],
    languages?: { name: string }[],
    borders?: string[],
    flag?: string
  ) {
    this.alpha3Code = alpha3Code;
    this.name = name;
    this.nativeName = nativeName;
    this.population = population;
    this.capital = capital;
    this.currencies = currencies;
    this.timezones = timezones;
    this.languages = languages;
    this.borders = borders;
    this.flag = flag;
  }
}
