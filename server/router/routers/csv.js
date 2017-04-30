const express = require('express');
const CSVController = require('../../controller/csv-controller');

const router = express.Router();
const csvCtrl = new CSVController();

router.get('/student-csv', csvCtrl.studentCSV);
router.get('/grade', csvCtrl.gradeCSV);

module.exports = router;