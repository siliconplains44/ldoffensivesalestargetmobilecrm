angular.module('offensiveapp')
    .controller('editemailaddresscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formnumberrequired = false;

            var emailAddressID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveEmailAddressesWithFilter(parseInt(emailAddressID), null, null, function (data) {
                $scope.$$childHead.type = data.outData.emailaddresses[0].Type;
                $scope.$$childHead.address = data.outData.emailaddresses[0].Address;
            });

            $scope.onModifyEmailAddress = function () {
                var type = $scope.$$childHead.type;
                var address = $scope.$$childHead.address;

                var isvalid = true;

                if (address == undefined) {
                    $scope.formaddressrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }


                businessObjectsService.modifyEmailAddress(parseInt(emailAddressID), type, address, $stateParams.params.type, $stateParams.params.id,
                    function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Email Address has been edited!'
                        });
                    });
            };

        }]);