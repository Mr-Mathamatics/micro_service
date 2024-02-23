import Jwt from "jsonwebtoken";

const AuthMiddleware = (req, res, next) =>{
    const auth = req.headers.authorization;
    if(auth === null || auth === undefined){
        return res.status(401).json({error: "Unauthorized"});
    }
    const token = auth.split(" ")[1]

    Jwt.verify(token,process.env.JWT_SECRET,(error, payload) =>{
        if(error) return res.status(401).json({error: "Unauthorized"});
        req.user =  payload
        next()
    })
}

export default AuthMiddleware;