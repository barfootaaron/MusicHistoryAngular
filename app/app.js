"use strict";

var app = angular.module("MusicHistoryApp", ["ngRoute"]);

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  // console.log("running isAuth");
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
    console.log("userExists", userExists);
        if (userExists){
      console.log("Authenticated, go ahead.");
            resolve();
        }else {
      console.log("Authentication rejected, go away.");
            reject();
        }
    });
});

app.config( function($routeProvider) {
   $routeProvider.
   when('/', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
   when('/login', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
   when('/logout', {
      templateUrl: 'partials/login.html',
      controller: "UserCtrl"
   }).
   when('/songs/list', {
      templateUrl: "partials/song-list.html",
      controller: "SongListCtrl",
      resolve: {isAuth}
   }).
   when('/songs/new', {
      templateUrl: "partials/song-form.html",
      controller: "SongNewCtrl",
      resolve: {isAuth}
   }).
   when('/songs/:songId', {
      templateUrl: "partials/song-form.html",
      controller: "SongViewCtrl",
      resolve: {isAuth}
   }).
   when('/songs/:songId/edit', {
      templateUrl: "partials/song-form.html",
      controller: "SongEditCtrl",
      resolve: {isAuth}
   }).
   otherwise('/'); // Send to blank page as fallback (like an 'else' stmt)
});

//run when the app loads
app.run(($location, FBCreds) => {
   let creds = FBCreds;
   let authConfig = {
      apiKey: creds.apiKey,
      authDomain: creds.authDomain,
      databaseURL: creds.databaseURL
   };

   firebase.initializeApp(authConfig);
});