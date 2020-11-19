const router=require('express').Router();
const verify = require('./verifyToken');

// verify is a middleware that verify the token
router.get('/',verify,(req,res)=>{
    res.json({
        post:{
            title: 'blah',
            description:' this is a description'
        }
    });
});

module.exports= router;