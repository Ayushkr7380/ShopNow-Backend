import { Product } from "../../Models/ShopNow.Products.Model.js"
import { client } from "../../Config/RedisConfig.js"

//controller for types of product 
export const Products = async(req,res) =>{
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
export const HomeProducts = async(req,res,next) =>{
    
    try{

        const cached = await client.get("HomeProducts");

        if(cached){
            console.log("Cache Hit - HomeProducts");

            return res.status(200).json({
                success:true,
                message:"Items fetched successfully from cache",
                results:JSON.parse(cached)
            })
        }

        console.log("Cache Miss - HomeProducts");

        const categories = [
            "menstshirts", "menshoe", "mensshirts", "mensjeans", "mensjacket",
            "womensshoes", "womensshirts", "womenstshirts", "womensjeans", "womensjacket",
            "kidsjeans", "kidsjacket", "kidsshirt", "laptop", "watch"
        ];

        const promises = categories.map(type =>
            Product.find({ ProductType: type })
            .limit(4)
            .select("ProductName ProductPrice ProductPhoto")
        );

        const data = await Promise.all(promises);

        let results = {};
        categories.forEach((type, idx) => {
        results[type] = data[idx];
        });


        await client.setEx("HomeProducts",60*60*5,JSON.stringify(results));

        res.json({
            success:true,
            results
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
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


        const cachedItem = await client.get(`product:${id}`);
        if (cachedItem) {
            return res.status(200).json({
                success: true,
                message: "Item fetched successfully from cache..",
                item: JSON.parse(cachedItem),
            });
        }

        const item = await Product.findById(id);
        if(!item){
            return res.status(400).json({
                success:false,
                message:'Item not found in the database..'
            })
        }

        await client.setEx(`product:${id}`, 60 * 60 * 5, JSON.stringify(item));


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
