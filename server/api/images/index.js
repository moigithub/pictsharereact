'use strict';

var express = require('express');
var router = express.Router();
var Images = require('./images.model');

// all images
router.get('/', function(req, res) {
    Images.find(function (err, images) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(images);
    });
});


// images by user
router.get('/user/:id', function(req, res) {
    Images.find({userId: req.params.id}, function (err, images) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(images);
    });
});


// create new images
router.post('/', function(req, res) {
    console.log("post image create",req.body);
    Images.create(req.body, function(err, images) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(images);
    });
});


// Deletes image
router.delete('/:id', function(req, res) {
  Images.findById(req.params.id, function (err, images) {
    if(err) { return handleError(res, err); }
    if(!images) { return res.status(404).send('Not Found'); }
    images.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
});


function handleError(res, err) {
  return res.status(500).send(err);
}

module.exports = router;