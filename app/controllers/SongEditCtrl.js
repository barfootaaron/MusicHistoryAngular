"use strict";

app.controller("SongEditCtrl", function($scope, $location, $routeParams, SongFactory, AuthFactory){

  let user = AuthFactory.getUser();

  $scope.title = "Edit Song";
  $scope.btnText = "Update";
  $scope.newSong = {};

  SongFactory.getSingleSong($routeParams.songId)
  .then( function successCallback(response){
     console.log("getSingleSongresponse", response);
      $scope.newSong = response;
  });
    
  $scope.addNewSong = function(){
    SongFactory.updateSong($routeParams.songId, $scope.newSong)
    .then( function successCallback(response) {
      console.log(response);
      $location.url("/songs/list");
    });
  };
});