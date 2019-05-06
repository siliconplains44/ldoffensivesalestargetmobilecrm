var ModuleInteractionsService = angular.module('offensiveapp')

ModuleInteractionsService.factory('ModuleInteractionsId',
    ['$http',
        function ($http) {

            var urlBase = 'http://localhost:2307/Service1.svc';
            var ModuleInteractionsService = {};

            ModuleInteractionsService.getData = function () {
                return $http.get(urlBase+'/GetData');
            };

            ModuleInteractionsService.addData = function (data) {
                return $http.post(urlBase + '/AddData', data);
            };

            return ModuleInteractionsService;

        }]);