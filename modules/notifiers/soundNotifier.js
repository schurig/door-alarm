var platform = require('os').platform,
    exec = require('child_process').exec;

var playSound = function playSound(soundFile) {
  if(platform() == 'linux') {
    exec("omxplayer " + soundFile, function (error) {
      if (error !== null) { console.log('exec error: ' + error); }
    });
  } else { console.log('not on linux'); }
};

module.exports = playSound;