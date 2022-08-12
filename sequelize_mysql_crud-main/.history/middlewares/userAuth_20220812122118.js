const jwt = require("jsonwebtoken");

exports.authJwt = (req,res,next) => {
    let token = req.headers["x-access-token"];

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

      const inDenyList = await redisClient.get(`bl_${token}`)
      if(inDenyList){
        return res.status(401).send({
          status:"error",
          message
        })
      }
}

// exports.logout = (req, res, next) => {
//     let token = req.headers.replace('')
//     next();
// }