import { Product } from "../../Models/ShopNow.Products.Model.js"

//controller for types of product 
export const Products = async(req,res,next) =>{
    try {
        const {type} = req.query;
        console.log(type)
        const products = await Product.find();
        if(!products){
            return res.status(400).json({
                success : false,
                message : 'Failed to Fetch Products'
            })
        }

        const filteredproducts = products.filter(product=>product.ProductType === type);
        if(filteredproducts.length === 0){
            return res.status(400).json({
                success : false,
                message : 'Failed to Fetch  Products'
            })
        };

        res.status(200).json({
            success : true,
            message : 'Products Fetched Successfully..',
            filteredproducts
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

//controller for each product
export const eachItem = async(req,res,next) =>{
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:'ProductId is required..'
            })
        }
        const item = await Product.findById(id);
        if(!item){
            return res.status(400).json({
                success:false,
                message:'Item not found in the database..'
            })
        }
        res.status(200).json({
            success:true,
            message:'Item fetched successfully..',
            item
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//controller for search product
export const searchItem = async(req,res,next)=>{
    try {
        const { search } = req.query;
        if(!search){
            return res.status(400).json({
                success:false,
                message:'Search field is empty..'
            })
        }

        const product = await Product.find({
            $or:[
                { ProductName: { $regex: search, $options: 'i' } },
                { ProductType: { $regex: search, $options: 'i' } },
                { ProductBrand: { $regex: search, $options: 'i' } },
                { ProductDescription: { $regex: search, $options: 'i' } }
            ]
        })
        if(product.length === 0){
            return res.status(404).json({
                success:false,
                message:'No products found.'
            })
        }
        res.status(200).json({
            success:true,
            message:'Products fetched successfully.',
            product
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}