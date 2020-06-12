const express = require("express");
const router = express.Router();
const {signin, signup, signout, isSignedIn} = require("../controllers/auth.js");

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
    res.json(req.auth); 
})

module.exports = router;
