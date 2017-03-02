"use strict";

app.factory("SongFactory", ($q, $http, FBCreds) => {

	let getSongs = (user) => {
		let songsArray = [];
		return $q((resolve, reject) => {
		$http.get(`${FBCreds.databaseURL}/songs.json?orderBy="uid"&equalTo="${user}"`)
		.then((songsObj) => {
			let songList = songsObj.data;
			console.log(songList);
			Object.keys(songList).forEach((key) => {
				songList[key].id = key;
				songsArray.push(songList[key]);
			});
			resolve(songsArray);
		})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let postNewSong = (newSong) => {
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/songs.json`,
				JSON.stringify(newSong))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	let deleteSong = (songId) => {
		console.log("delete in factory", songId);
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/songs/${songId}.json`)
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			});
		});
	};

	let getSingleSong = (songId) => {
		return $q(function(resolve, reject) {
			$http.get(`${FBCreds.databaseURL}/songs/${songId}.json`)
			.then( function(songObject) {
				resolve(songObject.data);
			})
			.catch( function(error) {
				reject(error);
			});
		});
	};

	let updateSong = (songId, editedSong) => {
		return $q(function(resolve, reject) {
			$http.patch(`${FBCreds.databaseURL}/songs/${songId}.json`,
				angular.toJson(editedSong))
			.then(function(ObjectFromFirebase) {
				resolve(ObjectFromFirebase);
			})
			.catch(function(error) {
				reject(error);
			});
		});
	};

	return {getSongs, postNewSong, deleteSong, getSingleSong, updateSong};
});	
