
// API KEYS
var twitterKeys = {
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}

var spotifyKeys = {
	consumer_key: process.env.SPOTIFY_ID,
	consumer_secret: process.env.SPOTIFY_SECRET
}

var omdbKey = {
	consumer_key: process.env.OMDB_API_KEY
}
// END API KEYS

var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');


var command = process.argv[2];
var title = process.argv[3];
console.log(command, title);