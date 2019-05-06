var LoggingService = angular.module('offensiveapp')

LoggingService.factory('LoggingServiceId',
    ['$http',
        function ($http) {

            var urlBase = 'http://localhost:2307/Service1.svc';
            var LoggingService = {};

            LoggingService.getData = function () {
                return $http.get(urlBase+'/GetData');
            };

            LoggingService.addData = function (data) {
                return $http.post(urlBase + '/AddData', data);
            };

            return LoggingService;

        }]);
