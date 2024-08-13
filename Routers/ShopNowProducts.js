import { Router } from "express";
import { eachItem, Products  } from "../Controllers/ProductController/ShopNow.Product.Controller.js";

const router = Router();

router.get('/',Products);
router.get('/eachitem/:id',eachItem)


export default router;