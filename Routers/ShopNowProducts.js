import { Router } from "express";
import { Products  } from "../Controllers/ProductController/ShopNow.Product.Controller.js";

const router = Router();

router.get('/',Products);


export default router;