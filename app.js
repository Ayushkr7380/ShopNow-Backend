import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ShopNowAdmin from './Routers/ShopNowAdmin.js'
import ShopNowUser from './Routers/ShopNowUser.js';
import ShopNowProduct from './Routers/ShopNowProducts.js'
config({path : '../Backend/.env'});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

// app.use(cors({
//     credentials: true
// }));

// const corsOptions ={
//     origin:'http://localhost:5173', 
//     credentials:true,   //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

// const corsOptions ={
//     origin:process.env.FRONTEND_URL, 
//     credentials:true,   //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",  // no trailing slash
  credentials: true,   // Access-Control-Allow-Credentials: true
  optionsSuccessStatus: 200, // fix typo here
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization']   // allowed headers
}

app.use('*',cors(corsOptions));


app.use('/auth',ShopNowAdmin);
app.use('/user',ShopNowUser);
app.use('/products',ShopNowProduct);

app.all('*',(req,res,next)=>{
    res.status(404).send('Page Not Found !!!!!')
})

export default app;