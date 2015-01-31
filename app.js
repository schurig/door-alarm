var gpio = require('pi-gpio'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'),
    moment = require('moment'),
    auth = require('http-auth'),
    notifiers = require('./modules/notifiers');


var settings = {
  pin: 12,
  delay: 1000,
  doorClosed: true
};

var app = express();
var basic = auth.basic({
  realm: 'Hi Martin!',
  file: __dirname + '/data/users.htpasswd'
});

app.use(bodyParser());
app.use(auth.connect(basic));

var soundFile = __dirname + '/sounds/alarm.mp3';
var databaseFile = __dirname + '/data/data.json';
var databaseCache = false;

app.use(express.static(__dirname + '/public'));




var doorInit = function init() {
  gpio.open(settings.pin, "input pullup", function(err) {
    if(err) {
      if(err.code == 4) {
        gpio.close(settings.pin);
        doorInit();
        return false;
      } else { throw err; }
    } doorCheck();
  });
};

var doorCheck = function check() {
  gpio.read(settings.pin, function(err, value) {
    if(settings.doorClosed != value) {
      settings.doorClosed = value;
      if(settings.doorClosed) {
        console.log('door closed');
      } else {
        if (getSettings().alarm) {
          if (getSettings().sound) {
            notifiers.playSound(soundFile);
          }
          if (getSettings().email) {
            notifiers.sendEmails(getSettings().emails, getCurrentTime());
          }
          if (getSettings().pushes) {
            notifiers.sendPushes(getSettings().devices, getCurrentTime());
          }
        }
        console.log('Door opened!');
      }
    }
  }); setTimeout(doorCheck, settings.delay);
};

doorInit();

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

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Door-Alarm app is listening at http://%s:%s', host, port);
});

initDatabase();
