var express = require("express");
var router = express.Router();
var Book = require("../Schemas/bookSchema");
var Comment = require("../Schemas/commentSchema");
var middleware=require("../middleware/checkownship");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var async = require('async');


// define the path for bookDetail page
router.get("/bookDetail",function(req,res){
	res.render("bookDetail");
})


// render detail, pass book and comments
router.get("/bookDetail/:id",function(req,res){
	console.log("Let's render Detail page")
	Book.findById(req.params.id,function(err,book){
		console.log("Opening the detail page here");
		console.log(book)
		if(err){
			console.log(err);
			req.flash("error","book not found");
			res.redirect("back");

		}else{
			var commentsArray = [];
			if (book.comments.length === 0) {
				res.render("bookDetail",{book:book, comments:commentsArray});
			}
			var queue = async.queue(function(commentID, callback) {
				Comment.findById(commentID, function(err, comment) {
					if (err) {
						throw err;
					}
					if (comment)
						commentsArray.push(comment);
					callback();
				});
			});

			// Note that forEach is synchronous.
			// The tasks will be pushed to the queue before drain()

			book.comments.forEach(function(comment, index) {
				queue.push(comment.id);
			});

			queue.drain = function() {
				console.log("here:", commentsArray)
				res.render("bookDetail",{book:book, comments:commentsArray});
			};
		}
	});
});




// edit the book detail page
// router.get("/bookDetail/:id/edit",middleware.isLoggedIn,function(req,res){
// 	Book.findById(req.params.id,function(err,book){
// 		if(err){
//             console.log(err);

// 		}else{
// 			res.render(Edit,{book:book}); //
// 		}
// 	});
// });

// delete the detail page of a book
router.delete("/bookDetail/:id", function(req,res){
	Book.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("back");
		}else{
// 			alert("Attention: all info about this book will be deleted.")
			req.flash("Success","Book deleted. Going back to the home page.");
			res.redirect("/")
		}
	});
});






module.exports = router;
