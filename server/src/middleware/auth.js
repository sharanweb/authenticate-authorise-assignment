const jwt = require("jsonwebtoken");
require('dotenv').config();


const authorization = (roles) => {
    return async (req, res, next) => {

        const token = await request.headers.authorization.split(" ")[ 1 ];

        //checking  the token matches or not
        const decodedToken = await jwt.verify(token, process.env.TOKEN_KEY);

        const user = await decodedToken;

        // pass the user down to the endpoints here
        request.user = user;

      if (!roles || roles.length == 0) {
        return next();
      }
      const userAllowed = await user.findOne({
        _id: user._id,
        roles: { $in: roles },
      })
        .lean()
        .exec();
  
      if (!userAllowed) return res.status(401).json({ error: "not authorized" });
  
      return next();
    };
  };
  
  module.exports = authorization;
