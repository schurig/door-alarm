angular.module('door.alarm')
  .controller('settingsController', function($scope, settingService) {

    settingService.all().then(function(settings) {
      $scope.settings = settings;
    }, function(error) {
      console.log('failed to load settings');
    });

    $scope.update = function saveSettings() {
      settingService.update($scope.settings).then(function() {
        console.log('saved settings');
      }, function(error) {
        console.log('failed to save settings :(');
      });
    };

    $scope.removeEmail = function removeEmail(index) {
      $scope.settings.emails.splice(index, 1);
      $scope.update();
    };

    $scope.pushEmail = function pushEmail() {
      if(!$scope.tmp || !$scope.tmp.newEmail) { return; }

      var duplicates = $scope.settings.emails.filter(function(email) {
        return email == $scope.tmp.newEmail;
      });

      if(duplicates.length > 0) {
        $scope.tmp.newEmail = '';
        return;
      }

      $scope.settings.emails.push($scope.tmp.newEmail);
      $scope.update();

      $scope.tmp.newEmail = '';
    };

    ////////////////////

    $scope.removeDevice = function removeDevice(index) {
      $scope.settings.devices.splice(index, 1);
      $scope.update();
    };

    $scope.pushDevice = function pushDevice() {
      if(!$scope.tmp || !$scope.tmp.newDevice) { return; }

      console.log($scope.settings.devices);
      $scope.settings.devices.push($scope.tmp.newDevice);
      $scope.update();

      $scope.tmp.newDevice = {};
    };
  });
