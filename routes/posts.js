//path to access to each of the models using router, to write the user authentication logic
const router = require("express").Router() //we declared the router variable from expressing calling on the Routher method
const User = require("../models/User"); //the user model imported to be used
const Post = require("../models/Post");
const bcrypt = require("bcrypt");




//Create New Post
//becus the user will create post into the database, we are using .post method
router.post("/", async (req, res) =>{
   const newPost = new Post(req.body,
    {
        department: await User.findOne({username: req.body.username})
    }
    );//we called the Post model we created and we used req.body
    
    
  

   try{
        const savedPost = await newPost.save()//we tried to save the post created
      
        
        res.status(200).json(savedPost)
    }catch(err){
       res.status(500).json(err)
   }
   
});

//Update post
//becus user will be updated something that is already created, we used put method

router.put("/:id", async (req, res) =>{
    //find post that will be updated

    try{
        const post = await Post.findById(req.params.id);
         if(post.username == req.body.username ){//we looked for the post by ensuring that the username from the Post model matches the username
            try{
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {//inbuilt method used to find by id and update
                        $set: req.body
                    }, {new: true})//this makes it possible to see the updated post
                         
                    res.status(200).json(updatedPost)
            }catch(err){
                res.status(401).json(err)
                }
         } else{
             res.status(401).json("you can only update your posts")

         }

       
    }catch(err){
        res.status(500).json(err)
    }
 
});

//Delete post

router.delete("/:id", async (req, res) =>{
    //find post that will be updated

    try{
        const post = await Post.findById(req.params.id);
         if(post.username === req.body.username ){//we looked for the post by ensuring that the username from the Post model matches the username
            try{
                    await post.delete();
                      
                    res.status(200).json("Post has been deleted")
            }catch(err){
                res.status(401).json(err)
                }
         } else{
             res.status(401).json("you can only delete your posts")

         }

       
    }catch(err){
        res.status(500).json(err)
    }
  
});



//Get Post
router.get("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id );
        
       // populate(' username', 'username').exec()// comment this line out and save, refresh the single page and see that it fetches. But once this code is on, it wont fetch
          
        res.status(200).json(post)

    }catch(err){
        res.status(500).json(err)
    }
})

//GET ALL Posts logic

router.get("/", async(req, res)=>{
    const username = req.query.user;//req.querry is inbuilt. The last word .user is the keyword that will be used to querry your logic
    const catName = req.query.cat;

    try{
       let posts;
       if(username){
           posts = await Post.find({username: username})//we checked if the username vcariable we created matches with the username object in Post model
          
       }
       else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
       }

       else{
           posts = await Post.find()
       }

    res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports = router