var pushNotifier = require('./notifiers/pushNotifier');
var emailNotifier = require('./notifiers/emailNotifier');
var soundNotifier = require('./notifiers/soundNotifier');

module.exports = {
  sendPushes: pushNotifier,
  sendEmails: emailNotifier,
  playSound: soundNotifier
};