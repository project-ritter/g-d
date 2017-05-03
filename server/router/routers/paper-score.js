const express = require('express');
const PaperController = require('../../controller/paper-controller');

const router = express.Router();
const paperCtrl = new PaperController();

router.get('/difficult', paperCtrl.caculateDifficult);
router.get('/distinct', paperCtrl.caculateDistinct);

module.exports = router;