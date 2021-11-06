import { handleResponse, handleError } from './apiUtils';

export function getCourses(accessToken) {
  return fetch('/get-courses/', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course, accessToken) {
  let baseUrl = '/create-course/';
  if (course.id) {
    baseUrl = '/update-course/';
  }

  return fetch(baseUrl + (course.id || ''), {
    method: course.id ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(course),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(course, accessToken) {
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
