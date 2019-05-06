var marketingService = angular.module('offensiveapp')

marketingService.factory('marketingservice',
    ['$http', 'utilityservice',
        function ($http, utilityService) {

            var marketingService = {};

            marketingService.sendAFrown = function (message, securityUserID, includeEmailAddress, emailAddress, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.Message = message;
                objectToSend.SecurityUserID = securityUserID;
                objectToSend.IncludeEmailAddress = includeEmailAddress;
                objectToSend.EmailAddress = emailAddress;
                objectToSend.Service = utilityService.Service;
                objectToSend.VersionMajor = utilityService.VersionMajor;
                objectToSend.VersionMinor = utilityService.VersionMinor;
                objectToSend.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');

                var res = $http.post(utilityService.baseMarketingUrl + '/ajaj/LogFrown', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {                    
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            marketingService.sendASmile = function (message, securityUserID, includeEmailAddress, emailAddress, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.Message = message;
                objectToSend.SecurityUserID = securityUserID;
                objectToSend.IncludeEmailAddress = includeEmailAddress;
                objectToSend.EmailAddress = emailAddress;
                objectToSend.Service = utilityService.Service;
                objectToSend.VersionMajor = utilityService.VersionMajor;
                objectToSend.VersionMinor = utilityService.VersionMinor;
                objectToSend.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');

                var res = $http.post(utilityService.baseMarketingUrl + '/ajaj/LogSmile', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            marketingService.reportABug = function (report, securityUserID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.Report = report
                objectToSend.SecurityUserID = securityUserID
                objectToSend.Service = utilityService.Service;
                objectToSend.VersionMajor = utilityService.VersionMajor;
                objectToSend.VersionMinor = utilityService.VersionMinor;

                var res = $http.post(utilityService.baseMarketingUrl + '/ajaj/LogBug', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            return marketingService;

        }]);
