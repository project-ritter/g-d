const express = require('express');
const UserLogoutController = require('../../controller/user-logout-controller');

const router = express.Router();
const userCtrl = new UserLogoutController();

router.get('/', userCtrl.logout);

module.exports = router;