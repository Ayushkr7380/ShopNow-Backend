import {Router} from 'express';
import { AddtoCart, getUserAddtoCart, getUserWishlist, removeFromCart, updateFromCart, Userdata, UserLogin, UserLogout, UserSignUp, Userwishlist } from '../Controllers/UserController/ShopNowUser.controllers.js';
import { LoggedIn } from '../Middleware/LoggedIn.js';

const router = Router();

router.post('/registration',UserSignUp);
router.post('/login',UserLogin);
router.post('/logout',LoggedIn,UserLogout);

router
.post('/wishlist',LoggedIn,Userwishlist)
.get('/wishlist',LoggedIn,getUserWishlist);

router
.post('/addtocart',LoggedIn,AddtoCart)
.get('/addtocart',LoggedIn,getUserAddtoCart);

router.get('/',LoggedIn,Userdata);

router.post('/removeitemfromaddtocart',LoggedIn,removeFromCart);

router.post('/updateitemfromaddtocart',LoggedIn,updateFromCart);

export default router;