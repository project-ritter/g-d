const express = require('express');
const CourseController = require('../../controller/course-controller');

const router = express.Router();
const courseCtrl = new CourseController();

router.get('/', courseCtrl.getAll);

module.exports = router;