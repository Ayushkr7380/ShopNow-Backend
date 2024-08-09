import jwt from 'jsonwebtoken';

export const LoggedIn = async(req,res,next) =>{
    try {
        const {token} = req.cookies;
        if(!token){
            return res.status(404).json({
                success : false,
                message : 'LoggedIn Failed!!'
            });
        }
        const data  = jwt.verify(token,process.env.JWT_KEY);
        req.user = data;

        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}