angular.module('offensiveapp')
    .controller('salestargetindividualscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, businessObjectsService) {

            var salesTargetID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveSalesTargetsWithFilter(parseInt(salesTargetID), null, null, null, function (data) {
                $scope.currentSalesTarget = data.outData.salestargets[0].Name;
            });

            businessObjectsService.retrieveIndividualsWithFilter(null, 7, salesTargetID, function (data) {
                $scope.individuals = data.outData.individuals;
            });

            $scope.onAddSalesTargetIndividual = function () {
                $state.go('tab.addindividual', { params: { type: 7, id: parseInt(salesTargetID) } });
            };

            $scope.onEditIndividual = function (individual) {
                $state.go('tab.editindividual', { id: individual.IndividualID, params: { type: 7, id: parseInt(salesTargetID) } });
            };

            $scope.onDeleteIndividual = function (individual) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Individual Deletion',
                    template: 'Are you sure you want to delete this individual?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteIndividual(individual.IndividualID, function (data) {
                            businessObjectsService.retrieveIndividualsWithFilter(null, 7, salesTargetID, function (data) {
                                $scope.individuals = data.outData.individuals;
                                $scope.$apply();
                            });
                        });
                    }
                });
            };

            $scope.onIndividualNotes = function (individual) {
                $state.go('tab.notes', { params: { type: "individual", id: individual.IndividualID } })
            };

            $scope.onIndividualActivities = function (individual) {
                $state.go('tab.activities', { params: { type: "individual", id: individual.IndividualID } })
            };

            $scope.onIndividualAddresses = function (individual) {
                $state.go('tab.addresses', { params: { type: "individual", id: individual.IndividualID } })
            };

            $scope.onIndividualPhoneNumbers = function (individual) {
                $state.go('tab.phonenumbers', { params: { type: "individual", id: individual.IndividualID } })
            };

            $scope.onIndividualEmailAddresses = function (individual) {
                $state.go('tab.emailaddresses', { params: { type: "individual", id: individual.IndividualID } })
            }

            $scope.onIndividualUris = function (individual) {
                $state.go('tab.uris', { params: { type: "individual", id: individual.IndividualID } })
            };

            $scope.onIndividualInstantMessengerAccounts = function (individual) {
                $state.go('tab.instantmessengeraccounts', { params: { type: "individual", id: individual.IndividualID } })
            };

            $scope.onIndividualAttachments = function (individual) {
                $state.go('tab.attachments', { params: { type: "individual", id: individual.IndividualID } })
            }

        }]);