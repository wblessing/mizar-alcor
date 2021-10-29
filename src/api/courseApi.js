import { handleResponse, handleError } from './apiUtils';
require('dotenv').config();

const baseUrl = 'https://jwb-mizal-app.netlify.app/api/courses/';
//const baseUrl = process.env.FUNC_AIRTABLE_API_URL + '/api/courses/';

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
