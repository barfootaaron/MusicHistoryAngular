"use strict";

app.controller("SongNewCtrl", function($scope, SongFactory, $location, AuthFactory) {

   let user = AuthFactory.getUser();

   $scope.title = "Add New Song";
   $scope.btnText = "Submit";
   
   $scope.newSong = {
      name: "",
      artist: "",
      album: "",
      year: "",
      genre: "",
      uid: user
   };

   $scope.addNewSong = function() {
      console.log("add new song");
      SongFactory.postNewSong($scope.newSong)
      .then( function (response) {
         $location.url("/songs/list");
      });

      console.log("you added a new song:", $scope.newSong);
      $scope.newSong = {};
   };

});
