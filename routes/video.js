const express = require("express");
const router = express.Router();

const {
    getVideoById, 
    createVideo, 
    getVideo, 
    video, 
    updateVideo, 
    removeVideo, 
    getAllInstructors,
    getVideosByInstructor,
    videoUpdateAuth
    } = require("../controllers/video");
const {isSignedIn, isAuthenticate, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user")

// ROUTER TO GET USERID //
router.param("userId", getUserById);
// ROUTER TO GET VIDEOID //
router.param("videoId", getVideoById);

// ROUTER TO CREATE VIDEO //
router.post("/course/video/:userId", isSignedIn, isAuthenticate, isAdmin, createVideo);

// ROUTER TO GET VIDEO INFO //
router.get("/course/:videoId", getVideo);
// ROUTER TO GET VIDEO //
router.get("/course/video/:videoId", video);

// ROUTER TO UPDATE VIDEO //
router.put("/course/:videoId/:userId", isSignedIn, isAuthenticate, isAdmin, updateVideo);

// ROUTER TO REMOVE VIDEO //
router.delete("/course/:videoId/:userId", isSignedIn, isAuthenticate, isAdmin, removeVideo);

// ROUTER TO GET ALL INSTRUCTORS //
router.get("/instructors", getAllInstructors);

// ROUTER TO GET VIDEO OF PARTICULAR INSTRUCTOR //
router.get("/videos/:userId", getVideosByInstructor);
//router.put("/check/:videoId/:userId", isSignedIn, isAuthenticate, isAdmin, videoUpdateAuth)

module.exports = router;