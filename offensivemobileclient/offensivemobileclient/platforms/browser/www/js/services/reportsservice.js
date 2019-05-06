var ReportsService = angular.module('offensiveapp')

ReportsService.factory('ReportsServiceId',
    ['$http',
        function ($http) {

            var urlBase = 'http://localhost:2307/Service1.svc';
            var ReportsService = {};

            ReportsService.getData = function () {
                return $http.get(urlBase+'/GetData');
            };

            ReportsService.addData = function (data) {
                return $http.post(urlBase + '/AddData', data);
            };

            return ReportsService;

        }]);
