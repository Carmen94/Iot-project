var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');


var db = new AWS.DynamoDB();

function keyvalue(table) { 
    this.tableName = table;
  };

keyvalue.prototype.init = function(whendone) {     
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

   /**
   * Get result(s) by key
   * 
   * @param search
   * 
   * Callback returns a list of objects with keys "inx" and "value"
   */  
  keyvalue.prototype.queryAirsense = function(search,callback,items) {                     
    var params = {       
    TableName : this.tableName,        
    KeyConditionExpression: "UserID = :UserID",          
    ExpressionAttributeValues: {
        ":UserID": {"S": search}
    }            
    }; 
    var items=[];
    db.query(params,function(err,data){            
        if (err) {
            console.error(err);
        } else {                        
            if(data.Count>0){                                     
                data.Items.forEach(function(item) {    
                    let i = {
                        "UserID":item.UserID.S,
                        "Timestamp": item.Timestamp.S,
                        "Type": item.Type.S,
                        "Value": item.Value.S
                    }                          
                    items.push(i);                            
                });               
            }                  
    }       
    callback(err,items); 
});   
};

keyvalue.prototype.userLogin = function(email,callback){
    var user;
    var params = {       
        TableName : this.tableName,        
        KeyConditionExpression: "email = :email",          
        ExpressionAttributeValues: {
            ":email": {"S": email}
        }            
        };      
        db.query(params,function(err,data){      
            if (err) {
                console.error(err);
            } else {                        
                if(data.Count>0){                                     
                    data.Items.forEach(function(item) {                            
                            user = {
                            "Email":item.email.S,
                            "Name": item.name.S,
                            "Password": item.password.S,
                            "UserID": item.userID.S
                        }                                                                   
                    });               
                }                  
                callback(err,user);
        }             
    });  
};


module.exports = keyvalue;