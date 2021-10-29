const { coursesTable } = require('./airtable');
const { requireAuth, getUserId } = require('../../lib/auth');

module.exports = requireAuth(async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { claims } = context.identityContext;
    // eslint-disable-next-line no-unused-vars
    const userId = getUserId(claims);

    const queryString = event.path;
    const id = queryString.split('/')[2];

    const deletedCourse = await coursesTable.destroy(id);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        deletedItem: deletedCourse,
        message: 'Course deleted!',
      }),
    });
  } catch (err) {
    console.log(err);
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify({
        error: err,
      }),
    });
  }
});
