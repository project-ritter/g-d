'use strict'

const uuid = require('node-uuid');
const user = require('../model/user');

const Token = require('../model/token');

class User {
  login(req, res, next) {
    user.findOne(req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(404);
      }

      let sessionId = uuid.v4();
      Token.create({userId: doc._id, token: sessionId});

      res.setHeader('Set-Cookie', ['sessionId=' + sessionId]);
      return res.sendStatus(200);
    });
  }

  check(req, res, next) {
    let ck = req.headers.cookie;
    let cks = ck.split(';');

    cks = cks[0].split('=');
    let sectionId = cks[1];

    if (sectionId.length > 36) {
      return res.sendStatus(403);
    }
    Token.findOne({token: sectionId}, (err, doc) => {
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