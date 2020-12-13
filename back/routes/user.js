var express = require('express');
var router = express.Router();
var db = require('../db');
var bodyParser = require('body-parser');
var sql = require("mssql");
var sha256 = require("sha256");
var jwtUtils = require('../utils/jwt.utils');
const { token } = require('morgan');

router.use(bodyParser.json());

router.post('/register', async function (req, res) {
    try {
        var username = req.body.username;
        var password = req.body.password;
        var mail = req.body.mail;

        if( username == null || password == null){
            return res.status(400).json({ 'error': 'missing parameters'});
        }

        await getUser(async function(data){
            await data.forEach(element => {
                if(req.body.username == element.username){
                    return res.status(401).json({'error':'user already exists'});
                } 
            });
            let param = [mail,username,sha256(password),2];
            db.query('INSERT INTO User (mail,username,password,role) values (?,?,?,?)',param,function(err,result){
                if(err){ console.log("Erreur INSERT:"+err); }else { console.log("Insert ok"); }
            });
            return res.status(200).json({'message':'Success'});
        });

    } catch (err) {
        res.sendStatus(500);
    }
});

router.post('/login', async function (req, res) {
    try {
        let erreur;
        let id;
        let cptUser = 0;
        let cptPassword = 0;
        if(req.body.username != null && req.body.password != null){
            await getUser(async function(data){
                await data.forEach(element => {
                    console.log(req.body.username);
                    console.log(element.username);
                    console.log(req.body.username == element.username);
                    if(req.body.username == element.username){
                        console.log("je passe user = user");
                        cptUser = 1;
                        if(sha256(req.body.password) == element.password){
                            cptPassword = 1;
                            id = element.id;
                        }else{
                            erreur = "mot de passe incorrect";
                        }
                    }else{
                        erreur = "utilisateur introuvable";
                    }
                });
                if(cptPassword == 1 && cptUser == 1){
                    let token = jwtUtils.generateTokenForUser(id);
                    db.query('UPDATE User SET token = \'' + token + '\' WHERE User.id =\''+id+'\'', function(err,result){
                        if(err){ console.log("Erreur INSERT:"+err); }else { console.log("Insert ok"); }
                    });
                    res.status(200).json({
                        'response' : 'Connexion',
                        'token' : token
                    });
                }
                else if(cptUser == 1 && cptPassword == 0) {
                    erreur = "Mot de passe incorrect";
                    res.json(erreur);
                }else {
                    erreur = "Utilisateur introuvable";
                    res.json(erreur);
                }
                    
            });

        }
        else
        {
            res.json(erreur);
        }
        
    } catch(err) {
        res.sendStatus(500);
    }
});

router.post('/logout',async function(req, res) {
    try{
        let token = req.body.token;
        let userId = jwtUtils.getUserId(token);
        db.query('UPDATE User SET token = \''+null+'\' WHERE User.id = \''+userId+'\'', function(err,result){
            if(err){ console.log("Erreur Delete:"+err); }else { console.log("Delete ok"); }
        });
        res.status(200).json({
            'response' : 'Logout Ok',
        });
    } catch(err){        
        res.sendStatus(500);
    }
});

router.get('/profile', async function(req,res) {
    try{
        var results = {};
        let token = req.query.token;
        let userId = jwtUtils.getUserId(token);
        db.query('SELECT * FROM User WHERE User.id = \''+userId+'\'', function(err,result){
            results.user = result;
            db.query('SELECT Crypto.id, Crypto.cryptoName FROM Crypto INNER JOIN Preference on Crypto.id = Preference.cryptoId WHERE Preference.userId = \''+userId+'\'', function(err,result){
                results.crypto = result;
                db.query('SELECT keyword FROM KeywordPreference WHERE userId = \''+userId+'\'',function(err, result){
                    results.keyword=result;
                    res.status(200).json(results); 
                });
            });
        });
    }catch{
        res.sendStatus(500);
    }
});

router.put('/profile', async function(req,res) {
    let token = req.body.token;
    let usernameModif = req.body.username;
    let password = req.body.password;
    let preferedCurrency = req.body.currency;
    let cryptoList = req.body.cryptoListId;
    let keywordList = req.body.keywordList;
    let userId = jwtUtils.getUserId(token);
    
    if(jwtUtils.verifToken(token)){
        await getUser(async function(data){
            await data.forEach(element => {
                if(req.body.username == element.username && element.id != userId){
                    return res.status(401).json({'error':'user already exists'});
                } 
            });
        });
        db.query('UPDATE User SET username=\''+ usernameModif +'\', password=\''+ password +'\', preferedCurrency=\'' + preferedCurrency + '\' WHERE User.id = \''+userId+'\'', function(err,result){
        });
        db.query('SELECT cryptoId FROM Preference WHERE Preference.userId = \''+userId+'\'', function(err,prefs){
            if(prefs == ''){
                cryptoList.forEach(crypto => {
                    console.log(crypto);
                    params=[userId,crypto];
                    db.query('INSERT INTO Preference (userId,cryptoId) Values (?,?)',params, function(err,result){
                        
                    });
                }); 
            }else {
                db.query('DELETE FROM Preference WHERE userId = \''+ userId +'\'', function (err,result){ 
                    cryptoList.forEach(crypto => {
                        param = [userId,crypto];
                        console.log(param);
                        db.query('INSERT INTO Preference (userId,cryptoId) VALUES (?,?)',param,function(err,result){
                            
                        });
                    });
                });
            }
        });
        db.query('SELECT keywordId FROM KeywordPreference WHERE userId = \''+userId+'\'', function(err,keywords){
            if(keywords == ''){
                keywordList.forEach(keyword => {
                    console.log(keyword);
                    params=[userId,keyword];
                    db.query('INSERT INTO KeywordPreference (userId,keyword) Values (?,?)',params, function(err,result){
                        
                    });
                }); 
            }else {
                db.query('DELETE FROM KeywordPreference WHERE userId = \''+ userId +'\'', function (err,result){ 
                    keywordList.forEach(keyword => {
                        params = [userId,keyword];
                        console.log(params);
                        db.query('INSERT INTO KeywordPreference (userId,keyword) Values (?,?)',params,function(err,result){
                            
                        });
                    });
                });
            }
        });
        res.status(200).json("Modify succeded");
    }else{
        console.log(jwtUtils.verify(token));
    }
        
});


async function getUser(callback){
    let result="";
        db.query("SELECT id,username,password FROM User",function(err, result){
            if(err) console.log(err)
            result = JSON.parse(JSON.stringify(result));
            callback(result);
        });
}

module.exports = router;