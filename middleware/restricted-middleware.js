let jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = function restricted(req, res, next) {
                        // this is just an alternative to dot notation 
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  console.log(token); 
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length); // removing unneccessary prefixes  
  }

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {  // verifying the user sent token against the one we created and sent 
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

