var handlesService = angular.module('offensiveapp')

handlesService.factory('handlesservice',
    ['$http', 'utilityservice',
        function ($http, utilityService) {

            var handlesService = {};

            handlesService.RetrieveHandle = function (securityUserId, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserId;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveHandle', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {                    
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            handlesService.UpdateHandle = function (securityUserId, handleName, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserId;
                objectToSend.handlename = handleName;

                var res = $http.post(utilityService.baseUrl + '/ajaj/UpdateHandle', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            return handlesService;

        }]);