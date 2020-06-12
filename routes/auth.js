const express = require("express");
const router = express.Router();
const {signin, signup, signout, isSignedIn} = require("../controllers/auth.js");

// ROUTER TO SIGNUP //
router.post("/signup", signup);

// ROUTER TO SIGNIN //
router.post("/signin", signin);

// ROUTER TO SIGNOUT //
router.get("/signout", signout);

// TEST //
router.get("/test", isSignedIn, (req, res) => {
    res.json(req.auth); 
})

module.exports = router;
