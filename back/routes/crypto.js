var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var sql = require("mssql");
var sha256 = require("sha256");
var jwtUtils = require('../utils/jwt.utils');
const { token } = require('morgan');

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
        dailyPrice = req.body.dailyPrice;
        minutePrice = req.body.minutePrice;
        openingPrice = req.body.openingPrice;
        lowPrice = req.body.lowPrice;
        highPrice = req.body.highPrice;
        cryptoUrl = req.body.cryptoUrl;
        isDisplayed = req.body.isDisplayed;
        if(jwtUtils.verifToken(token)){
            var query = ("INSERT INTO `Crypto`( `cryptoName`, `currentPrice`, `montlyPrice`, `dailyPrice`, `minutePrice`, `openingPrice`, `lowPrice`, `highPrice`, `cryptoUrl`, `isDisplayed`) VALUES ('"+cryptoName+"', "+currentPrice+", "+montlyPrice+", "+dailyPrice+", "+minutePrice+", "+openingPrice+", "+lowPrice+", "+highPrice+", '"+cryptoUrl+"', "+isDisplayed+")")
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
        let userId = jwtUtils.getUserId(token);
        if(jwtUtils.verifToken(token)){
            switch (req.params.period) {
                case "monthly":
                    var query = 'SELECT montlyPrice FROM Crypto WHERE Crypto.id = \''+req.params.cmid+'\'';
                    break;
                case "hourly":
                    var query = 'SELECT hourlyPrice FROM Crypto WHERE Crypto.id = \''+req.params.cmid+'\'';
                    break;
            
                default:
                    var query = 'SELECT minutePrice FROM Crypto WHERE Crypto.id = \''+req.params.cmid+'\'';
                    break;
            }
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

module.exports = router;