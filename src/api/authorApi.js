import { handleResponse, handleError } from './apiUtils';

// TODO: jwb
const baseUrl = 'http://localhost:8888/api/authors/';
//const baseUrl = process.env.AIRTABLE_API_URL + '/authors/';

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
