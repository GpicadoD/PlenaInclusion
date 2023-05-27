import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('la que te cuento antes');
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.userNIF = decoded.userNIF;
        req.name = decoded.name,
        req.lastname = decoded.lastname
        req.email = decoded.email,
        req.birthdate = decoded.birthdate,
        req.phoneNumber = decoded.phoneNumber,
        req.gender = decoded.gender,
        req.accessToken = decoded.accessToken,
        next();
    })
}