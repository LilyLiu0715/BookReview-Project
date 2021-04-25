var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var flash = require("connect-flash");
var User = require("../Schemas/userSchema");
var passport = require("passport");
var Comment = require("../Schemas/commentSchema")

router.get("/register",function(req,res){
    res.render("register");
})


router.post("/register",  async (req, res) => {
    // console.log(req.body);
    // const {username, password, firstName, lastName,email} = req.body;
    // const username = req.body["username"]
    // const password = req.body["password"]
    // const isAdmin = role ==='Admin'
    // const newUser = new User({username, password, firstName, lastName,email});
    // console.log(newUser);
    var username = req.body.username;
    var password = req.body.password; 
    var firstName = req.body.firstName;
    var lastName = req.body.lastName; 
    var email = req.body.email;
    var newUser = {
           username:username,
           password:password, 
           firstName:firstName, 
           lastName:lastName,
           email:email
    };
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("eric111")
            console.log(err);
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
			req.flash("success","Welcome to BookLover " + user.username);
           res.redirect("/");
        });
        // res.redirect("/")
    });

});

// router.delete("/book/:bookId/register", function(req, res) {

// });


module.exports = router;
