const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Comment = require("../Schemas/commentSchema");
const Book = require('../Schemas/bookSchema');
const User = require('../Schemas/userSchema')
const checkOwnership = require('../middleware/checkownship')


// redirected to the addComment page
router.get("/bookDetail/:bookId/comments/new",checkOwnership.isLoggedIn, function(req,res){
    console.log("bookId:", req.params.bookId)
    Book.findById(req.params.bookId, function(err, book){
        if(err){
            console.log(err)
        }else{
            console.log("addComment:", book)
            res.render("addComment", {book:book});
        }
    });
})



// submit a comment
router.post('/bookDetail/:bookId/comments',checkOwnership.isLoggedIn, function(req, res){
    Book.findById(req.params.bookId, function(err, book){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            // const fakeId = "60822537f31242e6b7780d4b";
            // const fakeUsername = "Lyla";
            // const fakeId = req.user._id
            // const fakeUsername =
            console.log("user ID: ",req.user._id)
            console.log("comment text:", req.body["comment-text-field"])
            //create new comment
            // Comment.create is the built-in function of database
            // req.body.comment: parse req body to get the "comment content"
            Comment.create({
                text: req.body["comment-text-field"].trim(),
                commenter: {id: req.user._id, username: req.user.username},
            }, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    console.log(comment)
                    //add username and id to comment
                    //comment.author = req.user
                    // comment.commenter.id = req.user._id;
                    // comment.commenter.username = req.user.username;

                    //save comment (database built-in function)
                    comment.save();

                    // update the movie's comment[]
                    book.comments.push({id: comment._id});

                    // save movie (database built-in function)
                    book.save();

                    // req.flash("success","Successfully added comment");
                    // req.alert("Successfully added comment")
                    res.redirect('/bookDetail/' + req.params.bookId);
                }
            });
        }
    });
});


//delete a comment
// /book/:bookId/comments/:commentId
// commentId: "607a63e349760e01d752ab66"
router.delete("/bookDetail/:bookId/comments/:commentId",function(req,res){
    console.log("Start to delete")
    // console.log("body", req.body)
    // console.log("params", req.params)
    // console.log("bookId", req.params.bookId)
    // console.log("commentId", req.params.commentId)
    Comment.findByIdAndRemove(req.params.commentId,function(err){
        if(err){
            res.redirect('/bookDetail/' + req.params.bookId);
        }
    });

    const result = Book.findByIdAndUpdate(req.params.bookId,{
        $pull: {
            comments: { id: req.params.commentId }
        }
    }, { new: true });

    if (result)
        console.log("Book.findByIdAndUpdate:", result)

    console.log("Comment deleted successfully")
    req.flash("success","Comment deleted");
    res.redirect("/bookDetail/" + req.params.bookId)
});



module.exports = router;