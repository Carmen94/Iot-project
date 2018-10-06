var express = require('express');
var router = express.Router();
var mssql = require('mssql');

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

module.exports = router;
