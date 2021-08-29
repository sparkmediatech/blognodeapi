//creating the user models for the database

const mongoose = require("mongoose"); //import mongoose

const UserSchema = new mongoose.Schema({

        username:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        profilePicture:{
            type: String,
            default: "",
        },
}, {timestamps: true}
);
//exporting this schema
module.exports = mongoose.model("User", UserSchema); //the module name is "User"