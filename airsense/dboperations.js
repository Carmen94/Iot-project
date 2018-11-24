var express = require('express');
var router = express.Router();
var dynamoTable = require('./keyvalue.js');

var airsense;
var users;

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
var ammonium= new Array(), co=new Array(),co2=new Array(),benzene= new Array(),toluene=new Array(),phenol = new Array();

function dboperations() { 
    airsense= new dynamoTable('airsense');
    users= new dynamoTable('users');
    return true;
};

dboperations.prototype.GetUserInformation = function(email,callback){   
    users.init(function(){
        console.log("Checking user...");
    });
    users.userLogin(email,function(err,data){
        if(err){
            callback("err");
        }
        callback(null,data);
    });  
}

dboperations.prototype.GetContaminants = function(callback){
    airsense.init(function(){
        console.log("Aisense starting...");
    });
    customerID = global.customerID;
    console.log(customerID);
    airsense.queryAirsense(customerID,function(err,data){
        if (err) {
            callback("Error in query dboperation.js.");
            // return "Error in query dboperation.js.";
        } else if (data == null) {
            // return "No results";  
            callback("No results");
        } else {                  
            data.forEach(function(element) {     
            switch(element.Type){
                case "Ammonium":
                ammonium.push(parseInt(element.Value));
                break;
                case "Carbon_monoxide":
                co.push(parseInt(element.Value));
                break;
                case "Carbon_dioxide":
                co2.push(parseInt(element.Value));
                break;
                case "Benzene":
                benzene.push(parseInt(element.Value));
                break;
                case "Toluene":
                toluene.push(parseInt(element.Value));
                break;
                case "Phenol":
                phenol.push(parseInt(element.Value));
                break;
            }            
            });  
            var ammoniumAvg=average(ammonium);
            var coAvg=average(co);
            var co2Avg=average(co2);
            var benzeneAvg=average(benzene);
            var tolueneAvg=average(toluene);
            var phenolAvg=average(phenol);

            global.contaminantsArray = [ammoniumAvg,coAvg,co2Avg,benzeneAvg,tolueneAvg,phenolAvg]; 
            console.log(global.contaminantsArray);
            callback();
        }
    });
}


  module.exports = dboperations;