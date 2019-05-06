var SecurityService = angular.module('offensiveapp')

SecurityService.factory('SecurityServiceId',
    ['$http',
        function ($http) {

            var urlBase = 'http://localhost:2307/Service1.svc';
            var SecurityService = {};

            SecurityService.getData = function () {
                return $http.get(urlBase+'/GetData');
            };

            SecurityService.addData = function (data) {
                return $http.post(urlBase + '/AddData', data);
            };

            return SecurityService;

        }]);
