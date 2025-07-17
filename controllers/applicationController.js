const Application = require('../models/applicationModel');
const Job = require('../models/jobs')

exports.applyToJob = async(req, res) => {
    try{
        const { jobId, coverLetter } = req.body;
        const applicantId = req.user.id;

        const exists = await Application.findOne({ job: jobId, applicant: applicantId });
        if(exists){
            return res.status(400).json({message: 'Already applied to the jobs'});
        }

        const application = new Application({
            job: jobId,
            applicant: applicantId,
            coverLetter
        });
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.getMyApplications = async(req, res) =>{
    try{
        const apps = await Application.find({applicant: req.user.id}).populate('job');
        console.log(apps[0].job);
        res.json(apps);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job || job.postedBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized access' });

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email')
      .populate('job', 'title location');

    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findById(id).populate('job');

    if (application.job.postedBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    application.status = status;
    await application.save();

    res.json({ message: 'Status updated', application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};