const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coverLetter: String,
    status: { type: String, default: 'pending' },
    appliedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Application', applicationSchema);