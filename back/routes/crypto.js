var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var sql = require("mssql");
var sha256 = require("sha256");
var jwtUtils = require('../utils/jwt.utils');
const { token } = require('morgan');
const https = require('https');

router.use(bodyParser.json());

//crypto-currency (ADMIN)
router.delete('/:id', async function(req,res) {
    try{
        let token = req.body.token;
        let userId = jwtUtils.getUserId(token);
        //not up to date
        if(jwtUtils.verifToken(token)){
            console.log(req.params.id);
            id = req.params.id;
            console.log('DELETE FROM Crypto WHERE id = \''+id+'\'')
            db.query('DELETE FROM Crypto WHERE id = \''+id+'\'', function(err,result){
                return res.status(200).json(result);
            })
        }else{
            console.log(jwtUtils.verify(token));
        }
    }catch{
        res.sendStatus(500);
    }
});

//crypto-currency (ADMIN)
router.post('/', async function(req,res) {
    try{
        //not up to date
        let token = req.body.token;
        let userId = jwtUtils.getUserId(token);
        console.log(req.body);
        id = req.body.id;
        cryptoName = req.body.cryptoName;
        currentPrice = req.body.currentPrice;
        montlyPrice = req.body.montlyPrice;
        lowPrice = req.body.lowPrice;
        highPrice = req.body.highPrice;
        cryptoUrl = req.body.cryptoUrl;
        isDisplayed = req.body.isDisplayed;
        if(jwtUtils.verifToken(token)){
            var query = ("INSERT INTO `Crypto`( `cryptoName`, `currentPrice`, `lowPrice`, `highPrice`, `cryptoUrl`, `isDisplayed`) VALUES ('"+cryptoName+"', "+currentPrice+", "+lowPrice+", "+highPrice+", '"+cryptoUrl+"', "+isDisplayed+")")
            db.query(query, function(err,result){
                return res.status(200).json(result);
            })
        }else{
            console.log(jwtUtils.verify(token));
        }
    }catch{
        res.sendStatus(500);
    }
});

//crypto-currency by ID (USER)
router.get('/:cmid', async function(req,res) {
    try{
        let token = req.body.token;
        let userId = jwtUtils.getUserId(token);
        if(jwtUtils.verifToken(token)){
            var query = 'SELECT * FROM Crypto WHERE Crypto.id = \''+req.params.cmid+'\'';
            console.log(query)
            db.query(query, function(err,result){
                return res.status(200).json(result);
            })
        }else{
            console.log(jwtUtils.verify(token));
        }
    }catch{
        res.sendStatus(500);
    }
});

//crypto-currency (USER + UNAUTHENTIFICATED)
router.get('/', async function(req,res) {
    try{
        //not up to date
        var CryptoID = req.query.cmids
        console.log(CryptoID)
        CryptoID = CryptoID.substring(1, CryptoID.length-1);
        var query = 'SELECT * FROM Crypto WHERE id IN (\''+CryptoID+'\')';
        console.log(query)
         db.query(query, function(err,result){
            return res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});

//crypto-currency by period (USER)
router.get('/:cmid/period/:period', async function(req,res) {
    try{
        //not up to date
        let token = req.body.token;
        // if(jwtUtils.verifToken(token)){
        if(true){
            switch (req.params.period) {
                case "monthly":
                    var interval = 'm1';
                    break;
                case "hourly":
                    var interval = 'h1';
                    break;
            
                default:
                    var interval = 'd1';
                    break;
            }
            var query = `SELECT cryptoName FROM Crypto WHERE id = "${req.params.cmid}"`;
            console.log(query)
             db.query(query, function(err,result){
                var url = `https://api.coincap.io/v2/assets/${result[0].cryptoName}/history?interval=${interval}`
                console.log(url)
                https.get(url, (resquest) => {
                  var buffers = []
                  resquest
                    .on('data', function(chunk) {
                      buffers.push(chunk)
                    })
                    .on('end', function() {
                      var cryptoPrices = JSON.parse(Buffer.concat(buffers).toString()).data
                      return res.status(200).json(cryptoPrices);
                      
                    })
                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                });
            })
        }else{
            console.log(jwtUtils.verify(token));
        }
    }catch{
        res.sendStatus(500);
    }
});

module.exports = router;