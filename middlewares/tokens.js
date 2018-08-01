var jwt = require('jsonwebtoken');
import { unauthorized } from '../constants/responces';

const verifyToken = (req, res, next) => {
    console.log('hello from jwt token middleware');
    const authHeader = req.headers['authorization'];

    if(typeof authHeader !== 'undefined'){
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, 'secretKey', (err, decoded) => {
            if (err) {
                res.json(unauthorized);
            } else {
                next();
            }
        })
    } else {
        res.json(unauthorized);
    }

}

export default verifyToken;