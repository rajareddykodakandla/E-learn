const express = require("express");
const router = express.Router();

const {getUserById, getUser, updateUser, getAllUsers, updatePassword} = require("../controllers/user");
const {isSignedIn, isAuthenticate, isAdmin} = require("../controllers/auth");

// ROUTER TO GET USERID //
router.param("userId", getUserById);

// ROUTER TO GET USER INFO //
router.get("/user/:userId", isSignedIn, isAuthenticate, getUser);

// ROUTER TO GET ALL USERS //
router.get("/allusers/:userId", isSignedIn, isAuthenticate, isAdmin, getAllUsers);

// ROUTER TO UPDATE THE USER EXCEPT PASSWORD //
router.put("/user/:userId", isSignedIn, isAuthenticate, updateUser);

// ROUTER TO UPDATE THE PASSWORD OF USER //
router.put("/user/password/:userId", isSignedIn, isAuthenticate, updatePassword);

module.exports = router;