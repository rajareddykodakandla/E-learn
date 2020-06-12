const express = require("express");
const router = express.Router();

const {getUserById, getUser, updateUser, getAllUsers, updatePassword} = require("../controllers/user");
const {isSignedIn, isAuthenticate, isAdmin} = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticate, getUser);
router.get("/allusers/:userId", isSignedIn, isAuthenticate, isAdmin, getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticate, updateUser);

router.put("/user/password/:userId", isSignedIn, isAuthenticate, updatePassword);

module.exports = router;