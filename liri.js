require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var moment = require('moment');
moment().format();

var fs = require('fs');

//user inputs
var request = process.argv[2];
var name = process.argv[3];

//This section is for getting concert information
if (request == 'concert-this') {
    var queryUrl = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(response) {
        
           console.log("Venue Name: " + response[0].venue.name +
           "\nVenue location: " + response[0].venue.city +
           "\nEvent Date: " + response[0].datetime);
    });

}

//This section is for getting song information
if (request == 'spotify-this-song') {

    // Search tracks
    spotify.search({ type: 'track', query: name }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++){
            
                var song = data.tracks.items[i];
               
                 //Artist(s)
                console.log("Artist: " + song.artists[0].name +
                //The song's name
                "\nSong Name: " + song.name +
                //A preview link of the song
                "\nLink to Song: " + song.preview_url +
                //The album that the song is from
                "\nAlbum Name: " + song.album.name);
            }
        };  

     
      });

}


//This section is for getting movie information
if (request == 'movie-this') {
    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
            console.log("Movie Name: " + response.data.Title +
            "\nYear: " + response.data.Year +
            "\nOMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.Ratings +
            "\nCountry it was produced: " + response.data.Country +
            "\nMovie Language: " + response.data.Language +
            "\nMovie Plot: " + response.data.Plot +
            "\nActors: " + response.data.Actors);
        });
}
