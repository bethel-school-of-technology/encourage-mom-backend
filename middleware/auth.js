const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token

    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied'});
    }

    // verify token
    try {
        await jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
            
        if (error) {
        res.status(401).json({ msg: 'Token is not valid'});
        } else {
            req.user = decoded.user;
            next();
        }
        });
    } catch (err) {
        console.error('somethin is wrong with auth middleware')
        res.status(500).json({msg: "Server Error"})
    }
};

// try {
//     const decoded = jwt.verify(token, config.get('jwtSecret'));

//     req.user = decoded.user;
//     next();
// } catch(err) {
//     res.status(401).json({ msg: 'Token is not valid'});
// }
// }