var books=require("../Schemas/bookSchema.js");
var comment=require("../Schemas/commentSchema.js");
var middlewareObj={};

// check who own the detail page
middlewareObj.checkBookDetailPageOwnership= function(req,res,next){
    if(req.isAuthenticated()){
		books.findById(req.params.id,function(err,findbook){
			if(err){
				req.flash("error","book not found");
				res.redirect("back");
			}else{
				if(findbook.author.id.equals(req.user._id)){
					next();
			}else{
				req.flash("error","You don't have permission to do that");
				res.redirect("back");
			}

			}
		});
		
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
}

//check who own the comment 
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, function(err, findcomment){
              if(err){
                  res.redirect("back");
              }  else {
                  // does user own the comment?
               if(findcomment.author.id.equals(req.user._id)) {
                   next();
               } else {
                   res.redirect("back");
               }
              }
           });
       } else {
           res.redirect("back");
       }
   }
   
   //check to see if the user is logged in
   middlewareObj.isLoggedIn = function(req, res, next){
       if(req.isAuthenticated()){
           return next();
       }
       req.flash("error","You need to login first");
       res.redirect("/login");
   }
   
   
   
   module.exports=middlewareObj;