angular.module('offensiveapp')
    .controller('editcalendareventcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, campaignsService) {

            $scope.formtitlerequired = false;
            $scope.formstarttimerequired = false;
            $scope.formendtimerequired = false;

            var calendarEventID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveCalendarEventsWithFilter(parseInt(calendarEventID), null, null, null, null, null, function (data) {
                $scope.$$childHead.title = data.outData.calendarevents[0].Title;
                $scope.$$childHead.starttime = new moment(data.outData.calendarevents[0].StartDateTime).toDate();
                $scope.$$childHead.endtime = new moment(data.outData.calendarevents[0].EndDateTime).toDate();
                $scope.$$childHead.where = data.outData.calendarevents[0].Location;
                $scope.$$childHead.description = data.outData.calendarevents[0].Description;
            });

            $scope.onModifyCalendarEvent = function () {
                var title = $scope.$$childHead.title;
                var starttime = $scope.$$childHead.starttime;
                var endtime = $scope.$$childHead.endtime;
                var where = $scope.$$childHead.where;
                var description = $scope.$$childHead.description;

                var isvalid = true;

                if (title == undefined) {
                    $scope.formtitlerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (starttime == undefined) {
                    $scope.formstarttimerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (endtime == undefined) {
                    $scope.formendtimerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    businessObjectsService.modifyCalendarEvent(parseInt(calendarEventID), title, moment(starttime).toISOString(), moment(endtime).toISOString(), where, description, null, securityUserID,
                        null, null, function (data) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Sales Target',
                                template: 'Calendar Event has been edited!'
                            });
                        });
                });
            };

        }]);
