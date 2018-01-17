/*=====================Initialisation=====================*/
var express    =     require("express");
var app        =     express();
var http       =     require('http').Server(app);
const httpd    =     require('https');
var fs         =     require('fs');
var bodyParser =     require('body-parser');
var Twitter    =     require('twitter');
var Charlatan  =     require('charlatan');
/*======================================================*/


Charlatan.setLocale('fr');

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

/*======================routes==========================*/

var client = new Twitter({
    consumer_key: 'hGbqEvcBOS6QRN5vQbzf7gCPD',
    consumer_secret: 'o5AhC6CCcTGgsSxa0eETDoeN7yF4kFbnX4ta4OrCwgrINpREhd',
    access_token_key: '904988456320987136-ydgDpVNC2j0kYXu8wtra5X9oYulymjD',
    access_token_secret: 'sWDJK2w4IoR0DVtagPnt58DS3ZrjgBRu4wwIHp6aioG8g'
});

var params = {screen_name: 'nodejs'};

//var autofollow = client.stream('statuses/filter', {track: '#ZEvent', language: "fr"});
var autort = client.stream('statuses/filter', {track: '#ZEvent', language: "fr"});
//var user = client.stream('user');

/*user.on('follow', function(event) {
 client.post('friendships/create', {user_id: event.source.id},  function(error, tweet, response) {
  if(!error)
    console.log("[FallowBack] " + event.source.name+ " follow u, give back ;)");
});
});

user.on('favorite', function(event) {
   client.post('friendships/create', {user_id: event.source.id},  function(error, tweet, response) {
      if(!error)
        console.log("[FavFollow] " + event.source.name+ " fave ur tweets, i follow him ;)");
});
});

autofollow.on('data', function(event) {
    client.post('friendships/create', {user_id: event.user.id},  function(error, tweet, response) {
      if(!error)
        console.log("[Autofollow] follow a new user " + event.user.name + " hope he followback");
});
});
*/

autort.on('data', function(event) {
    client.post('statuses/retweet/' + event.id_str,  function(error, tweet, response) {
      if(!error)
        console.log("[AutoRT] RT a new Twitte from " + event.user.name);
});
});


/**
* Insert new users
* /twitte/new?q=[message]
*/
app.get('/twitte/new', function (req, res) {
    var text = req.query.q;
    text = text.replace(/<email>/g,Charlatan.Internet.freeEmail())
    text = text.replace(/<phone>/g,phone())
    text = text.replace(/<bitcoin>/g,Charlatan.Bitcoin.address())
    text = text.replace(/<site>/g,("www." + Charlatan.Internet.domainName()))
    text = text.replace(/<name>/g,Charlatan.Name.name()) 
    Charlatan.Bitcoin.address()
    if (text){
     client.post('statuses/update', {status: text},  function(error, tweet, response) {

     });
     res.send("1");
 } else {
    res.send("-1");
}

});

function phone(){
    str = "06"
    while(str.length != 10){
        str += Math.floor(Math.random() * 10);
    }
    return str
} 



/*==================start serv==================*/
http.listen(555, function(){
    console.log('listening on *:8080');
});
