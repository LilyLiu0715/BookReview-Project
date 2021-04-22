var express = require("express");
var router = express.Router();
const checkOwnership = require('../middleware/checkownship')
const Book = require('./bookSchema')
const User = require('./userSchema')
const Comment = require("./commentSchema");


// Redirect to the addComment page
router.get('/bookDetail/:bookId/comments/addComment', checkOwnership.isLoggedIn, function(req, res){
        Book.findById(req.params.bookId, function(err, book){
            if (err){
                console.log(err);
            }else{
                res.render("addComment", {book:book})
            }
        })
    });


// Create new comment
router.post("/bookDetail/:bookId/comments", checkOwnership.isLoggedIn, function(req, res){
    Book.findById(req.params.bookId, function(err, book){
        if(err){
            console.log(err);
            res.redirect("/");
        } else {
            //create new comment
            // Comment.create is the built-in function of database
            // req.body.comment: parse req body to get the "comment content"
            Comment.create(req.body.comment, function(err, newComment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    //comment.commenter = req.user
                    newComment.commenter.id = req.user._id;
                    newComment.commenter.username = req.user.username;

                    //save comment (database built-in function)
                    newComment.save();

                    // update the book's comment[]
                    book.comments.push(newComment);

                    // save book (database built-in function)
                    book.save();

                    req.flash("success","Successfully added comment");
                    res.redirect('/bookDetail/' + book._id);
                }
            });
        }
    });
});



// // comment-service/api: so we can use new comment-dao
//
// const commentsDao = require('./comments-dao')
// const findAllComments = () => commentsDao.findAllComments()
// const findCommentById = (qid) => commentsDao.findCommentById(commentId)
// const findCommentsForBook = (qid) => commentsDao.findCommentsForBook(bookId)
// const createComment = () => commentsDao.createComment(text, bookId)
//
//
//  const commentApi = {
//     findAllComments,
//     findCommentById,
//     findCommentsForBook,
//     createComment
// }
//
// module.exports = commentApi;
