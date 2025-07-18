const express = require('express');
const router = express.Router();
const {createJob, filterJobs} = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');

router.post('/createJobs', auth, createJob);
router.get('/jobs', filterJobs);

module.exports = router;