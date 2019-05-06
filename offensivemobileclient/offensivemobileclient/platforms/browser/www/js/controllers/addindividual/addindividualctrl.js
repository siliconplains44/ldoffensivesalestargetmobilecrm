angular.module('offensiveapp')
    .controller('addindividualcontroller', ['$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $http, $state, $stateParams, $ionicPopup, $location, authenticationService, applicationService, teamsService, businessObjectsService) {

            $scope.formlastnamerequired = false;
            $scope.formfirstnamerequired = false;

            $scope.onCreateIndividual = function () {
                var lastname = $scope.$$childHead.lastname;
                var middlename = $scope.$$childHead.middlename;
                var firstname = $scope.$$childHead.firstname;
                var birthday = $scope.$$childHead.birthday;

                var isvalid = true;

                if (lastname == undefined) {
                    $scope.formlastnamerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (firstname == undefined) {
                    $scope.formfirstnamerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                businessObjectsService.addIndividual(lastname, middlename, firstname, birthday, $stateParams.params.type,
                    $stateParams.params.id, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Individual has been added!'
                        });
                });

            };

        }]);