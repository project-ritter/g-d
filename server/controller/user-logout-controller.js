const Token = require('../model/token');

class UserLogoutController {
  logout(req, res, next) {
    let ck = req.headers.cookie;
    let cks = ck.split('=');

    let sessionId = cks[1];

    Token.findOneAndRemove({token: sessionId}, (err, doc) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('sessionId');
      res.sendStatus(200);
    });
  }

}

module.exports = UserLogoutController;
