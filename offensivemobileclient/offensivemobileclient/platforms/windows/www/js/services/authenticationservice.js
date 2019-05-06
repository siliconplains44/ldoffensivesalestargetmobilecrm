var authenticationService = angular.module('offensiveapp');

authenticationService.factory('authenticationservice',
    ['$http', 'utilityservice', 'applicationservice',
        function ($http, utilityService, applicationService) {

            var authenticationService = {};

            authenticationService.loginUser = function (username, password, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.username = username;
                objectToSend.password = password;

                var res = $http.post(utilityService.baseUrl + '/ajaj/LoginSystemUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    if (data.outData.loginresult == true) {
                        applicationService.setLoggedInUserID(data.outData.securityuserid, function() {
                            cb(data);
                        });
                    }
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            return authenticationService;

        }]);

