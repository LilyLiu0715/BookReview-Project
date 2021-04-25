var express = require("express");
var router = express.Router();
const Book = require('../Schemas/bookSchema');

router.get("/categories",function(req,res){
    res.render("categories");
})

// router.get("/categories/:genre",function(req,res){
//     var genre = req.params.genre;
//     Book.find(book.genre === genre)
    
// })

router.get("/categories/:genre",(req, res) => {
    Book.find({}, (err, books) => {
        var findbooks = []
        var genre = req.params.genre; 
        console.log(genre);
        // console.log(book.name)
        if (err || !books) { return res.redirect("/"); }
        for(i = 0; i < books.length; i++){
            if (books[i].genre.toLowerCase() == genre.toLowerCase()){
                
                findbooks.push(books[i]);
                console.log(books[i]);
            }
        }
        res.render("NewCategories", {books:findbooks})
    });
});

module.exports = router;
