const express = require('express');
const router = express.Router();
const Job = require('../models/jobs'); 
const Application = require('../models/applicationModel');
const auth = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  const jobs = await Job.find().limit(4);
  const successMessage = req.session?.successMessage || null;
  req.session.successMessage = null; // Clear after reading
  res.render('index', { jobs, successMessage });

  //res.render('index', { jobs });
});

router.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  const message = req.session?.message || null;
  req.session.message = null; 
  res.render('jobs', { jobs, message });
});



router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send('Job not found');
    res.render('jobDetail', { job });
  } catch (err) {
    console.error('Error fetching job detail:', err);
    res.status(500).send('Server error');
  }
});

router.get('/createJobs', auth, (req, res) => {
  res.render('createJobs');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/jobseekerDashboard', auth, async (req, res) => {
  const applications = await Application.find({ userId: req.user.id });
  res.render('jobseekerDashboard', { user: req.user, applications });
});

// router.get('/searchJobs')
router.get('/searchJobs', (req, res) => {
  res.render('searchJobs');
});

router.get('/employerDashboard', auth, async (req, res) => {
  //const applications = await Application.find({ userId: req.user.id });
  const successMessage = req.session?.successMessage || null;
  req.session.successMessage = null;
  const jobs = await Job.find({ postedBy: req.user.id });
  res.render('employerDashboard', { user: req.user, successMessage, jobs });
});

router.get('/manage', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    //console.log("Jobs found:", jobs.length); 
    //console.log("Authenticated user:", req.user);
    const applications = await Application.find({ job: { $in: jobs.map(j => j._id) } })
      .populate('job')
      .populate('applicant');
      //console.log(jobs);
      //console.log("Jobs full data:", JSON.stringify(jobs, null, 2));
      
    res.render('manageApplications', { applications });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;