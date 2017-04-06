const user = require('./routers/user');
const student = require('./routers/student');
const csv = require('./routers/csv');

module.exports = function (app) {
  app.use('/api/login', user);
  app.use('/api/students', student);
  app.use('/api/report/student-csv', csv);
};