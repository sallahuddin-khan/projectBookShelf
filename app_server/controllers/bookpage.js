
var mongoose = require("mongoose");
var Book= mongoose.model("Book");
var User= mongoose.model("User");
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
module.exports.searchByID=function(req,res){
    Book.findById(req.params.id,function(err,bookFound){
        if(!bookFound){
            console.log(req.params.id);
            console.log("Book not found");
        }
        else if(err){
            console.log(err);
        }
        else{
        var no="";
        User.findById(bookFound.user.id,function(err,found){
            no=found.phoneNumber;
            console.log(no);
        });
        console.log(bookFound.user.phoneNumber);
        res.render("show.ejs",{
            book:bookFound,
            phoneNumber:no
        });
    }
    });
}
module.exports.showAllBooks=function(req,res){
    var name1 =req.body.name;
    var name=name1.toLowerCase();
    var image= req.body.image;
    var cat = req.body.category;
    var con = req.body.condition;
    var desc = req.body.description;
    console.log(desc);
    var pr=req.body.price;
    var ge = req.body.genre;
    var au = req.body.author;
    var oid = req.session.user._id;
    var thor={
        id:req.session.user._id,
        username:req.session.user.username
    }
    
    var newBook = {name: name ,Author:au, image: image, description: desc , category:cat , condition:con,price:pr , genre:ge,user:thor }
    Book.create(newBook , function(err , newlyBook){
       if(err) { console.log(err);}
        else  {
            console.log(newlyBook+"******");
            res.redirect('/addBookToUser/'+oid+'/'+newlyBook._id);
            console.log("Book created"+name);
        }
    });
}
module.exports.getNew=function(req,res){
    if(req.session && req.session.user){
        console.log(req.session.user._id);
        res.render("new.ejs");
    }
    else{
        res.redirect('/login');
    }
}
module.exports.createNewBook=function(req,res){
    Book.find({}, function(err , AllBooks){
        if(err) console.log("error");
        else console.log("good")
            res.render("allBooks.ejs" ,{AllBooks:AllBooks});
    });
}
module.exports.getByGenre=function(req,res){
    
    var GivenGenre=req.params.genre;
    console.log("finding "+GivenGenre);
    Book.find({genre:GivenGenre},function(err,BooksFound){
        if(err)console.log("Error")
        else if(!BooksFound) console.log("No Books Found")
        else{
            res.render("allBooks.ejs",{
                AllBooks:BooksFound
            })
        }
    });
}

module.exports.getByTitle= function(req,res){
    
    var givenTitle1 = req.query.title;
    var givenTitle=givenTitle1.toLowerCase();
    console.log(givenTitle);
    Book.find({name :{$regex:givenTitle}},function(err,BooksFound){
        if(err)console.log("Error")
        else if(!BooksFound) console.log("No Books Found")
        else{
            res.render("allBooks.ejs",{
                AllBooks:BooksFound
            })
        }
    });
}
module.exports.showAllMyBooks=function(req,res){
    var added;
    var id=req.session.user._id;
    console.log("HEllo"+id);
    User.findById(id,function(err,userFound){
        console.log(userFound.username);
        added=userFound.booksAdded;
        console.log(added.length);
        Book.find({'_id':{$in : added}},function(err,booksFound){
            if(err)console.log("Error")
            else if(!booksFound) console.log("No Books Found")
            else{
                console.log(booksFound);
                res.render("allBooks1.ejs",{
                    AllBooks:booksFound
                })
            }
        });
    });  
}

module.exports.showAllMyBooksDelete=function(req,res){//Add a alert
    var added;
    var id=req.session.user._id;
    var user=req.session.user.username;
    console.log("HEllo"+id);
    User.findById(id,function(err,userFound){
        console.log(userFound.username);
        added=userFound.booksAdded;
        console.log(added.length);
        Book.find({'_id':{$in : added}},function(err,booksFound){
            if(err)console.log("Error")
            else if(!booksFound) console.log("No Books Found")
            else{
                console.log(booksFound);
                res.render("deletePage.ejs",{
                    AllBooks:booksFound,
                    username:user
                })
            }
        });
    });  
}
module.exports.deleteBook=function(req,res){
    var id = req.params.id;
    if(!id){
        console.log("Give ID");//add a proper response

    }
    else{
        Book.findByIdAndRemove(id).exec(function(err,book){
            if(err){
                //send a proper JSON response
            }
            else if(!book){
                console.los("Book Not Found");
            }
            else{
                //send a JSON response
                console.log("Book Deleted");
                res.redirect('/DeleteBook');
            }
        });
    }
}
module.exports.confirmDelete=function(req,res){
    var n = req.params.name;
    var i = req.params.id;
    var user=req.session.user.username;
     res.render("deleteConfirmation.ejs",{
     name: n,
     id: i,
     username:user
     }
     );
}
module.exports.updateBookInfo=function(req,res){
    Book.findById(req.params.id,function(err,BookFound){
        res.render("BookUpdatePage.ejs",{
            Book:BookFound
        });
    });
}

module.exports.edit=function(req, res){
    if(!req.session && !req.session.user){
        res.redirect("/login");
    }
    else{
    Book.findById(req.params.id,function(err ,foundBook){
        if(err){
            res.redirect("/allBooks");
        }
        else{
             res.render("edit.ejs" , {book : foundBook});
        }
    });
}
}

module.exports.update = function(req , res){
    var name =req.body.name;
    var image= req.body.image;
    var cat = req.body.category;
    var con = req.body.condition;
    var desc = req.body.description;
    var pr=req.body.price;
    var ge = req.body.genre;
    var au = req.body.author;
     var updateBook = {name: name ,Author:au, image: image, description: desc , category:cat , condition:con,price:pr , genre:ge }
    Book.findByIdAndUpdate(req.params.id , updateBook,function(err , updatedBook){
        if(err)
            res.redirect("/allBooks");
        else
            res.redirect("/allBooks/"+ req.params.id);
    });
}
//---------------------Angular work---------------------------------//
module.exports.testrender=function(req,res){
    
    res.render("test.ejs");
       
}
module.exports.getAllBooksTemp=function(req,res){
var givenTitle = req.params.title;

Book.find({},function(err,BooksFound){
    sendJSONresponse(res,200,BooksFound);
});
}