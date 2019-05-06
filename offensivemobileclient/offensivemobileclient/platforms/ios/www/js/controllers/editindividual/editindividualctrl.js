angular.module('offensiveapp')
    .controller('editindividualcontroller', ['$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $http, $state, $stateParams, $ionicPopup, $location, authenticationService, applicationService, teamsService, businessObjectsService) {

            $scope.formlastnamerequired = false;
            $scope.formfirstnamerequired = false;

            var individualID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveIndividualsWithFilter(individualID, null, null, function (data) {
                $scope.$$childHead.lastname = data.outData.individuals[0].LastName;
                $scope.$$childHead.middlename = data.outData.individuals[0].MiddleName;
                $scope.$$childHead.firstname = data.outData.individuals[0].FirstName;
                $scope.$$childHead.birthday = data.outData.individuals[0].Birthday;
                $scope.$apply();
            });

            $scope.onEditIndividual = function () {
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

                businessObjectsService.modifyIndividual(parseInt(individualID), lastname, middlename, firstname, birthday, $stateParams.params.type,
                    $stateParams.params.id, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Individual has been edited!'
                        });
                    });

            };

        }]);