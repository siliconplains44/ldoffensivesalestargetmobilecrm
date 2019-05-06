angular.module('offensiveapp')
    .controller('mileagelogentriescontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                businessObjectsService.retrieveMileageLogEntriesWithFilter(null, securityUserID, null, function (data) {
                    $scope.mileagelogentries = data.outData.mileagelogentries;
                });
            });

            $scope.onAddMileageLogEntry = function () {
                $state.go('tab.addmileagelogentry', { params: { type: null, id: null } });
            };

            $scope.onEditMileageLogEntry = function (mileagelogentry) {
                $state.go('tab.editmileagelogentry', { id: mileagelogentry.MileageLogEntryID, params: { type: null, id: null } });
            };

            $scope.onDeleteMileageLogEntry = function (mileagelogentry) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this mileage log entry?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteMileageLogEntry(mileagelogentry.MileageLogEntryID, function (data) {
                            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                                businessObjectsService.retrieveMileageLogEntriesWithFilter(null, securityUserID, null, function (data) {
                                    $scope.mileagelogentries = data.outData.mileagelogentries;
                                });
                            });
                        });
                    }
                });
            };

        }]);

