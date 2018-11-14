var express = require('express');
var router = express.Router();
//Own modules
// var dynamoTable = require('../keyvalue.js');
var DBOperation = require('../dboperations.js');
var db = new DBOperation();

/* GET Login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Airsense' });
});

router.get('/logout', function(req, res, next) {
  res.render('login', { title: 'Airsense' });
});

/* GET Dashboard page. */
router.get('/dashboard', function(req, res, next) {   
  res.render('dashboard', { title: global.customerName+"'s dashboard",
                            array:global.contaminantsArray,
                            arrayLabels:global.contaminantsLabels,
                            array1:global.historicsArray,
                            array2:global.newArray
                          });
});

// GET Main User Page
router.get('/main', function(req, res, next) { 
  res.render('main',{ username: global.customerName,
                      email:global.customerEmail            
            });
});

// POST on LOGIN action
router.post('/login',function(req,res){
  var username = req.body.username;
  var password = req.body.password; 
  if(username==""){
    res.render('error',{
      message: "Please enter your username"
    });
  }else{
    var userInfo = function(callback){
      db.GetUserInformation(username,function(err,data){    
        if (err) {
          console.log("Error in query app.js: "+err);
        } else if (data == null) {
          console.log("No results");    
        } else {
          callback(undefined, data);
        }
      });
    }
    userInfo(function(err,queryRes){
      if(err){
        console.log(err);
        res.render('error',{
          message: "User does not exist"
        });
      }else{        
        global.customerID=queryRes.UserID;
        global.customerName=queryRes.Name;
        global.customerEmail=queryRes.Email;     
        if(queryRes.Password==password){
          res.render('main',{
            username: global.customerName,
            email: global.customerEmail});
          }else{
          res.render('error',{
            message: "Wrong password or user"
          });
        }      
      }
    });
  }
});

// router.get('/search/:id',function(req,res){
//   customerID = req.params.id;
//   var sensorData = new Array(); 
//   var queryID = function(callback){
//     airsense.query(customerID,function(err,data){
//       if (err) {
//         console.log("Error in query app.js: "+err);
//       } else if (data == null) {
//         console.log("No results");    
//       } else {          
//           sensorData.push(data);     
//           callback(undefined, sensorData);
//       }
//     });
//   }
//   queryID(function(err,queryRes){
//     if(err){
//       res.send(JSON.stringify({"Error":err}));      
//     }else{
//       res.send(JSON.stringify({"Data":queryRes}));      
//     }
//   });
// });

module.exports = router;
