const  AWS = require("aws-sdk");
AWS.config.update({region: 'us-west-2'});
var sns = new AWS.SNS({apiVersion: '2010-03-31'});

var response;
exports.handler = function(e,context,callback) {
    console.log(e);
        var params = {
        Message: 'Alert!!: contaminant levels are high :(' , 
        TopicArn: 'arn:aws:sns:us-west-2:295736415503:Airsense'
    };
    console.log(e.UserID+'This id the user')
    if(e.Contaminant != null){
     sns.publish(params, function(err, data) {
      if (err){
            console.log(err, err.stack); // an error occurred
            response = {
                statusCode: 200,
                body: JSON.stringify(err)
            };          
      } 
      else {
          console.log(data);           // successful response       
          response = {
                statusCode: 200,
                body: JSON.stringify(data)
            };
      }  
      });
        return response;
    }
};

