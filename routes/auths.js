//path to access to each of the models using router, to write the user authentication logic
const router = require("express").Router() //we declared the router variable from expressing calling on the Routher method
const User = require("../models/User"); //the user model imported to be used
const bcrypt = require("bcrypt")//importing bcrypt lib to help hide the user password

//we will be handling  Register logic and Logic logic


//REGISTER LOGIC
//if u are writing logic to delete, u will use delete method
//if u are writing logic to fetch data, when u are not changing anything, just fetching data... u can use .get method
//if u are writing logic to update an existing data/model, u use .put method
//if u are writing logic to create something, that is ability for user to create, u will use post method

//beus this logic handles user creating account with the blog, we are using .post method, calling on the variable router that we initially declared. 
//since it is the user will need to create and connect to the server to store the data, and get response from the data, the process
//takes time. So, we need to use async to await for this response

//the req is the entire process that takes the processs to the server, the response is what the server gives back such as 'success'
router.post("/register", async(req, res) =>{
    //it is good to use try method when using async function
    try{

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt) //this code syntax is directly from bcrypt lib. We are accessing the req.body.password coming from user model
                                    
        //we created a variable called newUser and we declared the User model we created. we are looking for username, email and password from that model
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass //the hashedPass variable we declared and got from bcrypt is now our new password variable.

        })
        //saving the user after providing the username, email and password details that came from the User Model
        const user = await newUser.save() //we declared a variable called user. Applying the await async, we called the newUser variable we created and called the save() method. The save() method is coming from mongoose
        res.status(200).json(user)//sending out a response

    } catch(err){
        res.status(500).json(err) //this handles the error if there is one from the server
    }
});

//Login Logic
//becus the user is establishing a login which is a form of creation, we used .post method

router.post("/login", async (req, res) =>{
    try {
        const user = await User.findOne({username: req.body.username})// got the variable for the user which is username from the User Model
        let passValidate
        if(user) {
            passValidate = await bcrypt.compare(req.body.password, user.password)
        }

        if(!user || !passValidate) {
            res.status(400).json("Wrong credentials");
        } else {
            const {password, ...others} = user._doc;
            res.status(200).json(others)
        }
    } catch(err) {
        res.status(500).json(err);
    }
});

/*router.post("/login", async (req, res) =>{
    //I will like to fix this error
    try {
        const user = await User.findOne({username: req.body.username})//using the .findOne method, we look if the username provided matched with any user name in database
        console.log(user)
        !user && res.status(400).json("Wrong credentials");//if not matched, we use the res to send a response of wrong credentials

        const passValidate = await bcrypt.compare(req.body.password, user.password)//we used the compare method to compare the password provided with what is on database
        !passValidate && res.status(400).json("Wrong credentials");
        console.log(passValidate)

        const {password, ...others} = user._doc;//this is to prevent the password to be passed. We used spread operator to collect the objects to display
        res.status(200).json(others)//if both username and password matched, response should be user variable
    } catch(err) {
        res.status(500).json(err);
       
    }
    
});*/

//Delete the user


module.exports = router