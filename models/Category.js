//creating the user models for the database

const mongoose = require("mongoose"); //import mongoose to be used

const CategorySchema = new mongoose.Schema(
    {
       name:{
           type: String,
           require: true,
       }
       
}, {timestamps: true}
);
//exporting this schema
module.exports = mongoose.model("Category", CategorySchema); //the module name is "Post"