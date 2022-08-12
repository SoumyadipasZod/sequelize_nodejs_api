const RegModel = require('../models/Reg');

exports.verifyUser = (req,res,next) => {
    
    RegModel.findOne({
        where: {
        //   username: req.body.username
        first_name : req.body.first_name
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Username is already in use!"
          });
          return;
        }
      })
}