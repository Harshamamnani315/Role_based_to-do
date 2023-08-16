const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';
const fetchuser = (req, res, next) => {

    // Getting the value of token using request Headers
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: 'Not a valid token' })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        if (req.user.role == "admin" || req.user.role == "superadmin") {
            next();
        }
        else res.status(401).send({ error: 'You are not allowed' })
    } catch (error) {
        res.status(401).send({ error: 'Not a valid token' })
    }
}

module.exports = fetchuser;