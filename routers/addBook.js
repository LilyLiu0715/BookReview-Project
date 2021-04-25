const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const Book = require('../Schemas/bookSchema')
const multer = require('multer')
const { isLoggedIn } = require("../middleware/checkownship")
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/bookCovers');
    },
    filename: function (req, file, callback) {
        const ext = file.mimetype.split('/')[1];
        callback(null, `${file.fieldname}.${ext}`);
    }
});
const upload = multer({storage: storage});

// router.get("/addBook", isLoggedIn, function(req, res){
//     res.render('addBook')
// })


router.get("/book", function(req,res){
    Book.find({},function(err,allBook){
        if(err){
            console.log(err);
        }else{
            res.render("home", {books:allBook});
        }
    })
})


router.get("/addBook", isLoggedIn, function(req, res){
    res.render('addBook')
})
router.get("/book/:id/edit", isLoggedIn, async (req, res) => {
    const book = await Book.findById(req.params.id)
    res.render('editBook', { book })
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

router.post("/book/:id", isLoggedIn, async (req, res) => {
    const id  = req.params.id
    var ISBN = req.body.ISBN; 
    var name = req.body.name;
    var user ={
        id:req.user.id,
        username:req.user.username
    }
    var genre = req.body.genre;
    var image = req.body.image;
    var introduction = req.body.introduction;
    var newBook = {ISBN:ISBN,
                    name:name,
                    user:user,
                    genre:genre,
                    image:image,
                    introduction:introduction };
    console.log(newBook)
    Book.findByIdAndUpdate(id, newBook, function(err,newlyCreated){
        if(err){
            console.log(err)
        }else{
            console.log(newlyCreated)
            res.redirect("/bookDetail/" + id)
        }
    })
})

// router.post("/addBook", isLoggedIn, upload.single('image'), async(req, res) => {
//     const book = new Book(req.body.book)
//     book.image = req.file.path
//     book.user = req.user._id
//     await bookins.save()
//     // req.flash('success', 'Successfully made a new campground!')
//     // res.redirect('/')
// })

router.post("/addBook",function(req,res){
    var ISBN = req.body.ISBN; 
    var name = req.body.name;
    //need to have the login part for it to work
    var user ={
        id:req.user.id,
        username:req.user.username
    }
    console.log(user)
    var genre = req.body.genre;
    var image = req.body.image;
    var introduction = req.body.introduction;
    var newBook = {ISBN:ISBN,
                    name:name,
                    // author:author,
                    user:user,
                    genre:genre,
                    image:image,
                    introduction:introduction };
    Book.create(newBook,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/book");
        }
    })
})

module.exports = router
