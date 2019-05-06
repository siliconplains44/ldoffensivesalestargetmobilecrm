var settingsService = angular.module('offensiveapp')

settingsService.factory('settingsservice',
    ['$http', 'utilityservice',
        function ($http, utilityService) {

            var settingsService = {};

            settingsService.GetSetting = function (settingName, defaultValue, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.settingname = settingName;

                var res = $http.post(utilityService.baseUrl + '/ajaj/GetSetting', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    if (data.outData.settingvalue == null) {
                        data = defaultValue;
                    }
                    else {
                        data = data.outData.settingvalue;
                    }
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            settingsService.SetSetting = function (settingName, settingValue, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.settingname = settingName;
                objectToSend.settingvalue = settingValue;

                var res = $http.post(utilityService.baseUrl + '/ajaj/SetSetting', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            return settingsService;

        }]);
