angular.module('BookShelfApp', []);

var bookData = function($http) {
   console.log("Running service");
    return $http.get("/test/Sap");
  };
  
var bookController = function($scope, bookData) {
  bookData
  .success(function(data) {
   $scope.query = {}
   $scope.queryBy = '$'
    console.log("Running bookController");
    $scope.data={books:data};
    console.log($scope.data);
  })
  .error(function(e) {
   //$scope.message = "Sorry, something's gone wrong, please try again later";
   console.log(e);
 });
   // }) 
}



  angular
  .module("BookShelfApp")
  .controller("bookController",bookController)
  .service("bookData",bookData);
