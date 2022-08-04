/* eslint-disable */
import '@babel/polyfill';
import { login } from './login.js';
import { displayMap } from './leaflet.js';

// DOM elments
const map = document.getElementById('map');
const signInForm = document.querySelector('.form');

// delegation
if (map) {
  const locations = JSON.parse(map.dataset.locations);
  displayMap(locations);
}

if (signInForm) {
  signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
