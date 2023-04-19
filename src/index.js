import './css/styles.css';

// import Notiflix from 'notiflix';
// Notiflix.Notify.success('success');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Notify.success('success');
// Notify.failure('fail');

import  {fetchCountries} from './js/fetch.js'; // == import ==
// import fetchCountries from './js/fetch.js'; // == import default ==
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 500;
console.log('Hi 10');



const inputEl = document.getElementById('search-box');
const listEl = document.querySelector('.country-list');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener("input", debounce(onInputName, DEBOUNCE_DELAY));


function onInputName() {
    let value = inputEl.value.trim();

    if(value === '' ) {
        clearHTML();
        return
    }
    fetchCountries(value)
    .then((countries) => {
        if(countries.length === 1) {
            renderCountriesList(countries);
            // listEl.style.fontSize = `${36}px`;
            listEl.classList.add('country-font-size'); //CSS classList
            renderCountryInfo(countries[0]);
            // console.log('Oooo!', countries[0]);
        }
        else if(countries.length <= 10) {
            renderCountriesList(countries);
            listEl.classList.remove('country-font-size'); //CSS classList
            infoEl.innerHTML = '';
        }
        else {
            clearHTML();
            Notify.success('Too many matches found. Please enter a more specific name.');
            console.log("Too many matches found. Please enter a more specific name.");
        }
    })
    .catch((error) => {
        console.log('MySerg', error);
        Notify.failure('Oops, there is no country with that name');
        console.log("Oops, there is no country with that name");
        clearHTML();
    });
}


function renderCountriesList(countries) {
    const markup = countries.map(({ flags: {png}, name: {common} }) => {
        return `<li>
            <img src="${png}" alt="flag" width="30">
            <span><b>${common}</b></span>
            </li>`;
        }).join("");

    listEl.innerHTML = markup;
}


function renderCountryInfo(country) {
    const { capital, population, languages} = country;
    infoEl.innerHTML = `
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${Object.values(languages)[0]}</p>
        `;
}

function clearHTML() {
    listEl.innerHTML = '';
    infoEl.innerHTML = '';
}