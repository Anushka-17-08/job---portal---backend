const Job = require('../models/jobs');

exports.createJob = async(req, res) => {
    try{
        if(req.user.role !== 'employer'){
            return res.status(403).json({ message: 'Only employers can post jobs'});
        }
         
        req.body.skills = req.body.skills?.split(',').map(skill => skill.trim());
        req.body.requirements = req.body.requirements?.split(',').map(req => req.trim());
        //const { title, description, requirements, skills, location, industry } = req.body;
        //if (!title || !description || !location) {
        // return res.status(400).json({ error: 'Required fields are missing' });
        //}

        const job = new Job({ ...req.body, postedBy: req.user.id});
        await job.save();

        req.session.successMessage = 'Job posted succesfully';
        res.redirect('/employerDashboard');
        //const jobs = await Job.find({ postedBy: req.user.id });

        //res.render('employerDashboard', {user: req.user, jobs, successMessage: "Job posted succesfully" });
        //res.status(201).json({ message: 'Job posted succesfully', job });
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
        const {title, location, industry, skills, success, duplicate} = req.query;
         
        console.log('Query params:', req.query);
        
        const filter = {};

        if(title)   filter.title = new RegExp(title, 'i');
        if(location)    filter.location = new RegExp(location, 'i');
        if(industry)    filter.industry = new RegExp(industry, 'i');
        if(skills)  filter.skills = {$in: skills.split(',')};

        const jobs = await Job.find(filter);
        res.render('jobs', { jobs, success, duplicate });
        //res.status(200).json(jobs);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};