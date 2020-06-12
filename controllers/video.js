const Video = require("../models/video");
const User = require("../models/user");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

// FUNCTION TO GET USERID //
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "user not found"
            });
        }
        req.profile = user;
        next();
    })
};

// FUNCTION TO GET VIDEOID //
exports.getVideoById = (req, res, next, id) => {
    Video.findById(id).exec((err, video) => {
        if(err){
            return res.status(400).json({
                error: "There is no video in database"
            })
        }
        req.myvideo = video;
        next();
    }) 
};

// FUNCTION TO CREATE VIDEO //
exports.createVideo = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "problem with the video"
            })
        }

        fields.instructor = req.profile._id;
        fields.idforupdate = req.profile._id;
        let video = new Video(fields);

        if(file.video){
            if(file.video.size > 150000000){
                return res.status(400).json({
                    error: "file size is big!"
                })
            }
            video.video.data = fs.readFileSync(file.video.path);
            video.video.contentType = file.video.type;
        }
        
        video.save((err, myvideo) => {
            if(err){
                return res.status(400).json({
                    error: "saving video failed"
                });
            }
            res.json(myvideo);
        })
    })
}

// FUNCTION TO GET VIDEO INFO //
exports.getVideo = (req, res) => {
    req.myvideo.video = undefined;
    return res.json(req.myvideo);
}

// FUNCTION TO GET THE VIDEO //
exports.video = (req, res, next) => {
    if(req.myvideo.video.data){
        res.set("content-Type", req.myvideo.video.contentType);
        return res.send(req.myvideo.video.data);
    }
    next();
}

// FUNCTION TO UPDATE VIDEO //
exports.updateVideo = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with the video"
            })
        }
        let video = req.myvideo;
        video = _.extend(video, fields);

        if (file.video) {
            if (file.video.size > 150000000) {
                return res.status(400).json({
                    error: "file size is big!"
                })
            }
            video.video.data = fs.readFileSync(file.video.path);
            video.video.contentType = file.video.type;

        }
        if (req.profile._id == req.myvideo.idforupdate) {
        return video.save((err, myvideo) => {
            if (err) {
                return res.status(400).json({
                    error: "failed to update the video"
                });
            }
            myvideo.video = undefined;
            res.json({
                message: "The updated video based on instructor id",
                myvideo
            });
        })
       }else{
           res.json({
               userid: req.profile._id,
               instid: req.myvideo.instructor,
               message: "You are not authorized to update this video"
           });
       }

    })
}

// FUNCTION TO REMOVE THE VIDEO //
exports.removeVideo = (req, res) => {
    let video = req.myvideo;
    video.remove((err, deletedvideo) => {
        if(err){
            return res.status(400).json({
                error: "unable to remove the video"
            })
        }
        res.json({
            message : `video removed successfully from DATABASE is ${deletedvideo}`
        })
    })
};

// FUNCTION TO GET ALLINSTRUCTORS 
exports.getAllInstructors = (req, res) => {
    Video.distinct("instructor", {}, (err, videos) => {
        if(err){
            return res.status(400).json({
                error: "No videos for this instructor"
            });
        }
        res.json(videos);
    })
}

// FUNCTION TO GET VIDEO BY INSTRUCTORID //
exports.getVideosByInstructor = (req, res) => {
     Video.find({instructor: req.profile._id}).populate('_id').exec((err, video) => {
         if (err) {
             return res.status(400).json({
                 error: "Unable to get videos based on instructor Id"
             })
         }
         res.json(video)     
    })
}

// FOR TESTING //
exports.videoUpdateAuth = (req, res, next) => {
    if (req.profile._id == req.myvideo.idforupdate) {
        return res.send("You can update this video");
    } else {
        res.json({
            userid: req.profile._id,
            instid: req.myvideo.instructor,
            message: "You are not authorized to update this video"
        });
    }
    next();
}