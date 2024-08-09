import app from './app.js'
import DBConfig from './Config/DBConfig.js'
import cloudinary from 'cloudinary';


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5001;
const LOCALHOST = process.env.LOCALHOST || '127.0.0.1';

app.listen(PORT,LOCALHOST,async()=>{
    console.log(`Server ${LOCALHOST} is running at PORT ${PORT}`);
    await DBConfig();
});