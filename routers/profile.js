var express = require("express");
var router = express.Router();
var User = require("../Schemas/userSchema")
var Book = require("../Schemas/bookSchema")
const middleware = require("../middleware/checkownship");
let localUser = {};


//TESq
// let foundUser = {id: 123, username: "toanvang", firstName: "toan", lastName: "vang", email: "tvang994@gmail.com"};
// let foundBooks = [
//     {
//     name: "alchemist",
//     author: "john",
//     },
//     {
//         name: "three kingdoms",
//         id: "123",
//         author: "alex"
//     }
// ]

// router.get("/users",function(req,res){
//     res.render("profile", {user: foundUser, books:foundBooks});
// })
//
// router.get("/users/edit",function(req,res){
//     res.render("editProfile", {user: foundUser, books:foundBooks});
// })




// User profile
// router.get("/profile", middleware.isLoggedIn, (req, res) => {
//     Books.find().where("author.id").equals(currentUser._id).exec((err, books) => {
//         if (err) {
//             req.flash("error", "Something went wrong...");
//             res.redirect("/profile");
//         }
//         else { res.render("profile",{user: req.user, books: books})}
//     });

// });

router.get("/profile",(req, res) => {
    Book.find().where("user.id").equals(req.user).exec((err, books) => {
        if (err) {
            req.flash("error", "Something went wrong...");
            res.redirect("/profile");
        }
        else { res.render("profile",{user: req.user, books: books})}
    });

});





module.exports = router;
