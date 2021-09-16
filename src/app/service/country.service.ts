export class CountryService {
  getCountriesByName<T>(name: string): Promise<T> {
    return fetch(
      `https://restcountries.eu/rest/v2/name/${name}?fields=name;alpha3Code`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
  }

  getCountryDetailByAlpha3Code<T>(code: string): Promise<T> {
    return fetch(`https://restcountries.eu/rest/v2/alpha?codes=${code}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<T>;
      }
    );
  }
}
