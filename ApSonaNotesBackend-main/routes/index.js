var express = require('express');

var router = express.Router();
const userModel = require("./../models/User");


router.get('/in', function(req, res, next){
   res.render('index', { title: 'Express'});
});