const RegModel = require('../models/Reg');

exports.verifyUser = (req,res,next) => {

    RegModel.findOne({
        where: {
            first_name : req.body.first_name
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Username is already in use!"
          });
          return;
        }
    
        // Email
        User.findOne({
          where: {
            email: req.body.email
          }
        }).then(user => {
          if (user) {
            res.status(400).send({
              message: "Failed! Email is already in use!"
            });
            return;
          }
    
          next();
        });
      });
}