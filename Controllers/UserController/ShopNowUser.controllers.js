import {Address} from "../../Models/ShopNow.Address.Model.js";
import { Cart } from "../../Models/ShopNow.AddToCart.Model.js";
import { Order } from "../../Models/ShopNow.Order.Model.js";
import { User } from "../../Models/ShopNow.User.Model.js";
import { Wishlist } from "../../Models/ShopNow.Wishlists.Model.js";

const cookieOptions = {
    httpOnly : true,
    secure : true,
    maxAge : 7 * 24 * 60 * 60 * 1000 
}
export const UserSignUp = async(req,res,next) =>{
    try {
        const {name , phone , email , password } = req.body;
        if(!name || !phone || !email || !password){
            return res.status(400).json({
                success : false,
                message : 'All Fields are required..!!'
            })
        };

        if(password < 3 ){
            return res.status(400).json({
                success : false ,
                message : 'Password must be greater than 2'
            });
        };

        const user = await User.create({
            name,
            email,
            phone,
            password
        });

        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User Registration Failed ..!!!'
            })
        }

        const token = await user.generateJWTToken();

        res.cookie('token',token,cookieOptions);

        user.password  = undefined;

        res.status(200).json({
            success : true,
            message : 'User registration successful..',
            user
        });
    } catch (error) {
            return res.status(500).json({
                success : false,
                message : error.message
            })
    }

};

