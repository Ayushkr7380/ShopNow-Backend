 import { createClient } from "redis";

 const client = createClient({
            socket:{
                host:process.env.REDIS_HOST,
                port:process.env.REDIS_PORT,
            },
            password:process.env.REDIS_PASSWORD
});
        
client.on("error",(err)=>{
            console.log("Redis error :",err);
})

 const RedisConfig = async() =>{
    try {

        await client.connect();
        console.log("Successfully connected to redis cloud.");

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
 }
export { client };
export default RedisConfig;