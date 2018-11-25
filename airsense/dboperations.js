var express = require('express');
var dynamoTable = require('./keyvalue.js');

var airsense;
var users;

const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
var ammonium= new Array(), co=new Array(),co2=new Array(),benzene= new Array(),toluene=new Array(),phenol = new Array();
var ammoniumOut= new Array(), coOut=new Array(),co2Out=new Array(),benzeneOut= new Array(),tolueneOut=new Array(),phenolOut = new Array();

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
    outsideID="02"
    // console.log(customerID);
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
            global.co2=co2Avg;
            global.insideContaminants = [ammoniumAvg,coAvg,benzeneAvg,tolueneAvg,phenolAvg]; 
            console.log(global.insideContaminants);
            callback();
        }
    });
    airsense.queryAirsense(outsideID,function(err,data){
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
                ammoniumOut.push(parseInt(element.Value));
                break;
                case "Carbon_monoxide":
                coOut.push(parseInt(element.Value));
                break;
                case "Carbon_dioxide":
                co2Out.push(parseInt(element.Value));
                break;
                case "Benzene":
                benzeneOut.push(parseInt(element.Value));
                break;
                case "Toluene":
                tolueneOut.push(parseInt(element.Value));
                break;
                case "Phenol":
                phenolOut.push(parseInt(element.Value));
                break;
            }            
            });  
            var ammoniumAvgOut=average(ammoniumOut);
            var coAvgOut=average(coOut);
            // var co2AvgOut=average(co2);
            var benzeneAvgOut=average(benzeneOut);
            var tolueneAvgOut=average(tolueneOut);
            var phenolAvgOut=average(phenolOut);          
            global.outsideContaminants = [ammoniumAvgOut,coAvgOut,benzeneAvgOut,tolueneAvgOut,phenolAvgOut]; 
            console.log(global.outsideContaminants);
            callback();
        }
    });
}


  module.exports = dboperations;