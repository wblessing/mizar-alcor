import { handleResponse, handleError } from './apiUtils';

const baseUrl = '/get-courses/';

export function getCourses(accessToken) {
  console.log('load courses api access token ' + accessToken);
  return fetch('/get-courses/', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ''), {
    method: course.id ? 'PUT' : 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(course),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(course, accessToken) {
  console.log('delete course api access token ' + accessToken);
  return fetch('/delete-course/', {
    method: 'DELETE',
    body: JSON.stringify({ id: course.id }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}
