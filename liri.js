require("dotenv").config();

var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var request = process.argv[2];

var name = process.argv[3];

//This section is for getting concert information
if (request == 'concert-this') {
    var queryUrl = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function(response) {
            console.log("Venue Name: " + response.description);
            console.log("Venue location: " + response.venue);
            console.log("Event Date: " + response.datetime);
    });

}

//This section is for getting song information
if (request == 'spotify-this-song') {

    
}


//This section is for getting movie information
if (request == 'movie-this') {
    var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function(response) {
            console.log("Movie Name: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("OMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings);
            console.log("Country it was produced: " + response.data.Country);
            console.log("Movie Language: " + response.data.Language);
            console.log("Movie Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        });
}
