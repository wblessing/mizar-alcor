const { coursesTable } = require('./helpers/airtable');
const formattedReturn = require('./helpers/formattedReturn');

exports.handler = async (event) => {
  const fields = JSON.parse(event.body);
  console.log('fields for create ' + fields);
  try {
    const createdCourse = await coursesTable.create([{ fields }]);
    return formattedReturn(200, createdCourse);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
