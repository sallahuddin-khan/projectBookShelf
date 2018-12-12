var mongoose = require("mongoose");
var User= mongoose.model("User");
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
module.exports.addNew=function(req,res){
    console.log(req.body.email+req.body.username+req.body.password+req.body.passwordConf+req.body.phone );
    if(!req.body.email || !req.body.username ||  !req.body.password  || !req.body.passwordConf ||!req.body.phone){
        console.log("All input fields should be filled");
        res.render("signup.ejs", {"msg" : "All fields must be filled"});
    }
    else{
        if(req.body.password !== req.body.passwordConf){
            console.log("Passwords Donot match");
            res.render("signup.ejs", {"msg" : "Passwords Do not match"});
        }
        else{
            var userData = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                phoneNumber: req.body.phone,
              }
              User.create(userData, function (err, user) {
                if (err) {
                    console.log("User Creation not successfull");
                    res.render("signup.ejs", {"msg" : "there is some error with server try  again later"});
                } else if(!user) {
                  console.log("User Creation not successfull");
                }
                else{
                    console.log("User Created");
                    req.session.user=user;
                    res.redirect('/');  //Sessions needs to be added
                }
             });
        }
    }
}


module.exports.getNew=function(req,res){
    if(!req.sessions){
        res.render("signup.ejs", {"msg" : ""});
    }
    else{
        alert("Logout to Make a New Account");
        res.redirect("/");        
    }
}
module.exports.loginTemp=function(req,res){
    if(!req.session.user){
    res.render("signin.ejs", {"msg" : ""});
    }
    else{
        res.render("signin.ejs", {"msg" : ""});
    }
}
module.exports.loginUser= function(req,res){
   
    var em = req.body.email;
    var pass = req.body.password;
    User.findOne({email: em , password:pass}, function(err, user){
        if(err){
            console.log(err);
        }
        else if(!user){
            console.log("User Not found");
            res.render("signin.ejs", {"msg" : "Username or password is incorrect"});
        }
        else{
            req.session.user=user;
            res.redirect('/');
        }
        
        
    });
}


module.exports.userDash= function(req,res){//needs implementation
    if(req.session.user){
        var b=req.session.user;
        console.log(b.username);
        console.log(req.session.user.username);
        res.render("userdashboard.ejs",{
            username:b.username,
            email:b.email,
            phoneNumber:b.phoneNumber
        });
    }
    else{
        console.log("user not logged in");
        res.redirect('/login');
    }
}

module.exports.logoutUser= function(req,res){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                console.log("logout not successfull");
            }
            else{
                res.redirect('/');
            }
        });
    }
    
}
module.exports.addNewBookToUser=function(req,res){
    var userId = req.params.userid;
    var bookId = req.params.bookid;
    console.log(userId+"----------------"+bookId);
    User.findByIdAndUpdate(userId , {$push:{booksAdded:bookId}},function(err, user){
        if(err){
            console.log(err);
        }
        else if(!user){
            console.log("User not found");
        }
        else{
            console.log("Books added to user");
            res.redirect('/');
        }

    });
}
module.exports.checkEmail=function(req,res){
    var givenEmail = req.query.email;
    console.log(givenEmail);
    User.findOne({email:givenEmail},function(err,userFound){
        if(!userFound){
        var myobj = {
            
            EmailNameInUse:true
            
        };
        console.log(myobj.EmailNameInUse);
        sendJSONresponse(res,200,myobj);
    }
    else {
        var myobj = {
            
            EmailNameInUse:false
        }
        console.log(myobj.EmailNameInUse);
        sendJSONresponse(res,200,myobj);
    }
    });
    
}
module.exports.checkUsername=function(req,res){
    var givenName = req.query.name;
    console.log(givenName);
    User.findOne({username:givenName},function(err,userFound){
        if(!userFound){
        var myobj = {
            
            NameInUse:true
            
        };
        console.log(myobj.NameInUse);
        sendJSONresponse(res,200,myobj);
    }
    else {
        var myobj = {
            
            NameInUse:false
        };
        console.log(myobj.NameInUse);
        sendJSONresponse(res,200,myobj);
    }
    });
    
}
module.exports.test1=function(req,res){
    res.render('ajaxTest.ejs');
}