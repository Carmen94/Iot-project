var express = require('express');
var router = express.Router();
var async = require('async');
//Own modules
var dynamoTable = require('../keyvalue.js');

var airsense= new dynamoTable('airsense');
airsense.init(function(){
  console.log("Aisense starting...");
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Express' });
});

router.post('/login',function(req,res){
  console.log("login");
  res.render('main',{username:"Carmen"});
})

router.get('/search/:id',function(req,res){
  var id = req.params.id;
  console.log('search/'+id);
  var sensorData = new Array(); 
  var queryID = function(callback){
    airsense.query(id,function(err,data){
      if (err) {
        console.log("Error in query app.js: "+err);
      } else if (data == null) {
        console.log("No results");    
      } else {       
       
          sensorData.push(data);     
            callback(undefined, sensorData);
      }
    });
  }
  queryID(function(err,queryRes){
    if(err){
      res.send(JSON.stringify({"Error":err}));      
    }else{
      res.send(JSON.stringify({"Data":queryRes}));      
    }
  });
});

module.exports = router;
