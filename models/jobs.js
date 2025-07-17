const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    requirements: [String],
    location: String,
    industry: String,
    skills: [String],
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true});

module.exports = mongoose.model('Job', jobSchema);