angular.module('offensiveapp')
    .controller('editaddresscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formnamerequired = false;
            $scope.formline1required = false;
            $scope.formcityrequired = false;
            $scope.formstaterequired = false;
            $scope.formcountryrequired = false;
            $scope.formziprequired = false;

            var addressID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveAddressesWithFilter(parseInt(addressID), null, null, function (data) {
                $scope.$$childHead.name = data.outData.addresses[0].Name;
                $scope.$$childHead.line1 = data.outData.addresses[0].Line1;
                $scope.$$childHead.line2 = data.outData.addresses[0].Line2;
                $scope.$$childHead.city = data.outData.addresses[0].City;
                $scope.$$childHead.state = data.outData.addresses[0].State;
                $scope.$$childHead.zip = data.outData.addresses[0].Zip;
                $scope.$$childHead.country = data.outData.addresses[0].Country;
                $scope.$$childHead.type = data.outData.addresses[0].Type;
            });

            $scope.onModifyAddress = function () {
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


                businessObjectsService.modifyAddress(parseInt(addressID), $stateParams.params.type, $stateParams.params.id, name,
                    line1, line2, city, state, zip, country, type, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Address has been edited!'
                        });
                    });
            };

        }]);