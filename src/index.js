import { fetchCountries } from './services/fetchCountries';
import './css/styles.css';
var debounce = require('lodash.debounce');

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');

inputRef.addEventListener('input', onInputSearch);

function onInputSearch(e) {
  const valueSearch = e.target.value;
  fetchCountries(valueSearch).then(debounce(renderCountries, 300));
}

function renderCountries(data) {
    console.log("~ data", data)
  const markup = data
    .map(({ name, capital, population, languages, flags }) => {
      return `<div>
                <p><img src="${flags.svg}" alt="" width="20px">${name.official}</p>
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p>Languages: ${Object.values(languages)}</p>
            </div>`;
    })
    .join('');
  listRef.innerHTML = markup;
}

const DEBOUNCE_DELAY = 300;
