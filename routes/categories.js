const router = require("express").Router() //we declared the router variable from expressing calling on the Routher method
const Category = require("../models/Category"); //the user model imported to be used


//creating catergory logic

router.post("/", async (req, res) =>{
    const newCat = new Category(req.body);//we create a new category for the database

    try{
        const savedCategory = await newCat.save();//we need to try and catch the new category and save it
        res.status(200).json(savedCategory)
    }catch(err){
        res.status(500).json(err)
    }
})


//fetch all categories
router.get("/", async (req, res) =>{
    try{
        const categories = await Category.find();//we need to try and catch the new category and save it
        res.status(200).json(categories)
    }catch(err){
        res.status(500).json(err)
    }
})














module.exports = router