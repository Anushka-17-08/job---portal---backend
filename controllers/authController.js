const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) =>{
    try{
        const{name, email, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword, role});
        await user.save();
        res.status(201).json({message: "User registered successfully"});
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

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.status(200).json({token});
        console.log("token generated");
    }
    catch(err){
        res.status(500).json({error: err.message});
        console.log(err);
    }
}