const express = require('express');
const CSVController = require('../../controller/csv-controller');

const router = express.Router();
const csvCtrl = new CSVController();

router.get('/', csvCtrl.studentCSV);

module.exports = router;