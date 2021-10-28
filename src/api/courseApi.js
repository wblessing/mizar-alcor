import { handleResponse, handleError } from './apiUtils';

// TODO: jwb
const baseUrl = 'http://localhost:8888/api/courses/';
//const baseUrl = process.env.AIRTABLE_API_URL + '/courses/';

export function getCourses() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveCourse(course) {
  return fetch(baseUrl + (course.id || ''), {
    method: course.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(course),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(courseId) {
  return fetch(baseUrl + courseId, { method: 'DELETE' })
    .then(handleResponse)
    .catch(handleError);
}
