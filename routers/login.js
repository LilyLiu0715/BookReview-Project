var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var passport=require("passport");
var Comment = require("../Schemas/commentSchema")

router.get("/login",function(req,res){
    res.render("login");
})



// store the information
// router.post("/login", function(req,res){
//     var newUser = new User({
//         username: req.body.username,
//         password: req.body.password
// //        firstName: req.body.firstName,
// //        lastName: req.body.firstName,
// //        email: req.body.email,
// //        avatar: req.body.avatar

//     });

//     if(req.body.adminCode === 'secretcode123'){
//         newUser.isAdmin = true;
//     }
// })


// handling login logic
// router.post("/login", passport.authenticate("local",
//     {
//         successRedirect: "/",
//         failureRedirect: "/login"
//     }), function(req, res){
// });
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","you logged out");
   res.redirect("/");
});


module.exports = router;