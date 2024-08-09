import {Schema , model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const userSchema = new Schema({
    name:{
        type:String,
        required : true,
        trim:true,
        minLength:[3,'Length of name should be greater than equal to 3'],
        maxLength:[20,'Length of name must be less than equal to 20']
    },
    phone:{
        type:String,
        required : true,
        trim:true
        //will add unique number feature soon
        //will add max number feature soon
    },
    email:{
        type:String,
        required : true,
        trim:true
        //will add unique email feature soon
    },
    password:{
        type:String,
        required : true,
        minLength:[3,'Length of password should be greater than equal to 3'],
        trim:true
    }
},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();        
    }
    this.password = await bcrypt.hash(this.password,10);
});

userSchema.methods = {
    generateJWTToken : async function(){
        return await jwt.sign({
            id : this._id,
            name : this.name,
            email : this.email
        },process.env.JWT_KEY,
        {
            expiresIn : process.env.JWT_EXPIRY
        }
        )
    },
    comparepassword : async function(rawpassword){
        return await bcrypt.compare(rawpassword,this.password)
    }
}

export const User = model('User',userSchema); 