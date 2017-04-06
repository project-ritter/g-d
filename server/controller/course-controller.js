'use strict'

const course = require('../model/course');
class Course {
  getAll(req, res, next) {
    course.find({}, (err, docs) => {
      if (err) {
        return next(err);
      }

      return res.send(docs);
    });
  }

}

module.exports = Course;