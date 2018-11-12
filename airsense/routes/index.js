var express = require('express');
var router = express.Router();
var async = require('async');
//Own modules
var dynamoTable = require('../keyvalue.js');

// var airsense= new dynamoTable('airsense');
// airsense.init(function(){
//   console.log("Aisense starting...");
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Airsense' });
});

router.get('/dashboard', function(req, res, next) {  
  res.render('dashboard', { title: global.customerName+"'s dashboard",
                            array:global.contaminantsArray,
                            arrayLabels:global.contaminantsLabels,
                            array1:global.historicsArray,
                            array2:global.newArray
                          });
});

router.get('/main', function(req, res, next) { 
  res.render('main',{ username: global.customerName,
                      email:global.customerEmail            
            });
});

router.post('/login',function(req,res){
  console.log("login");
  res.render('main',{username: global.customerName,
    email: global.customerEmail});
})

router.get('/search/:id',function(req,res){
  customerID = req.params.id;
  console.log('search/'+id);
  var sensorData = new Array(); 
  var queryID = function(callback){
    airsense.query(customerID,function(err,data){
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
