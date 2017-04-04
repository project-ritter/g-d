const express = require('express');
const StudentController = require('../../controller/student-controller');

const router = express.Router();
const studentCtrl = new StudentController();

router.get('/', studentCtrl.getAll);

module.exports = router;