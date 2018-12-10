angular.module("BookShelfApp", []);

var bookController = function($scope, bookData) {
   bookData
   .success(function(data){
    
    $scope.data={books : data};
    console.log(data);
   }) 
}

var bookData = function($http) {
    return $http.get("/test/Sap");
  };

  angular
  .module("BookShelfApp")
  .controller("bookController",bookController)
  .service("bookData",bookData);
