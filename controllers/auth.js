const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// FUNCTION TO SIGNUP //
exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
                if (err) {
                    return res.status(400).json({
                        error: "unable to save the user"
                    })
                }
                res.json({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                });
    })  
};

// FUNCTION TO SIGNIN //
exports.signin = (req, res) => {
    const {email, password} = req.body;
     User.findOne({email}, (err, user)=>{
        if(err || !user){
           return res.status(400).json({
                error: "email does not exist"
            })
        }

        if (!user.authenticate(password)){
            return res.status(401).json({
                error: "email and password does not match"
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        res.cookie("token", token , {expire: new Date()+99999});

        const {_id, name, email, role, secure_password} = user;
        res.json({token, user:{_id, name, email, role, secure_password}});
    });
};

// FUNCTION TO SIGNOUT //
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "user signout successful"
    })
}

// FUNCTION TO CHECK IS SIGNEDIN USING EXPRESSJWT //
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

// MIDDLEWARE FOR ISAUTHENTICATE //
exports.isAuthenticate = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.json({
            error: "ACCESS DENIED"
        });
    }
    next();
};

// MIDDLE FOR ISADMIN //
exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            message: "YOU ARE NOT ADMIN"
        })
    }
    next();
}

// MIDDLEWARE FOR ISSUPERADMIN //
exports.isSuperAdmin = (req, res, next) => {
    if (req.profile.role === 2) {
        return res.status(403).json({
            message: "YOU ARE NOT SUPER ADMIN"
        })
    }
    next();
}
