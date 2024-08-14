import {Router} from 'express';
import { addAddress, AddtoCart, deleteAddtoCart, getUserAddtoCart, getUserWishlist, placeOrder, removeFromCart, removeFromWishlist, showaddress, updateFromCart, Userdata, UserLogin, UserLogout, UserSignUp, Userwishlist, viewOrder } from '../Controllers/UserController/ShopNowUser.controllers.js';
import { LoggedIn } from '../Middleware/LoggedIn.js';

const router = Router();

router.post('/registration',UserSignUp);
router.post('/login',UserLogin);
router.post('/logout',LoggedIn,UserLogout);

router
.post('/wishlist',LoggedIn,Userwishlist)
.get('/wishlist',LoggedIn,getUserWishlist);

router.post("/removeitemfromwishlist",LoggedIn,removeFromWishlist);

router
.post('/addtocart',LoggedIn,AddtoCart)
.get('/addtocart',LoggedIn,getUserAddtoCart);

router.get('/',LoggedIn,Userdata);

router.post('/removeitemfromaddtocart',LoggedIn,removeFromCart);

router.post('/updateitemfromaddtocart',LoggedIn,updateFromCart);

router
.post('/addaddress',LoggedIn,addAddress)
.get('/addaddress',LoggedIn,showaddress);

router.post('/placeorder',LoggedIn,placeOrder);
router.get('/vieworder',LoggedIn,viewOrder);

router.post('/deleteaddtocart',LoggedIn,deleteAddtoCart)

export default router;