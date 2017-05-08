const express = require('express');
const PaperController = require('../../controller/paper-controller');

const router = express.Router();
const paperCtrl = new PaperController();

router.get('/difficult', paperCtrl.calculateDifficult);
router.get('/distinct', paperCtrl.calculateDistinct);
router.get('/validate', paperCtrl.calculateValidate);

module.exports = router;