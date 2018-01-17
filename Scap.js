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

var scraping = client.stream('statuses/sample');

scraping.on('data', function(event) {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
  m = regex.exec(event.txt)
  if (m){
    console.log(m);
  }
});


