const user = require('./routers/user');
const student = require('./routers/student');

module.exports = function (app) {
  app.use('/api/login', user);
  app.use('/api/students', student);
};