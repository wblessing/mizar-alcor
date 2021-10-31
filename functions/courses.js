const formattedReturn = require('./helpers/formattedReturn');
const getCourses = require('./helpers/getCourses');
const createCourse = require('./helpers/createCourse');
const deleteCourse = require('./helpers/deleteCourse');
const updateCourse = require('./helpers/updateCourse');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    return await getCourses(event, context);
  } else if (event.httpMethod === 'POST') {
    return await createCourse(event, context);
  } else if (event.httpMethod === 'PUT') {
    return await updateCourse(event, context);
  } else if (event.httpMethod === 'DELETE') {
    return await deleteCourse(event, context);
  } else {
    return formattedReturn(405, {});
  }
};
