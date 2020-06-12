const User = require("../models/user");
const crypto = require('crypto');

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "user not found"
            });
        }
        req.profile = user;
        next();
    })
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined; 
    req.profile.secure_password = undefined; 
    return res.json(req.profile);
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if(err){
                res.status(400).json({
                    error: "You not able to modify"
                })
            }else{
                user.salt = undefined;
                user.secure_password = undefined;
                res.json(user);
            }
        }
    );
}

exports.getAllUsers = (req, res) => {
    User.find().exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error:"NO users found"
            });
        }
        res.json(user);
    });
};

exports.updatePassword = (req, res) => {
    const {password} = req.body;
    salt = req.profile.salt;
    update = updatepass(password);
    // securepassindb = req.profile.secure_password;
    // if(update){
    //      res.json({
    //         updatedpassword: update,
    //         //oldpass: securepassindb,
    //     });
    // }else{
    //     res.send("no password")
    // }
    function updatepass(plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac('sha256', salt)
                .update(plainpassword)
                .digest('hex');
        } catch (error) {
            return "";
        }
    }

    const user = new User(req.profile);
    user.secure_password = update;
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error:"Unable to update the password"
            });
        }
        updatedpassword = user.secure_password;
        res.json({
             "Your updated password is": updatedpassword
        });
    })
}
