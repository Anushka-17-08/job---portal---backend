const express = require ('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/jobPortalDB')
.then(() => { console.log("MongoDB is connected")})
.catch((err) => {console.log('MongoDB error:', err)});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})