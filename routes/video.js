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

router.param("userId", getUserById);
router.param("videoId", getVideoById);

router.post("/course/video/:userId", isSignedIn, isAuthenticate, isAdmin, createVideo);

router.get("/course/:videoId", getVideo);
router.get("/course/video/:videoId", video);

router.put("/course/:videoId/:userId", isSignedIn, isAuthenticate, isAdmin, updateVideo);

router.delete("/course/:videoId/:userId", isSignedIn, isAuthenticate, isAdmin, removeVideo);

router.get("/instructors", getAllInstructors);

router.get("/videos/:userId", getVideosByInstructor);
//router.put("/check/:videoId/:userId", isSignedIn, isAuthenticate, isAdmin, videoUpdateAuth)

module.exports = router;