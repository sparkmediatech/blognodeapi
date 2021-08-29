//path to access to each of the models using router, to write the user authentication logic
const router = require("express").Router() //we declared the router variable from expressing calling on the Routher method
const User = require("../models/User"); //the user model imported to be used
const bcrypt = require("bcrypt");
const Post = require("../models/Post");//coming from post model
const { request } = require("express");
const mongoose = require("mongoose")
const toId = mongoose.Types.ObjectId


//update
//becus the user will be updating something into the database, we are using .put method
router.put("/:id", async (req, res) =>{
   if(req.body.userId === req.params.id){//we checked if the user id matched
     if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            try{
           const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                
                   $set: req.body, 
                  
                   
               }, {new: true}); 
              
                //findbyidandupdate is an inbuilt method
        
            res.status(200).json(updatedUser)
           
        } catch(err){
        res.status(500).json(err) //this handles the error if there is one from the server
        }
        /*try{
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true})
        }catch(err){
            console.log(err)
        }*/
   } else{
       res.status(401).json("You can only update your account!")
   }
  
});

//delete logic

router.delete("/:id", async (req, res) =>{
   if(req.body.userId === req.params.id){//we checked if the user id matched

        try{
            const user = await User.findById(req.params.id)//get the user and assign it to user variable
            try{
                await Post.deleteMany({username: user.username})//deleting user posts once the username matches with the variable user object .username
                await User.findByIdAndDelete(req.params.id)//delete the user
                res.status(200).json("User has been deleted")
            } catch(err){
                res.status(500).json(err) //this handles the error if there is one from the server
            }
        }catch(err){
            res.status(404).json("User not found")
        }

           
   } else{
       res.status(401).json("You can only update your account!")
   }
   
});

//Get User
router.get("/:id", async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others)

    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router