var mongoose = require("mongoose");
// var bcrypt = require('bcrypt');
var express = require('express');


var Schema = mongoose.Schema;
var ObjectID=Schema.Types.ObjectId;
 var UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
     unique: true, 
     required: true, 
     trim: true
   },
   username: { 
     type: String, 
     unique: true, 
     required: true, 
     trim: true
   },
   password: {
     type: String, 
     required: true,
   },
   passwordConf: {
     type: String, 
  },
  phoneNumber: {
    type: String, 
    required: true,
  },

  booksAdded: [String],
  
});
// UserSchema.pre('save', function (next) {
//     var user = this;
//     bcrypt.hash(user.password, 10, function (err, hash){
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     })
//   });
var bookSchema=new mongoose.Schema({
    name:String,
    description:String,
    image:String,
    Author:String,
    condition: { type: Number, default: 0, min: 0, max: 10 },
    price : {type:Number , default:0, min:0},
    genre : String,
    user:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});
mongoose.model("Book", bookSchema);
mongoose.model("User", UserSchema);
