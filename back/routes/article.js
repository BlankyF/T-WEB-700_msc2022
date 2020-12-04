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
        title = req.query.title;
        db.query('SELECT * FROM Article WHERE title LIKE "%" \''+title+'\'%', function(err,result){
            console.log('SELECT * FROM Article WHERE title LIKE "%" \''+title+'\'%')
            console.log("result "+result);
            res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});


//get article by ID (USER + UNAUTHENTIFIED)
router.get('/:id', async function(req,res) {
    try{
        console.log(req.query);
        id = req.params.id;
        console.log(id);
        db.query('SELECT * FROM Article WHERE Article.id = \''+id+'\'', function(err,result){
            console.log('SELECT * FROM Article WHERE Article.id = \''+id+'\'')
            console.log("result "+result);
            res.status(200).json(result);
        })
    }catch{
        res.sendStatus(500);
    }
});

module.exports = router;