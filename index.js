//this index.js file houses our api
const express = require("express");//creating the express server
const app = express(); //creating the application
const dotenv = require("dotenv");//declaring the envy file
const mongoose = require("mongoose");
const authRoute = require("./routes/auths")// declared a variable called authrouth pointing to auth js file created in the routes folder
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoriesRoute = require('./routes/categories');
const multer = require("multer");
const path = require("path")//imported a library that enables the image folder to be visible to the public




//test app on browser
/*app.use("/", (req, res)=>{
    console.log("This is main url")
}))*/
dotenv.config();
app.use(express.json())// to enable our app to send json files
//conect to mongoosedb using env file to hide your password

app.use("/images", express.static(path.join(__dirname, "/images") ))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(console.log("connected to Mongo")).catch(err=> console.log(err));

//login to upload images using libery called multer

const storage = multer.diskStorage({//choosing destination of the file
    destination:(req, file, cb) =>{
        cb(null, "images")
    }, filename:(req, file,cb)=> {//choosing file name
       cb(null, req.body.name) 
    }
})

const upload = multer({storage:storage});//uploading file to the file storage variabe that we created above

app.post("/api/upload", upload.single("file"), (req, res) =>{//creating a post request to handle the upload via the path
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/category",categoriesRoute);

app.listen("5000", () => {
    console.log("Backend is running"); //to run this application, I need to install node.js. we run npm init
})
