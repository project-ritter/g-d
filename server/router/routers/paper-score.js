const express = require('express');
const PaperController = require('../../controller/paper-controller');

const router = express.Router();
const paperCtrl = new PaperController();

router.get('/', paperCtrl.getAll);

module.exports = router;