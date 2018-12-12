var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var fs = require('fs');
var multer = require('multer');
var bodyParser = require('body-parser');
var methodOverrider = require('method-override');
require('./app_server/models/db');

var homeRouter=require("./app_server/routes/home");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "pug");
app.set("view engine","ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({resolve:true , saveUninitialized:true ,secret:"mySecret" }));
app.use(function(req,res,next){
    res.locals.session = req.session;    
    next();
})
app.use("/", homeRouter);
app.use(bodyParser());
app.use(methodOverrider("_method"));
//app.use("/users/my", usersRouter);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});
// image uploader
 var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./Images");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });
 var upload = multer({
     storage: Storage
 }).array("imgUploader", 3); //Field name and max count

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error.pug");
});

module.exports = app;
app.listen(process.env.PORT || 3030, ()=> console.log('success'))