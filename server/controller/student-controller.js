'use strict'

const student = require('../model/student');

class User {
  getAll(req, res, next) {
    student.find((err, docs) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send(docs);
    });
  }

}

module.exports = User;