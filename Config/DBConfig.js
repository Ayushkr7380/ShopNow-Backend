import mongoose from "mongoose";

const URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ShopNow'
const DBConfig = async() =>{
    try {
        const { connection } = await mongoose.connect(URL);
        if(!connection){
            console.log(`Connection to DB failed!! try again later!!`);
        }
        else{
            console.log(`Connected to database ${connection.host}`);
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export default DBConfig;