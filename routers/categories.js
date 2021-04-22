var express = require("express");
var router = express.Router();

router.get("/categories",function(req,res){
    res.render("categories");
})

module.exports = router;
