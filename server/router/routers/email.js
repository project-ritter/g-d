const express = require('express');
const EmailController = require('../../controller/email-controller');

const router = express.Router();
const emailCtrl = new EmailController();

router.post('/', emailCtrl.getAll);

module.exports = router;