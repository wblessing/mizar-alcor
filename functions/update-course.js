const { coursesTable } = require('./helpers/airtable');
const formattedReturn = require('./helpers/formattedReturn');
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedCourse = await coursesTable.update([{ id, fields }]);
    return formattedReturn(200, updatedCourse);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};