const jwt = require('jsonwebtoken');

const SECRET_KEY = "fhbfgh615g74d85th4t4454htHTRGTf56fsd56Hg";

exports.createToken = (user) => {
    const payload = { user };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
};

exports.decodeToken = (token) => {
    console.log(token);
    return jwt.decode(token, SECRET_KEY);
};