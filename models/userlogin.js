const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userModel = new Schema({
    username:{type: String,unique:true,lowercase:true},
    password: String
})

userModel.pre('save',(next) => {
    const user = this;
    bcrypt.hash(user.password,null,null,(err,hash)=>{
        if(err) return next(err)
        user.password = hash;
        next();
    })
})

userModel.methods.comparePassword = (password) =>{
    bcrypt.compareSync(password,this.password);
    //Return either True or False
}

module.exports = mongoose.model('Userlogin',userModel);