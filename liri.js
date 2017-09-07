var command = process.argv[2];
var query_value = process.argv[3];

var request = require('request');
var fs = require('fs');

// Twitter API
var twitter_api = require('twitter');
var twitter = new twitter_api({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var twitter_params = {screen_name:'max_dev_stuff'};

// Spotify API
var spotify_api = require('node-spotify-api');
var spotify = new spotify_api({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

var commands = {
    'my-tweets': function() {
        twitter.get('statuses/user_timeline', twitter_params, function(err, tweets, response) {
            if(!err) {
                for(tweet in tweets) {
                	console.log('------------------------------')
                    console.log(tweets[tweet].user.name);
                    console.log(tweets[tweet].created_at);
                    console.log(tweets[tweet].text);
                    
                }
            };
        })
    },

    'spotify-this-song': function() {
        spotify.search({ type: 'track', query: query_value, limit: 5 }, function(err, data) {
            if(!err) {
                let tracks = data.tracks.items;
                let results_count = tracks.length;
                console.log();
                console.log(`Top ${results_count} results on Spotify`);
                for(track in tracks) {
                    let song = tracks[track];
                    console.log();
                    console.log(`Title: \t${song.name}`);
                    console.log(`Album: \t${song.album.name}`);
                    console.log(`Artist:\t${song.album.artists[0].name}`);
                    console.log(`URL: \t${song.preview_url}`);
                }
            }else{
                console.log(err);
            }
        });
    },

    'movie-this': function() {
        if(!query_value) {
            query_value = 'The Matrix';
        }
        let url = `http://www.omdbapi.com/?t=${query_value}&plot=short&apikey=${process.env.OMDB_API_KEY}`;
        request(url, function(err, res, movie) {
            if(!err && res.statusCode === 200) {
                console.log();
                console.log(`Title: \t\t${JSON.parse(movie).Title}`);
                console.log(`Year: \t\t${JSON.parse(movie).Year}`);
                console.log(`IMDB: \t\t${JSON.parse(movie).Ratings[0].Value}`);
                if(JSON.parse(movie).Ratings[1]) {
                    console.log(`Rotten Tomatos:\t${JSON.parse(movie).Ratings[1].Value}`);
                }
                console.log(`Language: \t${JSON.parse(movie).Language}`);
                console.log(`Actors: \t${JSON.parse(movie).Actors}`);
                console.log(`Plot: \t\t--\n${JSON.parse(movie).Plot}`);
            }
        });
    },
    'do-what-it-says': function() {
        fs.readFile('random.txt', 'utf8', function(err, data) {
            if(!err) {
                let arr = data.split(',');
                let command = arr[0];
                query_value = arr[1];
                commands[command]();
            }
        });
    }
}

if(	command === 'my-tweets' || 'spotify-this-song' || 'movie-this' || 'do-what-it-says') {
    	commands[command]();
}

else {
    console.log('Please enter a valid command.');
}