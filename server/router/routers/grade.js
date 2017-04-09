const express = require('express');
const GradeController = require('../../controller/grade-controller');

const router = express.Router();
const gradeCtrl = new GradeController();

router.get('/', gradeCtrl.getAll);
router.get('/analyse', gradeCtrl.gradeAnalyse);

module.exports = router;