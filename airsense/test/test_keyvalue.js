const assert = require('assert');
const keyvalue = require('../keyvalue.js');

var kv = new keyvalue("airsense");

//Test creation of object
it('Should create table object.', () => {
    assert.equal(keyvalue("airsense"), true);
}); 

//Test initialize
it('Should return ACTIVE from AWS.', () => {
    kv.init(function(){
        assert.equal(kv.init, "ACTIVE");
    });  
}); 

//Test Query to airsense table in Dynamo
it('Should return error message with wrong customer ID.', () => {   
    var result = kv.queryAirsense("0000",
    function(err,data){
        console.log("");
        assert.equal(result,"Error in query");   
    });  
}); 

//Test Query to airsense table in Dynamo
it('Should return Json with valid customer ID.', () => {   
    var result = kv.queryAirsense("00",
        function(err,data){
            console.log("");
            assert.notEqual(result,"Error in query");   
        });  
});

//Test Query to users table in Dynamo
it('Should validate that user exists in Dynamo by email.', () => {   
    var result = kv.userLogin("karumen1994@hotmail.com",
    function(err,data){
        console.log("");
        assert.notEqual(result,"User not found");   
    });  
}); 

it('Should validate that user does not exists in Dynamo by email.', () => {   
    var result = kv.userLogin("ThisEmailDoesNotExist@hotmail.com",
    function(err,data){
        console.log("");
        assert.equal(result,"User not found");   
    });  
}); 