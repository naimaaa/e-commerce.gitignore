const passport = require('passport');
const Strategy = require('passport-local');
const User = require('../models/userlogin');

passport.use(new Strategy((username,password,done) =>{
    User.findOne({username:username},(err,user)=> {
        if(err) {return done(err)}
        if(!user){
            return done(null,false);
        }
        if(!user.comparePassword(password)){
            return done(null,false);
        }
        return done(null,user);
    })
}))

passport.serializeUser((user,done)=>{
    done(null,user._id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user) =>{
        if(err) return done(err)
        done(null,user);
    })
})