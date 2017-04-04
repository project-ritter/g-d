'use strict'

const user = require('../model/user');
class User {
  login(req, res, next) {
    user.findOne(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }
      return res.sendStatus(200);
    });
  }

}

module.exports = User;