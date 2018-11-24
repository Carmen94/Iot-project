const  AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
var table = 'airsense';


exports.handler = function(e,context,callback) {

  var params = {
    TableName: table,
    Item: {
    "UserID": e.UserID,
    "Timestamp": Date.now().toString(),
    "Type": e.Type,
    "Value":e.Value
    }     
  };

  docClient.put(params, function(err, data) {
    if (err) {
      callback(err,null);
    }
    else {
      callback(null,data);
    }
  });
};

