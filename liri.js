var apiKeys = require('./keys.js');

var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');


var command = process.argv[2];
var title = process.argv[3];
console.log(command, title);
console.log(twitterKeys.consumer_key);