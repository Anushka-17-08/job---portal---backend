const express = require ('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());


const methodOverride = require('method-override');
app.use(methodOverride('_method'));


const session = require('express-session');
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));


mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log("Mongo Atlas is connected")})
.catch((err) => {console.log('Mongo Atlas error:', err)});

app.use('/api/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);


// FrontEnd EJS
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


const pageRoutes = require('./routes/pageRoutes');

app.use('/', pageRoutes);
//console.log(require('crypto').randomBytes(64).toString('hex'))

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})