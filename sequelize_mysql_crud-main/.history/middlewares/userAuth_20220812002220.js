const jwt = require("jsonwebtoken");

exports.authJwt = (req,res,next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
      }
    
    
}