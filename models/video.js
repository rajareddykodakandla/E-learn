const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const videoSchema = new mongoose.Schema({
    name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32
        },
    description: {
            type: String,
            required: true,
            maxlength: 1500
        },
    instructor :{
        type: ObjectId,
        ref: "User",
        required: true
    },
    idforupdate:{
        type: String,
        required: true
    },
    video: {
        data: Buffer,
        contentType: String
    }
    
    }, 
    {  timestamps : true });



module.exports = mongoose.model("Video", videoSchema); 