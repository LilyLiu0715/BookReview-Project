var express = require("express");
var router = express.Router();
var middleware=require("../middleware/checkownship");
var Book = require("../Schemas/bookSchema");

router.get("/",function(req,res){
     Book.find({},function(err,allBook){
        if(err){
            console.log(err);
        }else{
            res.render("home", {books:allBook});
        }
    })
})

// router.get("/book", function(req,res){
//     Book.find({},function(err,allBook){
//         if(err){
//             console.log(err);
//         }else{
//             res.render("home", {books:allBook});
//         }
//     })
// })

// // get to the book detail page
// router.get("/bookDetail/:id", middleware.isLoggedIn, function(req,res){
// 	Book.findById(req.params.id,function(err,book){
// 		if(err){
//             console.log(err);
//             req.flash("error","book not found");
// 			res.redirect("back");
//
// 		}else{
// 			res.render("bookDetail",{book:book}); //
// 		}
// 	});
// });


module.exports = router;

