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
router.post('/', async function(req,res) {
    try{
        //not up to date
        console.log(req.query);
        userId = req.query.id;
         db.query('SELECT * FROM User WHERE User.id = \''+userId+'\'', function(err,result){
            return res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});

//crypto-currency (ADMIN)
router.delete('/', async function(req,res) {
    try{
        //not up to date
        console.log(req.query);
        userId = req.query.id;
         db.query('SELECT * FROM User WHERE User.id = \''+userId+'\'', function(err,result){
            return res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});

//crypto-currency (USER + UNAUTHENTIFICATED)
router.get('/', async function(req,res) {
    try{
        //not up to date
        console.log(req.query);
        userId = req.query.id;
         db.query('SELECT * FROM User WHERE User.id = \''+userId+'\'', function(err,result){
            return res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});

//crypto-currency by ID (USER)
router.get('/', async function(req,res) {
    try{
        //not up to date
        console.log(req.query);
        userId = req.query.id;
         db.query('SELECT * FROM User WHERE User.id = \''+userId+'\'', function(err,result){
            return res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});

//crypto-currency by ID and period (USER)
router.get('/', async function(req,res) {
    try{
        //not up to date
        console.log(req.query);
        userId = req.query.id;
         db.query('SELECT * FROM User WHERE User.id = \''+userId+'\'', function(err,result){
            return res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});

module.exports = router;