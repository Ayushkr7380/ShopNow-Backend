import { Schema , model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const AdminSchema = new Schema({
    username:{
        type:String,
        maxLength:[20,'Username should be less than 20'],
        minLength:[3,'Username must be greater than 2'],
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        minLength:[3,'Password must be greater than 2'],
        trim:true,
        required:true
    },
},{
    timestamps:true
});

AdminSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    };
    this.password = await bcrypt.hash(this.password,10);
});

AdminSchema.methods = {
    generateJWTToken : async function(){
        return await jwt.sign({
            id : this._id,
            username : this.username,
            email : this.email
        },
        process.env.JWT_KEY,
        {
            expiresIn : process.env.JWT_EXPIRY
        })
    },
    comparePassword : async function(plainpassword){
        return await bcrypt.compare(plainpassword,this.password)
    }
};

export const Admin = model('Admin',AdminSchema)
