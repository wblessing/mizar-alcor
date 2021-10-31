const { coursesTable } = require('./airtable');
const formattedReturn = require('./formattedReturn');

module.exports = async (event, context) => {
  try {
    const courses = await coursesTable.select().firstPage();
    const formattedCourses = courses.map((course) => ({
      id: course.id,
      ...course.fields,
    }));
    return formattedReturn(200, formattedCourses);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
