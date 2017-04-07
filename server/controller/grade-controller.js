'use strict'

const Grade = require('../model/grade');
class GradeController {
  getAll(req, res, next) {
    Grade.find({}, (err, docs) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send(docs);
    });
  }

}

module.exports = GradeController;