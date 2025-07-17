const Job = require('../models/jobs');

exports.createJob = async(req, res) => {
    try{
        if(req.user.role !== 'employer'){
            return res.status(403).json({ message: 'Only employers can post jobs'});
        }
        
        const job = new Job({ ...req.body, postedBy: req.user.id});
        await job.save();
        res.status(201).json({ message: 'Job posted succesfully', job });
    }
    catch (err){
        res.status(400).json({ error: err.message});
    }
}

getAllJobs = async (req, res) => {
    try{
        const jobs = await Job.find().populate('postedBy', 'name email');
        res.status(200).json(jobs);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
}

exports.filterJobs = async(req, res) =>{
    try{
        const {title, location, industry, skills} = req.query;

        const filter = {};

        if(title)   filter.title = new RegExp(title, 'i');
        if(location)    filter.location = location;
        if(industry)    filter.industry = industry;
        if(skills)  filter.skills = {$in: skills.split(',')};

        const jobs = await Job.find(filter);
        res.status(200).json(jobs);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};