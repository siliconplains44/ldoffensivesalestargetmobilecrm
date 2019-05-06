var utilityService = angular.module('offensiveapp')

utilityService.factory('utilityservice',
    ['$http',
        function ($http) {

            var baseUrl = "https://offensiveapi.leoparddata.com:50020";
            var webserviceusername = "wearesuperswiftandfast";
            var webservicepassword = "!@)($%6al;asdfkl;j;ekaii3$$#2ljl;asdlj(";

            var eProbable = 1;
            var ePropect = 2;
            var eLead = 3;
            var eOpportunity = 4;
            var eAccount = 5;
            var eInactive = 6;

            var baseMarketingUrl = "https://marketingapi.leoparddata.com:50016";

            var service = "Sales Target";
            var versionMajor = 2016;
            var versionMinor = 1;

            var utilityService = {};

            utilityService.buildObjectToSend = function () {
                var objectToSend = {};

                objectToSend.apiusername = webserviceusername;
                objectToSend.apipassword = webservicepassword;

                return objectToSend;
            };

            utilityService.baseUrl = baseUrl;
            utilityService.baseMarketingUrl = baseMarketingUrl;
            utilityService.Service = service;
            utilityService.VersionMajor = versionMajor;
            utilityService.VersionMinor = versionMinor;

            utilityService.eProbable = eProbable;
            utilityService.ePropect = ePropect;
            utilityService.eLead = eLead;
            utilityService.eOpportunity = eOpportunity;
            utilityService.eAccount = eAccount;
            utilityService.eInactive = eInactive;

            return utilityService;

        }]);
