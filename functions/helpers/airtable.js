require('dotenv').config();
var Airtable = require('airtable');
var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);
const authorsTable = base(process.env.AIRTABLE_AUTHORS_TABLE);
const coursesTable = base(process.env.AIRTABLE_COURSES_TABLE);

module.exports = { coursesTable, authorsTable };
