var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var sql = require("mssql");
var sha256 = require("sha256");
var jwtUtils = require('../utils/jwt.utils');
const { token } = require('morgan');

router.use(bodyParser.json());

//get articles (USER + UNAUTHENTIFIED)
router.get('', async function(req,res) {
    try{
        console.log(req.query);
        userId = req.query.id;
        db.query('SELECT * FROM User WHERE User.id = \''+userId+'\'', function(err,result){
            res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});


//get article by ID (USER + UNAUTHENTIFIED)
router.get('/', async function(req,res) {
    try{
        console.log(req.query);
        userId = req.query.id;
        db.query('SELECT * FROM User WHERE User.id = \''+userId+'\'', function(err,result){
            res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});

module.exports = router;