import { Router } from "express";
import { AddProducts, AdminHome, AdminLogin, AdminLogout, AdminRegistration } from "../Controllers/ShopNowAdmin.controllers.js";
import {LoggedIn } from "../Middleware/LoggedIn.js";
import upload from "../Middleware/multer.middleware.js";

const router = Router();

router.post('/registration',AdminRegistration);
router.post('/login',AdminLogin);
router.post('/',LoggedIn,upload.single("ProductPhoto"),AddProducts);
router.get('/',LoggedIn,AdminHome);
router.post('/logout',LoggedIn,AdminLogout);

export default router;