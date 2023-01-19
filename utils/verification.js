import jwt from "jsonwebtoken";


export const verify = (req, res, next) => {
    
    const autHeader = req.headers.token;
    if(autHeader) {
        const token = autHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) res.status(400).json('invalid token');
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated");
    }
}
