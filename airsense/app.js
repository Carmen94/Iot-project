var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

global.customerID="00";
global.customerName="Carmen";
global.customerEmail="karumen1994@hotmail.com";
var co2;
var co;
var phenol;
var ammonia;
var tolulene;
var propane;

// global.contaminantsArray = [6,7,8,10,0,0];
global.historicsArray=[3.5,2,9,0,2,0];
global.newArray=[7,7,7,7,7,8];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

var dynamoTable = require('./keyvalue.js');

var airsense= new dynamoTable('airsense');
airsense.init(function(){
  console.log("Aisense starting...");
});

customerID = global.customerID;
console.log("Here");
  airsense.query(customerID,function(err,data){
    if (err) {
      console.log("Error in query app.js: "+err);
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
