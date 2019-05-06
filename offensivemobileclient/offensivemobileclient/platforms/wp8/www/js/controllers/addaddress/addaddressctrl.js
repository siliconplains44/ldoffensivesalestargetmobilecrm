angular.module('offensiveapp')
    .controller('addaddresscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formnamerequired = false;
            $scope.formline1required = false;
            $scope.formcityrequired = false;
            $scope.formstaterequired = false;
            $scope.formcountryrequired = false;
            $scope.formziprequired = false;

            $scope.onCreateAddress = function () {
                var name = $scope.$$childHead.name;
                var line1 = $scope.$$childHead.line1;
                var line2 = $scope.$$childHead.line2;
                var city = $scope.$$childHead.city;
                var state = $scope.$$childHead.state;
                var zip = $scope.$$childHead.zip;
                var country = $scope.$$childHead.country;
                var type = $scope.$$childHead.type;

                var isvalid = true;

                if (name == undefined) {
                    $scope.formnamerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (line1 == undefined) {
                    $scope.formline1required = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (city == undefined) {
                    $scope.formcityrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (state == undefined) {
                    $scope.formstaterequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (zip == undefined) {
                    $scope.formziprequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (country == undefined) {
                    $scope.formcountryrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

               
                businessObjectsService.addAddress($stateParams.params.type, $stateParams.params.id, name,
                    line1, line2, city, state, zip, country, type, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Address has been added!'
                        });
                    });
                
            };

        }]);