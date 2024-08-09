import { Schema , model } from "mongoose";

const addressSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    fullname:{
        type:String,
        required:true,
        maxLength:[20,"Maximum length of fullname should be less than or equal to 20"],
        minLength:[3,"Minimum length of fullname should be greater than or equal to 3"],
        trim:true
    },
    phonenumber:{
        type:String,
        required:true,
        trim:true
    },
    pincode:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    housenumber:{
        type:String,
        required:true,
        trim:true
    },
    roadname:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
});

export const Address = model('Address',addressSchema);
