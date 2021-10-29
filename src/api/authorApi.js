import { handleResponse, handleError } from './apiUtils';

const baseUrl = '/api/authors';
console.log('/api/authors');

export function getAuthors() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}
