class UserLogoutController {
  logout(req, res, next) {

    res.clearCookie('');
    res.sendStatus(200);
  }

}

module.exports = UserLogoutController;
