var express = require('express');
var router = express.Router();
var dynamoTable = require('./keyvalue.js');

var airsense;
var users;

function dboperations() { 
    airsense= new dynamoTable('airsense');
    users= new dynamoTable('users');
};

dboperations.prototype.GetUserInformation = function(email,callback){   
    users.init(function(){
        console.log("Checking user...");      
    });
    users.userLogin(email,function(err,data){
        if(err){
            callback(err);
        }
        callback(null,data);
    });  
}

dboperations.prototype.GetContaminants = function(){
    airsense.init(function(){
        console.log("Aisense starting...");
    });
    customerID = global.customerID;
    airsense.queryAirsense(customerID,function(err,data){
        if (err) {
        console.log("Error in query dboperation.js: "+err);
        } else if (data == null) {
        console.log("No results");    
        } else {                  
            data.forEach(function(element) {     
            switch(element.Type){
                case "Ammonia":
                ammonia=parseInt(element.Value);
                break;
                case "Propane":
                propane=parseInt(element.Value);
                break;
                case "Hydrogen":
                ammonia=parseInt(element.Value);
                break;
                case "Methane":
                ammonia=parseInt(element.Value);
                break;
                case "Oxygen":
                ammonia=parseInt(element.Value);
                break;
                case "Propane":
                propane=parseInt(element.Value);
                break;
            }            
            });  
            global.contaminantsArray = [0,0,0,ammonia,0,propane]; 
            console.log(global.contaminantsArray);
        }
    });
}


  module.exports = dboperations;