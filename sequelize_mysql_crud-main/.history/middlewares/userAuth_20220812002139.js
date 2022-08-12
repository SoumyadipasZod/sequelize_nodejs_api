const jwt = require("jsonwebtoken");

exports.authJwt = (req,res,next) => {
    let token = req.headers["x-access-token"];
}