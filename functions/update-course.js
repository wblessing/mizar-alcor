const { coursesTable } = require('./helpers/airtable');
const { requireScope } = require('../lib/auth');

exports.handler = requireScope(
  'update:course',
  async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const { id, ...fields } = JSON.parse(event.body);

    try {
      const updatedCourse = await coursesTable.update([{ id, fields }]);
      const formattedCourse = {
        id: updatedCourse[0].id,
        ...fields,
      };

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          updatedCourse: formattedCourse,
          message: 'Course updated!',
        }),
      });
    } catch (err) {
      console.log('the err', err);
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          error: err,
        }),
      });
    }
  }
);
