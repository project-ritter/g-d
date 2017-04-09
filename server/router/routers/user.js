const express = require('express');
const UserController = require('../../controller/user-controller');

const router = express.Router();
const userCtrl = new UserController();

router.post('/', userCtrl.login);
router.get('/', userCtrl.check);

module.exports = router;