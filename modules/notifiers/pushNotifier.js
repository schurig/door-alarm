var push = require( 'pushover-notifications');

var sendPushes = function sendPushes(devices, time) {

  var preparedPushes = [];
  var msg = {
    message: 'at ' + time,
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

module.exports = sendPushes;