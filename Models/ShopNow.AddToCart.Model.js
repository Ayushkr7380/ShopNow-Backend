import { Schema , model } from "mongoose";
const addToCartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    noofitems:{
        type:String,
        required:true,
        trim:true
    },
    totalprice:{
        type:String,
        required:true,
        trim:true
    }
},{
    timestamps:true
});

export const Cart = model('Cart',addToCartSchema);

