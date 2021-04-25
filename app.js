const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var methodOverride = require('method-override')
var passportLocal = require("passport-local");
const router = express.Router();
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require("passport-local");
var User=require("./Schemas/userSchema")

//global value
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	next();
});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public/"));
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// })

//database
const mongoose = require("mongoose");
const url =  "mongodb+srv://mikawang:cs5500@cluster0.cage7.mongodb.net/bookdb?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});



//Schemas for database


//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"XXXX",
	resave:false,
	saveUninitialized:false
}));

//user authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

//Routers
var homeRouter = require("./routers/home")
var addBookRouter = require("./routers/addBook")
var profileRouter = require("./routers/profile")
// var bookdetailRouter = require("./routers/detail")
var registerRouter = require("./routers/register")
var loginRouter = require("./routers/login")
// <<<<<<< zhe-wang-branch
// // var bookdetailRouter = require("./routers/detail")
// app.use(homeRouter);
// app.use(profileRouter);
// // app.use(bookdetailRouter);
var categoriesRouter = require("./routers/categories")
// var bookdetailRouter = require("./routers/detail")
var addCommentRouter = require("./routers/addComment")
var bookDetailRouter = require("./routers/bookDetail")
app.use(methodOverride("_method"));
app.use(homeRouter);
app.use(addBookRouter);
app.use(profileRouter);
// app.use(bookdetailRouter);
app.use(addCommentRouter);
app.use(categoriesRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(bookDetailRouter);



app.listen(3000,() => {
    console.log("Listening on port 3000");
})
