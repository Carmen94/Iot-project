var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var mssql = require('mssql');
var jsonSql = require('json-sql');
var db = new AWS.DynamoDB();

var Connection = require('tedious').Connection;  
  