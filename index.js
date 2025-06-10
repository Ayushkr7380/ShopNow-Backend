import app from './app.js'
import DBConfig from './Config/DBConfig.js'
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Ensure uploads/ folder exists
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5001;

app.listen(PORT,async()=>{
    console.log(`Server is running at PORT ${PORT}`);
    await DBConfig();
});