var express = require("express");
var router = express.Router();


var homePage=require("../controllers/homepage");
var bookPage=require("../controllers/bookpage");
var userPage = require("../controllers/userpage");
router.get("/", homePage.homePage);
router.get("/SearchBook", homePage.searchBook);
router.get("/ShowBook", homePage.showBook);
// router.get("/Poetry",bookPage.poetry);
// router.get("/Literature",bookPage.literature);
// router.get("/StoryBooks",bookPage.storyBook);
// router.get("/Educational",bookPage.educational);
// router.get("/Biography",bookPage.biography);
//router.get("/SearchBook/:id",bookPage.searchByID);
router.post("/AllBooks",bookPage.showAllBooks);
router.get("/AllBooks/new",bookPage.getNew);
router.get("/AllBooks/:id",bookPage.searchByID);
router.get("/AllBooks",bookPage.createNewBook);
router.get("/GenreBooks/:genre",bookPage.getByGenre);
router.post("/AddUser",userPage.addNew);
router.get("/AddUser", userPage.getNew);
router.get("/login", userPage.loginTemp);
router.post("/login",userPage.loginUser);
router.get("/userDashboard",userPage.userDash);
router.get("/logout",userPage.logoutUser);
router.get("/SearchByTitle",bookPage.getByTitle);
router.get("/addBookToUser/:userid/:bookid",userPage.addNewBookToUser);
router.get("/showUploadedBooks",bookPage.showAllMyBooks);
router.get("/DeleteBook",bookPage.showAllMyBooksDelete);
router.get("/DeleteBook/:id",bookPage.deleteBook);
router.get("/DeleteBookConfirm/:id/:name",bookPage.confirmDelete);
router.get("/test/:title",bookPage.getAllBooksTemp);
router.get("/test",bookPage.testrender);
//router.get("/UpdateBookInfo/:id",bookPage.updateBookInfo);
//router.post("/NewUser",userPage.addNewUser);
/* Other pages*/

module.exports = router;