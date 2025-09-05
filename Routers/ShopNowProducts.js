import { Router } from "express";
import { eachItem, Products, searchItem  ,HomeProducts } from "../Controllers/ProductController/ShopNow.Product.Controller.js";

const router = Router();

router.get('/',Products);
router.get('/home',HomeProducts);
router.get('/eachitem/:id',eachItem)
router.get('/search',searchItem);


export default router;