angular.module('door.alarm')
  .factory('settingService', function($http) {
    function all() {
      return $http.get('/api/settings').then(function(settingsReponse) {
       return settingsReponse.data.settings;
      });
    }
    function update(settings) {
      return $http.post('/api/settings', { settings: settings }).then(function(settingsReponse) {
        return settingsReponse.data.settings;
      });
    }

    return {
      all: all,
      update: update
    };
  });
