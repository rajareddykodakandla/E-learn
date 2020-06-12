const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidjs = require("uuidjs");
const uuid = uuidjs.generate();

const userSchema = new mongoose.Schema({
    name: {
            type: String,
            required: true,
            maxlength: 20,
            trim: true
        },
    lastname: {
            type: String,
            required: false,
            maxlength: 20,
            trim: true
        },
    email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
    userinfo: {
            type: String,
            trim: true
        },
    secure_password: {
            type: String,
            required: true
        },
    salt: String,    
    role: {
            type: Number,
            default: 0
        },
    uploadedvideos: {
        type: Array,
        default: []
    }

    },
    { timestamps : true });


userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuid;
        this.secure_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.secure_password
    },
 securePassword: function(plainpassword){
        if (!plainpassword) return "";
        try {
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch (error) {
            return "";
        }
    }
};

module.exports = mongoose.model("User", userSchema);