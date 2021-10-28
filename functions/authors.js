const formattedReturn = require('./helpers/formattedReturn');
const getAuthors = require('./helpers/getAuthors');
exports.handler = async (event) => {
  if (event.httpMethod === 'GET') {
    return await getAuthors(event);
  } else {
    return formattedReturn(405, {});
  }
};
