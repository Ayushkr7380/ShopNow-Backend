import { Product } from "../../Models/ShopNow.Products.Model.js"

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
                message : 'Failed to Fetch Watch Products'
            })
        };

        res.status(200).json({
            success : true,
            message : 'Watches Fetched Successfully..',
            filteredproducts
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