export const UserLogin = async(req,res,next) =>{
    try {
        const { phone , password } = req.body;
        if(!phone || !password){
            return res.status(400).json({
                success : false,
                message : 'All Fields are required...!!'
            });
        };

        const checkUser = await User.findOne({phone}).select('+password');
        if(!checkUser || !(await checkUser.comparepassword(password))){
            return res.status(400).json({
                success : false,
                message : 'Phone number or Password is incorrect ..!!'
            });
        };

        const token = await checkUser.generateJWTToken();

        res.cookie('token',token,cookieOptions);

        checkUser.password = undefined;

        res.status(200).json({
            success : true,
            message : 'User LoggedIn Successfully..',
            checkUser
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
};

export const UserLogout = async(req,res,next) =>{
    try {
        res.cookie('token',null,{
            maxAge:0,
            secure : true,
            httpOnly : true
        })

        res.status(200).json({
            success:true,
            message:'User Logout Successfully..'
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
export const Userdata = async(req,res,next)=>{
    try {
        const { id } = req.user;
        const checkUser = await User.findById({_id:id}).select('-password');
        if(!checkUser){
            return res.status(400).json({
                success:false,
                message:'User not found..'
            })
        }      
        res.status(200).json({
            success:true,
            message:'User fetched successfully..',
            checkUser
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

export const Userwishlist = async(req,res,next)=>{
    try {
        const { id } = req.user;
        const { productid } = req.body;
        if(!productid){
            return res.status(400).json({
                success:false,
                message:'Failed to find product id..'
            })
        }
        const wishlist = await Wishlist.findOne({ user:id ,product:productid});
        if(!wishlist){
            await Wishlist.create({
                user:id,
                product:productid
            });
            return res.status(200).json({
                success: true,
                message: 'Product added to wishlist.',
            });
        }       
        else{
            await Wishlist.deleteOne({ user:id , product:productid});
            return res.status(200).json({
                success: true,
                message: 'Product removed from wishlist.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })   
    }    
}

export const getUserWishlist = async(req,res,next)=>{
    try {
        const { id } = req.user;
        const wishlist = await Wishlist.find({user:id}).populate('product');
        if(!wishlist){
            return res.status(400).json({
                success:false,
                message:'No item found..'
            });
        }
        res.status(200).json({
            success:true,
            message:'Wishlist item fetched successfully..',
            wishlist
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const AddtoCart = async(req,res,next) =>{
    const {id} = req.user;
    const {productid,noofitems,totalprice} = req.body;
    try {
        if(!id){
            return res.status(400).json({
                success:false,
                message:'Please LoggedIn First'
            })
        }

        if(!productid || !totalprice || !noofitems){
            return res.status(400).json({
                success:false,
                message:'Please Provide correct Data'
            })
        }

        const addtocart = await Cart.create({
            user:id,
            products:productid,
            noofitems:noofitems,
            totalprice:totalprice
        })

        if(!addtocart){
            return res.status(400).json({
                success:false,
                message:'Failed to add item in cart'
            })
        }

        res.status(200).json({
            success:true,
            message:'Item Added to Cart'
        })
    
    } catch (error) {
            res.status(500).json({
                success:false,
                message:error.message
            })
    }
}

export const getUserAddtoCart = async(req,res,next)=>{
    const { id } = req.user;
    try {        
        const addtocart = await Cart.find({user:id}).populate('products');
        if(!addtocart){
            return res.status(400).json({
                success:false,
                message:'Failed to fetch cart details..'
            })
        }

        res.status(200).json({
            success:true,
            message:'cart fetched successfully..',
            addtocart
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



export const removeFromCart = async(req,res,next)=>{
    const { itemid } = req.body;
    try {    
        if(!itemid){
            return res.status(400).json({
                success:false,
                message:'failed to find item id'
            })
        } 

        const cart = await Cart.findByIdAndDelete({_id:itemid}).populate('products');

        if(!cart){
            return res.status(400).json({
                success:false,
                message:'Failed to remove item from cart'
            })
        }

        res.status(200).json({
            success:true,
            message:'Item removed successfully..',
            cart
        })
    } catch (error) {
           return res.status(500).json({
            success:false,
            message:error.message
           })     
    }
}

export const updateFromCart = async(req,res,next)=>{
    const { itemid,quantity,priceofEachItem } = req.body;
    try {
        if(!itemid || !quantity || !priceofEachItem){
            return res.status(400).json({
                success:false,
                message:'Request are empty!!'
            })
        }
        const cart = await Cart.findByIdAndUpdate(
            itemid,
            { noofitems: quantity, totalprice: priceofEachItem },
            { new: true }  // This option ensures the updated document is returned
        )

        if(!cart){
            return res.status(400).json({
                success:false,
                message:'Item not found in the cart!!'
            })
        }

        res.status(200).json({
            success:true,
            message:'Item Updated..',
            cart
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const addAddress = async(req,res,next)=>{
    try {
        const { id } = req.user;
        if(!id){
            return res.status(400).json({
                success:false,
                message:'User not LoggedIn'
            })
        }

        const {fullname , phonenumber , pincode , city , state , housenumber , roadname } = req.body;
        if(!fullname || !phonenumber || !pincode || !city || !state || !housenumber || !roadname ){
            return res.status(400).json({
                success:false,
                message : 'All fields are required..!!'
            })
        }

        const address = await Address.create({
            user:id,
            fullname,
            phonenumber,
            pincode,
            city,
            state,
            housenumber,
            roadname
        })

        if(!address){
            return res.status(400).json({
                success:false,
                message:'Failed to save address..'
            })
        }

        res.status(200).json({
            success:true,
            message:'Address Saved Successfully...',
            address
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const showaddress = async(req,res,next)=>{
    try {
        const {id} = req.user;
        const address = await Address.find({user:id});
        if(!address){
            return res.status(400).json({
                success:false,
                message:'No save Addresses..'
            })
        }
        res.status(200).json({
            success:true,
            message:'Saved address fetched successfully..',
            address
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })       
    }
}

export const placeOrder = async(req,res,next) =>{
    try {
        const {id} = req.user;
        const { cartitems , addressid , totalprice } = req.body;
        if(!cartitems || cartitems.length === 0 ){
            return res.status(400).json({
                success:false,
                message:'Cart is Empty'
            })
        }
        if(!addressid || !totalprice){
            return res.status(400).json({
                success:false,
                message:'Please select the address..'
            })
        }

        const items = cartitems.map((ele)=>{
            return {
                product:ele.products._id,
                quantity:ele.noofitems
            }
        })

        const orders = await Order.create({
            user:id,
            items:items,
            totalprice:totalprice,
            address:addressid
        })

        if(!orders){
            return res.status(400).json({
                success:false,
                message:'Order failed..'
            })
        }

        res.status(200).json({
            success:true,
            message:'Order placed successfully',
            orders
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteAddtoCart = async(req,res,next)=>{
    try {
        const { id } = req.user;
        const cart = await Cart.deleteMany({user:id});
        if(!cart){
            return res.status(400).json({
                success:false,
                message:'Failed to remove cart items'
            })
        }
        res.status(200).json({
            success:true,
            message:'All items have been removed from the cart'
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
} 