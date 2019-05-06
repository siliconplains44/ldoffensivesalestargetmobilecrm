angular.module('offensiveapp')
    .controller('activitiescontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }
            else if ($stateParams.params.type === 'individual') {
                parentObjectType = 3;
            };

            businessObjectsService.retrieveActivitiesWithFilter(null, null, null, parentObjectType, parentObjectID, function (data) {
                $scope.activities = data.outData.activities;
            });

            $scope.onAddActivity = function () {
                $state.go('tab.addactivity', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onEditActivity = function (activity) {
                $state.go('tab.editactivity', { id: activity.ActivityID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeleteActivity = function (activity) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this activity?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteActivity(activity.ActivityID, function (data) {
                            businessObjectsService.retrieveActivitiesWithFilter(null, null, null, parentObjectType, parentObjectID, function (data) {
                                $scope.activities = data.outData.activities;
                            });
                        });
                    }
                });
            };

        }]);