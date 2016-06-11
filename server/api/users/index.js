'use strict';

var express = require('express');
import {isLoggedIn} from '../auth';

var router = express.Router();

router.get('/isLogged', function(req, res) {
    var msg = {logged: false},
        status=401;
    if (req.isAuthenticated()){
        msg= {logged: true};
        status=200;
    }
    return res.status(status).json(msg);
});

router.get('/',isLoggedIn, function(req, res) {
    //console.log("users req",req.user);
    return res.status(200).json(req.user);
});


module.exports = router;