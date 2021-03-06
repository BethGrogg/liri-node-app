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

function doWhat(request, name) {
    switch (request) {

        case "concert-this":
            doConcert(name);
            break;

        case "spotify-this-song":
            doSpotify(name);
            break;

        case "movie-this":
            doMovie(name);
            break;

        case "do-what-it-says":
            doRandom();
            break;

        default:
            break;
    }
}

//This section is for getting concert information
function doConcert(name) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (response) {


            console.log("\nVenue Name: " + response.data[0].venue.name +
                "\nVenue location: " + response.data[0].venue.city +
                "\nEvent Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

            appendFile("\nVenue Name: " + response.data[0].venue.name +
                "\nVenue location: " + response.data[0].venue.city +
                "\nEvent Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        });

}

//This section is for getting song information
function doSpotify(name) {

    if (name == null) {
        name = 'The Sign';
    }
    // Search tracks
    spotify.search({
        type: 'track',
        query: name
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            for (i = 0; i < data.tracks.items.length && i < 5; i++) {

                var song = data.tracks.items[i];

                //Artist(s)
                console.log("\nArtist: " + song.artists[0].name +
                    //The song's name
                    "\nSong Name: " + song.name +
                    //A preview link of the song
                    "\nLink to Song: " + song.preview_url +
                    //The album that the song is from
                    "\nAlbum Name: " + song.album.name);

                appendFile("\nArtist: " + song.artists[0].name +
                    //The song's name
                    "\nSong Name: " + song.name +
                    //A preview link of the song
                    "\nLink to Song: " + song.preview_url +
                    //The album that the song is from
                    "\nAlbum Name: " + song.album.name);
            }
        };


    });

};


//This section is for getting movie information
function doMovie(name) {

    if (name == null) {
        name = 'Mr. Nobody';
    };

    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {

            console.log("\nMovie Name: " + response.data.Title +
                "\nYear: " + response.data.Year +
                "\nIMDB Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nCountry it was produced: " + response.data.Country +
                "\nMovie Language: " + response.data.Language +
                "\nMovie Plot: " + response.data.Plot +
                "\nActors: " + response.data.Actors);


            appendFile("\nMovie Name: " + response.data.Title +
                "\nYear: " + response.data.Year +
                "\nIMDB Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nCountry it was produced: " + response.data.Country +
                "\nMovie Language: " + response.data.Language +
                "\nMovie Plot: " + response.data.Plot +
                "\nActors: " + response.data.Actors);
        });
}

//This section is for do-what-it-says
function doRandom() {

    fs.readFile("random.txt", 'utf8', function (err, data) {
        console.log(data);

        var dataArray = data.split(',');
        request = dataArray[0];
        name = dataArray[1];
        doWhat(request, name);

    })

};

function appendFile(data) {

    //Output all that happens into a log.txt file
    fs.appendFile("log.txt", data, function (err) {

        //If an error happens while trying to write to the file
        if (err) {
            return console.log(err);
        }
    });
}

doWhat(request, name);