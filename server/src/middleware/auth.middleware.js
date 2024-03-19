
const jwt = require('jsonwebtoken')

 
async function auth(req, res,next) {
    
    try {
         const { token } = req.cookies;
        if (!token) {
            throw new Error("Token not found");
        }
        const data = await jwt.verify(token, "your_secret_key");
        

        if (!data) {
            throw new Error("Invalid token");
        }
        req.user = data;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error.message });
        
    }

}
module.exports  = auth;
