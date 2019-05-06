var AttachmentsService = angular.module('offensiveapp')

AttachmentsService.factory('AttachmentsServiceId',
    ['$http',
        function ($http) {

            var urlBase = 'http://localhost:2307/Service1.svc';
            var AttachmentsService = {};

            AttachmentsService.getData = function () {
                return $http.get(urlBase+'/GetData');
            };

            AttachmentsService.addData = function (data) {
                return $http.post(urlBase + '/AddData', data);
            };

            return AttachmentsService;

        }]);
