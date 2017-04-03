const user = require('./routers/user');

module.exports = function (app) {
  app.use('/api/login', user);
};