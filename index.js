var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("./user");
//var request = require("request");
const ejs = require("ejs");

//root route
router.get("/", function(req, res){
    res.render("login");
});


router.get(("/landing"),function(req,res)
{
    User.find({},function(err,all)
    {
        if(err)
        console.log("error recovering")
        else
        {
            
            res.render("landing",{user:all});
        }
    })
})
// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/landing"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/landing",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/login");
});

router.post("/:commentId", function(req, res){
    User.findOneAndDelete(req.params.commentId, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect("/landing");
        }
    })
});
module.exports = router;