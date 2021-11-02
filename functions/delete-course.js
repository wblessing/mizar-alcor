const { coursesTable } = require('./helpers/airtable');
const { requireAuth } = require('../lib/auth');

exports.handler = requireAuth(async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { id } = JSON.parse(event.body);
  console.log('The id is ' + id);

  const queryString = event.path;
  const qid = queryString.split('/')[2];
  console.log('Query id is ' + qid);

  try {
    console.log('before call table destroy for id ' + id);
    const deletedCourse = await coursesTable.destroy([id]);
    console.log('after call table destroy for id ' + id);

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        deletedItem: deletedCourse,
        message: 'Course deleted!',
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
});
