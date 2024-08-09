import { Schema , model } from 'mongoose';

const ProductSchema = new Schema({
    ProductName : {
    type:String,
    required:true,
    trim : true
            
    },
    ProductType : {
        type:String,
        required:true,
        trim : true
        
    },
    ProductBrand : {
        type:String,
        required:true,
        trim : true
        
    },
    ProductPhoto:{
        public_id :{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },
    ProductPrice : {
        type:String,
        required:true,
        trim : true
        
    },
    ProductDescription : {
        type:String,
        required:true,
        trim : true
        
    }
},{
    timestamps:true
});

export const Product = model('Product',ProductSchema);