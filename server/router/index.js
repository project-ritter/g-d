const user = require('./routers/user');
const student = require('./routers/student');
const csv = require('./routers/csv');
const course = require('./routers/course');
const grade = require('./routers/grade');

module.exports = function (app) {
  app.use('/api/login', user);
  app.use('/api/students', student);
  app.use('/api/report', csv);
  app.use('/api/courses', course);
  app.use('/api/grades', grade);
};