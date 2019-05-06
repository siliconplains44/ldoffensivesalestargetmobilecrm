angular.module('offensiveapp')
    .controller('masteractivitiescontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            applicationService.getLoggedInSecurityUserID(function(securityUserID) {
                businessObjectsService.retrieveActivitiesWithFilter(null, securityUserID, null, null, null, function (data) {

                    angular.forEach(data.outData.activities, function(value, key) {
                        if (value.LastName == null && value.SalesTargetName == null) {
                            value.ObjectAttachmentType = 'NA';
                            value.ObjectAttachmentName = '';
                        }
                        else if (value.LastName == null) {
                            value.ObjectAttachmentType = 'Sales Target';
                            value.ObjectAttachmentName = value.SalesTargetName;
                        }
                        else {
                            value.ObjectAttachmentType = 'Individual';
                            value.ObjectAttachmentName = value.FirstName + " " + value.LastName;
                        }
                    });

                    $scope.activities = data.outData.activities;
                });
            });

            $scope.onAddActivity = function () {
                $state.go('tab.addmasteractivity', { params: { type: null, id: null } });
            };

            $scope.onEditActivity = function (activity) {
                $state.go('tab.editmasteractivity', { id: activity.ActivityID, params: { type: null, id: null } });
            };

            $scope.onDeleteActivity = function (activity) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this activity?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteActivity(activity.ActivityID, function (data) {
                            businessObjectsService.retrieveActivitiesWithFilter(null, null, null, null, null, function (data) {

                                angular.forEach(data.outData.activities, function(value, key) {
                                    if (value.LastName == null && value.SalesTargetName == null) {
                                        value.ObjectAttachmentType = 'NA';
                                        value.ObjectAttachmentName = '';
                                    }
                                    else if (value.LastName == null) {
                                        value.ObjectAttachmentType = 'Sales Target';
                                        value.ObjectAttachmentName = value.SalesTargetName;
                                    }
                                    else {
                                        value.ObjectAttachmentType = 'Individual';
                                        value.ObjectAttachmentName = value.FirstName + " " + value.LastName;
                                    }
                                });

                                $scope.activities = data.outData.activities;
                            });
                        });
                    }
                });
            };

        }]);
