const express = require('express');
const GradeController = require('../../controller/grade-controller');

const router = express.Router();
const gradeCtrl = new GradeController();

router.get('/', gradeCtrl.getAll);

module.exports = router;