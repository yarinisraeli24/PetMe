const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');
const config = require('../config');

module.exports = (credentials = []) => {
    return (req, res, next) => {
        console.log('Authorization Middleware');

        const token = req.headers.authorization;
        if(!token) {
            return res.redirect('/login');
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if(error) return res.status(401).send("Error: Access Denied");

            if(credentials.length) {
                if(
                decoded.permissions &&
                decoded.permissions.length && 
                credentials.some(cred => decoded.permissions.indexOf(cred) >= 0)
                ){ 
                    next();
                }else {
                    return res.status(401).send('Unauthorized: access denied')
                }
            }
        })
    }
}