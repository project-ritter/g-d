'use strict'

const uuid = require('node-uuid');
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

      let sessionId = doc._id;
      res.setHeader('Set-Cookie', ['sessionId=' + sessionId]);
      return res.sendStatus(200);
    });
  }

  check(req, res, next) {
    let ck = req.headers.cookie;
    let cks = ck.split(';');

    cks = cks[0].split('=');
    let sectionId = cks[1].replace(/\-/g, '');

    if (sectionId.length > 24) {
      return res.sendStatus(403);
    }
    user.findById(sectionId, (err, doc) => {
      if (err) {
        return next(err)
      }
      if (!doc) {
        return res.sendStatus(403);
      }
      return res.sendStatus(200);
    });

  }
}

module.exports = User;