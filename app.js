var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var push = require( 'pushover-notifications' );
var platform = require('os').platform;
var exec = require('child_process').exec;
var app = express();
var auth = require('http-auth');

var basic = auth.basic({
  realm: 'Hi Martin!',
  file: __dirname + '/data/users.htpasswd'
});

app.use(auth.connect(basic));

var soundFile = __dirname + '/sounds/alarm.mp3';
var databaseFile = __dirname + '/data/data.json';
var databaseCache = false;

app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/api/settings', function(req, res) {
  res.send(databaseCache);
});

app.post('/api/settings', function(req, res) {
  if(!req.body) {
    res.send('no settings provided!');
    return false;
  }

  var settingsObj = req.body;
  fs.writeFile(databaseFile, JSON.stringify(settingsObj), function (err) {
    if (err) throw err;
    databaseCache = JSON.stringify(settingsObj);
    res.send('saved!');
  });
});

// Door actions
app.post('/opened', function(req, res) {
  if(!validateKey(req.body.key)) {
    res.send('not valid!');
    return false;
  }

  if (getSettings().alarm) {
    if (getSettings().sound) { playSound(); }
    if (getSettings().email) { sendEmail(); }
    if (getSettings().pushes) { sendPushes(); }
  }

  console.log('Door opened!');
  res.send('1337');
});

app.post('/closed', function(req, res) {
  if(!validateKey(req.body.key)) {
    res.send('not valid!');
    return false;
  }

  console.log('Door closed!');
  res.send('1337');
});


// Functions
var initDatabase = function initDatabase() {
  fs.readFile(databaseFile, 'utf8', function (err, data) {
    if (err) {
      console.log('cant read file somehow');
      console.log(error);
      throw err;
    }
    databaseCache = data;
  });
};

var getCurrentTime = function getCurrentTime() {
  return moment().format('DD.MM.YYYY, hh:mm:ss');
};

var getSettings = function getSettings() {
  return JSON.parse(databaseCache).settings;
};

var validateKey = function validateKey(key) {
  if(key == 'xxxxxxxxxxxxxxCHANGEME_EVERYWHERExxxxxxxxxxxxxxxxxxxxx') {
    return true;
  }
  return false;
};

var playSound = function playSound() {
  if(platform() == 'linux') {
    exec("omxplayer " + soundFile, function (error) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  } else if(platform() == 'darwin') {
    exec("say \"Door opened!\"", function (error) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
  }
};

var sendEmail = function sendEmail() {
  var emails = getSettings().emails;
  console.log('lets send some emails!');
};

var sendPushes = function sendPushes() {
  var devices = getSettings().devices;

  var preparedPushes = [];
  var msg = {
    message: 'at ' + getCurrentTime(),
    title: "Door Opened",
    sound: 'magic',
    priority: 1
  };

  for (i = 0; i < devices.length; i++) {
    preparedPushes[i] = new push( {
      user: devices[i].user,
      token: devices[i].token
    });
  }

  for (i = 0; i < preparedPushes.length; i++) {
    preparedPushes[i].send(msg, function(err, result) {
      if ( err ) {
        throw err;
      }

      console.log( result );
    });
  }
};

var server = app.listen(80, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

initDatabase();