var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var db = new AWS.DynamoDB();

keyvaluestore.prototype.init = function(whendone) {     
    var self = this;
    var params = {
        TableName: this.tableName 
    };
    db.describeTable(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log("The table: "+data.Table.TableName+" is: "+data.Table.TableStatus);           // successful response
      });
    whendone();
  };