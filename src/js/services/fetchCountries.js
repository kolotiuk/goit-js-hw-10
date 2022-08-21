const BASE_URL = 'https://restcountries.com/v3.1/';

const fetchCountries = name => {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,capital,population,languages,flags`
  ).then(response => {
    if (response.status === 404) {
      throw new Error(response.message);
    }
    return response.json();
  });
};

export { fetchCountries };
