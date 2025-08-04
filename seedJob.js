const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Job = require('./models/jobs'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');

    const sampleJobs = [
      {
        title: 'Software Developer',
        description: 'Develop scalable web applications and RESTful APIs.',
        requirements: [
          'Bachelor’s degree in Computer Science',
          '2+ years experience with Node.js',
          'Knowledge of MongoDB and Express'
        ],
        location: 'Bangalore',
        industry: 'Technology',
        skills: ['Node.js', 'Express', 'MongoDB'],
        postedBy: new mongoose.Types.ObjectId() // Placeholder, should match a valid User ID
      },
      {
        title: 'Data Analyst',
        description: 'Analyze data trends and build dashboards for stakeholder insights.',
        requirements: [
          'Experience with SQL and Python',
          'Proficiency in Tableau or PowerBI'
        ],
        location: 'Mumbai',
        industry: 'Analytics',
        skills: ['Python', 'SQL', 'Tableau'],
        postedBy: new mongoose.Types.ObjectId()
      },
      {
        title: 'UI/UX Designer',
        description: 'Design intuitive interfaces and improve user experience flows.',
        requirements: [
          'Portfolio of previous design work',
          'Experience with Figma and Adobe XD'
        ],
        location: 'Remote',
        industry: 'Design',
        skills: ['Figma', 'Wireframing', 'Prototyping'],
        postedBy: new mongoose.Types.ObjectId()
      }
    ];

    return Job.insertMany(sampleJobs);
  })
  .then(() => {
    console.log('Jobs seeded successfully ✨');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('Seeding error:', err);
    mongoose.disconnect();
  });