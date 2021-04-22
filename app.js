const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var passportLocal = require("passport-local");
var flash = require('connect-flash');

var User=require("./Schemas/userSchema")


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public/"));
app.use(flash());

//database
const mongoose = require("mongoose");
const url =  "mongodb+srv://mikawang:cs5500@cluster0.cage7.mongodb.net/bookdb?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

//Routers
var homeRouter = require("./routers/home")
var profileRouter = require("./routers/profile")
var categoriesRouter = require("./routers/categories")
// var bookdetailRouter = require("./routers/detail")
var addCommentRouter = require("./routers/addComment")
app.use(homeRouter);
app.use(profileRouter);
// app.use(bookdetailRouter);
app.use(addCommentRouter);
app.use(categoriesRouter);



//Schemas for database


//user authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//global value
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

app.listen(3000,() => {
    console.log("Listening on port 3000");
})
