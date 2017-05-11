const user = require('./routers/user');
const student = require('./routers/student');
const csv = require('./routers/csv');
const course = require('./routers/course');
const grade = require('./routers/grade');
const paperScore = require('./routers/paper-score');
const logout = require('./routers/logout');
const programType = require('./routers/program-type');

module.exports = function (app) {
  app.use('/api/login', user);
  app.use('/api/logout', logout);
  app.use('/api/students', student);
  app.use('/api/report', csv);
  app.use('/api/courses', course);
  app.use('/api/grades', grade);
  app.use('/api/paper', paperScore);
  app.use('/api/program', programType);
};