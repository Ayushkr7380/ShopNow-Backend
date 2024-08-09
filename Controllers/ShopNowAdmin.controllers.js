import { Admin } from "../Models/ShopNowAdmin.Model.js";
import { Product } from "../Models/ShopNow.Products.Model.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import { User } from "../Models/ShopNow.User.Model.js";
const cookieOptions = {
    httpOnly : true,
    secure : true,
    maxAge : 7 * 24 * 60 * 60 * 1000 
}
export const AdminRegistration = async(req,res,next) =>{
    try {
        const { username , email , password } = req.body;
        if(!username || !email || !password){
            return res.status(400).json({
                success : false,
                message : 'All Fields are Required!!'
            });
        }
        if(password.length < 3 || password.length > 20){
            return res.status(400).json({
                success : false,
                message : 'Length of password must be greater than 2 and less than 21'
            });
        };

        //Will add Email already exists part soon...

        const admin = await Admin.create({
            username,
            email,
            password
        });

        if(!admin){
            return res.status(400).json({
                success:false,
                message : 'Admin Registration Failed'
            })
        };
        await admin.save();

        const token = await admin.generateJWTToken();

        res.cookie('token',token,cookieOptions);
    
        admin.password = undefined;

        res.status(200).json({
            success : true,
            message : 'Admin Registration Successful',
            admin
        })    
    } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
    }
}
export const AdminLogin = async(req,res,next) =>{
    try {
        const {username , password } = req.body;
        if(!username || !password){
            return res.status(400).json({
                success : false,
                message : 'All Fields are Required!!'
            });
        }

        const findAdmin = await Admin.findOne({username}).select('+password');

        if(!findAdmin || !(await findAdmin.comparePassword(password))){
            return res.status(400).json({
                success : false,
                message : 'Username or password is incorrect..!!!'
            })
        };

        const token = await findAdmin.generateJWTToken();

        res.cookie('token',token,cookieOptions);

        res.status(200).json({
            success : true,
            message : 'Admin LoggedIn Successfully..',
            findAdmin
        })            
    } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
    }

}

export const AddProducts = async(req,res,next) =>{
    try {
        const { ProductName , ProductType , ProductBrand , ProductPrice , ProductDescription  } = req.body;

        if(!ProductName || !ProductType || !ProductBrand || !ProductPrice || !ProductDescription ){
            return res.status(400).json({
                success : false,
                message : 'All Fields are Required!!'
            });
        };

        const product  = await Product.create({
            ProductName,
            ProductType,
            ProductBrand,
            ProductPrice,
            ProductDescription
        });
        console.log(req.file)
        if(req.file){
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder:'shopnowproductphoto',
                    width:600,
                    height:600,
                    gravity:'faces',
                    crop:'fill'
                });
                if(result){
                    product.ProductPhoto = {
                        public_id: result.public_id,
                        secure_url: result.secure_url
                    }
                }
                console.log(result)
                await product.save();

                //Remove files from local
                fs.rm(`uploads/${req.file.filename}`)

            } catch (error) {
                return res.status(500).json({
                    success : false,
                    message : error.message
                })
            }
        }
        if(!product){
            return res.status(400).json({
                success : false,
                message : 'Failed to add Product..!!'
            })
        }
        res.status(200).json({
            success : true,
            message : 'Product added successfully..',
            product
        })       
    } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
    }
};

export const AdminLogout = async(req,res,next)=>{
    try {
        res.cookie('token',null,{
            maxAge:0,
            secure:true,
            httpOnly: true
        });

        res.status(200).json({
            success : true,
            message : 'Admin logout successfully..'
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message :error.message
        })
    }
};

export const AdminHome = async(req,res,next) =>{
    try {
        const { id } = req.user;
        const user = await Admin.findById({_id:id}).select("-password");
        if(!user){
            return res.status(400).json({
                success:false,
                message : 'Logging failed'
            });
        };

        res.status(200).json({
            success : true,
            message : 'User Fetched Success',
            user
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }

    
}