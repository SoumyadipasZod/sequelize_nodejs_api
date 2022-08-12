const jwt = require("jsonwebtoken");

exports.authJwt = (req,res,next) => {
    let token = req.headers["x-access-token"];
    con

    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
      }
    
      jwt.verify(token, 'soumyadip', (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        req.userId = decoded.id;
        next();
      });
}