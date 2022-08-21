import Notiflix from 'notiflix';
import { fetchCountries } from './services/fetchCountries';
import '../css/styles.css';
var debounce = require('lodash.debounce');

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 300;

const onInputSearch = e => {
  const inputSearch = e.target.value.trim();

  if (!inputSearch) {
    listRef.innerHTML = '';
    return;
  }

  fetchCountries(inputSearch)
    .then(res => {
      if (res.length >= 2 && res.length < 10) {
        renderCountries(res);
      } else if (res.length < 2) {
        renderOneCountry(res);
      } else {
        listRef.innerHTML = '';
        onInputManyFound();
      }
    })
    .catch(onInputError);
};

inputRef.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

const renderCountries = data => {
  const markup = data
    .map(({ name, flags }) => {
      return `<div>
                  <p class="countries-block"><img src="${flags.svg}" alt="" width="50px">${name.official}</p>
              </div>`;
    })
    .join('');
  listRef.innerHTML = markup;
};

const renderOneCountry = data => {
  const markup = data
    .map(({ name, capital, population, languages, flags }) => {
      return `<div class="one-country">
                <p><img src="${flags.svg}" alt="" width="20px"><span>${
        name.official
      }</span></p>
                <p>Capital: <span>${capital}</span></p>
                <p>Population: <span>${population}</span></p>
                <p>Languages: <span>${Object.values(languages)}</span></p>
            </div>`;
    })
    .join('');
  listRef.innerHTML = markup;
};

const onInputManyFound = () => {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
};

const onInputError = () => {
  listRef.textContent = '';
  Notiflix.Notify.failure('Oops, there is no country with that name');
};
