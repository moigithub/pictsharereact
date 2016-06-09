'use strict';
/*
require('babel-register')({
    presets: ['es2015']  //, 'react'
})
*/
var compression = require('compression');
//var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var http = require('http');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');


var app = express();
app.use(compression()); //enable gzip compressoin

var isDeveloping = process.env.NODE_ENV !== 'production';
//console.log("env",process.env.NODE_ENV, isDeveloping);

if(isDeveloping){
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true
  };  
  require('dotenv').config();

  var webpack = require('webpack');
  var webpackConfig =require('../webpack.config.js');
  //import webpack from 'webpack';  
  var webpackMiddleware =require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var compiler = webpack(webpackConfig);
  
  app.use(webpackMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
//      hot: true,
  }));
  
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
  
  // populate DB
  //require('./seed');
}// end isDeveloping



var config={
  mongo:{
    options:{
      db:{safe:true}
    },
    uri : process.env.MONGO_URI || 'mongodb://localhost/picreact'
  },
  secret:'supers3cretpassw0rd.dont.tell,any1'
};

/// connect to db
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err){
  console.error("error connecting to the DB "+ err);
  process.exit(-1);
});

/////////////////

// middlewares

app.use(express.static(path.resolve(path.join(__dirname,".."), 'public'))); // this above session/cookie middlewares prevent create for static files
app.use(favicon(__dirname+'/../public/favicon.ico'));



app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({mongooseConnection: mongoose.connection, db: 'picreact'})
}));



//form process
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride());

// request logger
app.use(morgan('dev'));


/// passport
app.use(passport.initialize());
app.use(passport.session());

////////////////************* end passport


///////////// routes


//// CORS
/*
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        return res.end();
    }
    next();
});
*/

// api 
//app.use('/api/books', require('./api/books'));
//app.use('/api/places', require('./api/places'));

  app.use('/api/images', require('./api/images'));
  app.use('/api/users', require('./api/users'));
  app.use('/auth', require('./api/auth'));

/*
// all undefined asset or api routes should return 404 (from yeoman code)
app.route('/:url(api|auth|components)/*').get(function(req,res){
  console.log("herer url regex");
  return res.status(404).json({status:404});
});

*/

//all others resources should redirect to the index.html

app.route('*').get(function(req,res){
  res.sendFile(path.resolve(path.join(__dirname, '../public')+'/index.html'));
});



/*
app.use(function(req, res){
   res.sendStatus(404);
});
*/

var server = http.createServer(app);
//var io = require('socket.io')(server);

server.listen(""+process.env.PORT || "3000", process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});


//////////////////////// socket.io
/*
var Stocks = require('./api/stocks/stocks_model');
function registerSocket(socket){
  Stocks.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Stocks.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  console.log("emiting save");
  socket.emit('save', doc);
}

function onRemove(socket, doc, cb) {
  console.log("emiting remove");
  socket.emit('remove', doc);
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  
  registerSocket(socket);
});

*/