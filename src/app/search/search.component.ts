import { Country } from "../model/country.model";
import { CountryService } from "../service/country.service";

function getSearch(): string | null {
  return (document.getElementById("search") as HTMLInputElement).value;
}

function clearList() {
  document.getElementById("countryList")!.innerHTML = "";
}

function loadCountryDetailInfo(countryA3Code: string) {
  let countryService: CountryService = new CountryService();
  countryService
    .getCountryDetailByAlpha3Code<Country[]>(countryA3Code)
    .then((countries: Country[]) => {
      let country = countries[0];
      let languages: string = "";
      let currencies: string = "";
      country.languages!.forEach((language: any) => {
        languages += " " + language.name;
      });

      country.currencies!.forEach((currencie: any) => {
        currencies += " " + currencie.name;
      });

      document.getElementById("countryDetail")!.innerHTML = `
        <div class="card m-2">
        <div class="card-body"> 
          <div class="row d-flex">
            <div class="col-6 col-md-12 mb-2">
              <img
                src="${country.flag}"
                class="img-fluid"
                alt="Country flag"
              />
            </div>
            <div class="col-6 col-md-12">
            <p id="NativeName" class="card-title">Native name : ${country.nativeName}</p>
            <p id="capital" class="card-title">Capital : ${country.capital}</p>
            <p id="population" class="card-title">Population : ${country.population}</p>
            <p id="languages" class="card-title">Languages :${languages}</p>
            <p id="timeZones" class="card-title">Time zones : ${country.timezones}</p>
            <p id="cureenciesNames" class="card-title">Currencies names :${currencies}</p>
            <p id="borderCountriesNames" class="card-title">Border countries : ${country.borders}</p>
            </div>
          </div>
        </div>
      </div>
        `;
    });
}

document.getElementById("searchButton")?.addEventListener("click", () => {
  clearList();
  let name = getSearch();
  if (name) {
    let countryService: CountryService = new CountryService();
    countryService
      .getCountriesByName<Country[]>(name)
      .then((countries: Country[]) => {
        let parentDiv: HTMLElement = document.getElementById("countryList")!;
        countries.forEach((country) => {
          let countryElement = document.createElement("div");
          countryElement.innerHTML = `
                <div class="card m-2" id="${country.alpha3Code}" >
                    <div class="card-body">
                        <h6 class="card-subtitle mb-2 text-muted">
                        ${country.alpha3Code}
                        </h6>
                        <h5 id="countryName">${country.name}</h5>
                    </div>
                </div>
                `;
          countryElement.addEventListener("click", () =>
            loadCountryDetailInfo(country.alpha3Code)
          );
          parentDiv.appendChild(countryElement);
        });
      });
  }
});

document.getElementById("search")?.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.key === "Enter") {
    document.getElementById("searchButton")?.click();
  }
});
