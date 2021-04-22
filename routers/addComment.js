var express = require("express");
var router = express.Router();



router.get("/bookDetail/:bookId/comments/addComment",function(req,res){
    res.render("addComment");
})

module.exports = router;