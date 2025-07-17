const express = require('express');
const {applyToJob, getMyApplications, getApplicationsForJob, updateApplicationStatus} = require('../controllers/applicationController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/apply', auth, applyToJob);
router.get('/my', auth, getMyApplications);
router.get('/job/:jobId', auth, getApplicationsForJob);
router.put('/:id/status', auth, updateApplicationStatus);

module.exports = router;