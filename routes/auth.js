const router=require('express').Router();
const User=require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
 
router.post('/register',async(req,res)=>{

    //check if the combination is valid (满足长度等需求)
    const {error} = registerValidation (req.body);
    if (error) return res.status(400).send(error.details[0].message);


    // check if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist){
        return res.status(400).send('Email already exist');
    }


    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //create a new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password: hashedPassword
    });

    // save the user in the database, and respond
    try{
        const savedUser = await user.save();
        console.log(savedUser);
        res.send( user._id);
        
    }catch(err){
        res.send({message: err.message});
        res.status(400).send(err);
    }
});


//login
router.post('/login',async(req,res)=>{

    //basic step of validation: check things like length
    const {error} = loginValidation (req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // if the email exist in the database
    const user = await User.findOne({email: req.body.email});
    if (!user){
        return res.status(400).send('Email not found');
    }

    //check if the password is right
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass){
        return res.status(400).send('password wrong');
    }

    //create a token
    const token= jwt.sign( {_id: user._id},  process.env.TOKEN_SECRET );
    res.header('auth-token',token).send(token);
    //res.send(token,savedUser);
});


module.exports=router;