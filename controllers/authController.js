const User = require('../models/user');
const Job = require('../models/jobs'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) =>{
    try{
        const{name, email, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword, role});
        await user.save();
        const jobs = await Job.find().limit(4);
        if (req.headers.accept.includes('application/json'))
            res.status(201).json({message: "User registered successfully"});

        else{
            req.session.successMessage = 'Registration successful!';
            res.redirect('/');
            //res.render('index', { jobs, successMessage: "Registration successful!" });
        }
        console.log("registered successfully");
    }
    catch (err){
        res.status(400).json({error: err.message});
        console.log(err);
    }
};

exports.loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user)   return res.status(404).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)    return res.status(401).json({message: "Invalid Credentials"});

        const token = jwt.sign({id: user._id, name: user.name, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        if (req.headers.accept.includes('application/json'))
           res.status(200).json({token});

        else{
            res.cookie('token', token, { httpOnly: true });
            console.log(user.role);
            if (user.role === 'job_seeker') {
                res.redirect('/jobseekerDashboard');
            } 
            else if (user.role === 'employer'){ 
                res.redirect('/employerDashboard');
            }
            
        }
        console.log("token generated");
    }
    catch(err){
        res.status(500).json({error: err.message});
        console.log(err);
    }
}