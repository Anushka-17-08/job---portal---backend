const express = require('express');
const router = express.Router();
const {createJob, filterJobs} = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');

router.post('/createJobs', auth, createJob);
router.get('/', auth, filterJobs);

module.exports = router;