var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var db = require('../db');
const https = require('https');

var app = express();

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({origin: [
  "http://localhost:8080"
], credentials: true}));


// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_id',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000}
}));

setTimeout(()=>refreshCryptoPrices(),1000*15);
setInterval(() => refreshCryptoPrices(),1000*60*5);

function refreshCryptoPrices(){
    db.query("SELECT * FROM Crypto", function (err, result, fields) {
      if (err) throw err;
      result.forEach(element => {
        getCryptoFromAPI(element.cryptoName)
      });
    });
}

function getCryptoFromAPI(cryptoName) {
  console.log("API response of "+ cryptoName)
  https.get('https://api.coincap.io/v2/assets/'+cryptoName, (resp) => {
    resp.setEncoding('utf8');
    resp.on('data', function (chunk) {
      getDailyFromAPI(cryptoName,JSON.stringify(JSON.parse(chunk).data))
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

function getDailyFromAPI(cryptoName,regularInfo) {
  console.log("API response of "+ cryptoName)
  https.get('https://api.coincap.io/v2/assets/'+cryptoName+'/history?interval=d1', (res) => {
    var buffers = []
    res
      .on('data', function(chunk) {
        buffers.push(chunk)
      })
      .on('end', function() {
        var cryptoPrices = JSON.parse(Buffer.concat(buffers).toString()).data
        updateCryptyToAPI(cryptoName,regularInfo,cryptoPrices)
      })
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

function updateCryptyToAPI(cryptoName,regularInfo,DailyInfo) {
  // get the current price of the crypto currrency
  var currentPrice = JSON.parse(regularInfo).priceUsd;
  // get the lowest and hgihbest price of the daily crypto 
  var lowPrice = 100000000000;
  var highPrice = 0;
  DailyInfo.forEach(element => {
    if (lowPrice > element.priceUsd) lowPrice = element.priceUsd;
    if (highPrice < element.priceUsd) highPrice = element.priceUsd;
  });
  var query = `UPDATE Crypto SET currentPrice=${currentPrice},lowPrice=${lowPrice},highPrice=${highPrice} WHERE cryptoName = "${cryptoName}"`;
  console.log(query)
  db.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log("insert result: "+JSON.stringify(result))
  });
}

var User = require('../routes/user');
app.use('/users', User);
var Crypto = require('../routes/crypto');
app.use('/cryptos', Crypto);
var Article = require('../routes/article');
const { json } = require('body-parser');
app.use('/articles', Article);

module.exports = app;