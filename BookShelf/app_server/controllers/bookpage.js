
var mongoose = require("mongoose");
var Book= mongoose.model("Book");
var User= mongoose.model("User");
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
  };
// module.exports.poetry=function(req,res){
//     res.render("category-show.pug",{
//         title:"Poetry"
//     });
// };

// module.exports.literature=function(req,res){
//     res.render("category-show.pug",{
//         title:"Literature"
//     });
// };

// module.exports.storyBook=function(req,res){
//     res.render("category-show.pug",{
//         title:"Story Books"
//     });
// };

// module.exports.educational=function(req,res){
//     res.render("category-show.pug",{
//         title:"Educational"
//     });
// };

// module.exports.biography=function(req,res){
//     res.render("category-show.pug",{
//         title:"Biography"
//     });
// };
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
        console.log(bookFound.name);
        res.render("show.ejs",{
            book:bookFound
        })
    }
    });
}
module.exports.showAllBooks=function(req,res){
    var name =req.body.name;
    var image= req.body.image;
    var cat = req.body.category;
    var con = req.body.condition;
    var desc = req.body.description;
    var pr=req.body.price;
    var ge = req.body.genre;
    var au = req.body.author;
    var oid = req.session.user._id;
    console.log(ge);
    var newBook = {name: name ,Author:au, image: image, description: desc , category:cat , condition:con,price:pr , genre:ge , addedBy:oid }
    Book.create(newBook , function(err , newlyBook){
       if(err) { console.log(err);}
        else  {
            console.log(oid);
            console.log(newlyBook._id);
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
    
    var givenTitle = req.query.title;
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
                res.render("allBooks.ejs",{
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
                console.log("Book Not Found");
            }
            else{
                //send a JSON response
                console.log("Book Deleted");
                res.redirect('/DeleteBook');
            }
        }
		);
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
module.exports.testrender=function(req,res){
    
        res.render("test.ejs");
           
}
module.exports.getAllBooksTemp=function(req,res){
    var givenTitle = req.params.title;
    console.log(givenTitle);
    Book.find({name :{$regex:givenTitle}},function(err,BooksFound){
    
        sendJSONresponse(res,200,BooksFound);
    });
}