import { handleResponse, handleError } from './apiUtils';
require('dotenv').config();

const baseUrl = 'https://jwb-mizal-app.netlify.app/api/authors/';
// const baseUrl = process.env.FUNC_AIRTABLE_API_URL + '/api/authors/';

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
