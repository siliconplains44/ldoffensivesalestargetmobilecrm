angular.module('offensiveapp')
    .controller('editphonenumbercontroller', ['$scope', '$http', '$state', '$ionicPopup', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formnumberrequired = false;
           
            var phonenumberID = $location.$$path.split("/")[3];

            businessObjectsService.retrievePhoneNumbersWithFilter(parseInt(phonenumberID), null, null, function (data) {
                $scope.$$childHead.type = data.outData.phonenumbers[0].Type;
                $scope.$$childHead.number = data.outData.phonenumbers[0].Number;
            });

            $scope.onModifyPhonenumber = function () {
                var type = $scope.$$childHead.type;
                var number = $scope.$$childHead.number;
               
                var isvalid = true;

                if (number == undefined) {
                    $scope.formnumberrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }


                businessObjectsService.modifyPhoneNumber(parseInt(phonenumberID), type, number, $stateParams.params.type, $stateParams.params.id,
                    function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Phone Number has been edited!'
                        });
                    });
            };

        }]);