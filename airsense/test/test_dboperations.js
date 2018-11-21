const assert = require('assert');
const dboperations = require('../dboperations.js');

var localdboperations = new dboperations();

it('Should create dynamo tables.', () => {
  assert.equal(dboperations(), true);
}); 

//Test Get User Information
it('Should get user login info.', () => {
  var result = localdboperations.GetUserInformation("karumen1994@hotmail.com",
  function(err,data){     
      assert.notEqual(result,"err");   
  });  
}); 

it('Should get no error if user does not exist.', () => {
  var result = localdboperations.GetContaminants("0003",
  function(err,data){     
      assert.equal(result,"No results");   
  });  
}); 