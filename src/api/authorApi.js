import { handleResponse, handleError } from './apiUtils';

export function getAuthors(accessToken) {
  console.log('load courses api access token ' + accessToken);
  return fetch('/get-authors/', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(handleResponse)
    .catch(handleError);
}
