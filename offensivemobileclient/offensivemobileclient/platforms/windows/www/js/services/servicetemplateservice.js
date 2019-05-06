var ServiceTemplateService = angular.module('offensiveapp')

ServiceTemplateService.factory('ServiceTemplateServiceId',
    ['$http',
        function ($http) {

            var urlBase = 'http://localhost:2307/Service1.svc';
            var ServiceTemplateService = {};

            ServiceTemplateService.getData = function () {
                return $http.get(urlBase+'/GetData');
            };

            ServiceTemplateService.addData = function (data) {
                return $http.post(urlBase + '/AddData', data);
            };

            return ServiceTemplateService;

        }]);
