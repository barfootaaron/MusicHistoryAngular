"use strict";

app.controller("SongListCtrl", function($scope, SongFactory, AuthFactory, SearchTermData, $routeParams) {

	$scope.searchText = SearchTermData;
   let user = AuthFactory.getUser();

	SongFactory.getSongs(user)
	.then( function(songList) {
		$scope.songs = songList;
	});

	$scope.songDelete = function(songId) {
      console.log("delete this song", songId);
      SongFactory.deleteSong(songId)
      .then( function(response) {
         SongFactory.getSongs(user).then( function(songList) {
            $scope.songs = songList;
         });
      });
   };

});