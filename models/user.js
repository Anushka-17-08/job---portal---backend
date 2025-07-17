const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['job_seeker', 'employer'], required: true}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);