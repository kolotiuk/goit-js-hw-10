const BASE_URL = 'https://restcountries.com/v3.1/';

const fetchCountries = name => {
  // return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,languages`)
  return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,languages,flags`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.message);
      }
      return response.json();
    })
    .catch(error => console.log(error));
};

export { fetchCountries };
