import { handleResponse, handleError } from './apiUtils';
require('dotenv').config();

// const baseUrl = 'https://jwb-mizal-app.netlify.app/api/authors/';
const baseUrl = process.env.REACT_AIRTABLE_API_URL + '/api/authors/';
console.log('api author url is ' + baseUrl);

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
