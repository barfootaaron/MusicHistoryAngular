"use strict";

app.controller("SongViewCtrl", function ($scope, $routeParams, SongFactory, AuthFactory) {
	$scope.songs = [];
	console.log($routeParams.songId);

	let user = AuthFactory.getUser();

	SongFactory.getSongs(user)
	.then( function(songList) {
		$scope.songs = songList;

		$scope.selectedSong = $scope.songs.filter( function(song) {
			return song.id === $routeParams.songId;
		})[0];
	});

});