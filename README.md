# liri-node-app

This app is designed to take in a specific request from the user and then return data for that given request using node.js.

The valid request are:
    * concert-this <band name>
    * spotify-this-song <song name>
    * movie-this <movie name>
    * do-what-it-says

**concert-this**

This uses npm axios to get data from the Bands in Town API.  A band name is entered by the user and information about upcoming concerts displays.

**spotify-this-song**

This uses npm node-spotify-api to interact with Spotify to return information to the user based on the song name the user entered.

**movie-this**

This uses npm axios to get data from the Omdb API.  The user enters a movie name and then information about that movie is returned.

**do-what-it-says**

This reads random.txt and uses the information contained to determine what data will be returned.  Currently, random.txt contains *spotify-this-song,"I Want it That Way"* so it would return information from Spotify about the song "I Want it That Way".

https://github.com/BethGrogg/liri-node-app

This project was created by Bethany Grogg as a project for UNH Full Stack Bootcamp.