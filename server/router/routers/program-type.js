const express = require('express');
const ProgramTypeController = require('../../controller/program-type-controller');

const router = express.Router();
const programTypeCtrl = new ProgramTypeController();

router.get('/', programTypeCtrl.getType);

module.exports = router;