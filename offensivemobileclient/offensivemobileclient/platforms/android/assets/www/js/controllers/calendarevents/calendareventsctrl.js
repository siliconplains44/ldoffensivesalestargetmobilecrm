angular.module('offensiveapp')
    .controller('calendareventscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var defaultStart = moment();
            var defaultEnd = moment().add(7, 'd');

            applicationService.getLoggedInSecurityUserID(function(securityUserID) {
                businessObjectsService.retrieveCalendarEventsWithFilter(null, securityUserID, defaultStart.toISOString(),
                    defaultEnd.toISOString(), null, null, function (data) {
                    $scope.$$childHead.from = defaultStart.toDate();
                    $scope.$$childHead.to = defaultEnd.toDate();
                    $scope.calendarevents = data.outData.calendarevents;
                });
            });

            $scope.onSetFilterToday = function() {
                $scope.$$childHead.from = moment().toDate();
                $scope.$$childHead.to = moment().add(1, 'd').toDate();
                $scope.$apply();
            };

            $scope.onSetFilterWeek = function() {
                $scope.$$childHead.from = moment().toDate();
                $scope.$$childHead.to = moment().add(7, 'd').toDate();
                $scope.$apply();
            };

            $scope.onSetFilterMonth = function() {
                $scope.$$childHead.from = moment().toDate();
                $scope.$$childHead.to = moment().add(1, 'M').toDate();
                $scope.$apply();
            };

            $scope.onFilterCalendarEvents = function() {
                var start = new moment($scope.$$childHead.from);
                var to = new moment($scope.$$childHead.to);
                applicationService.getLoggedInSecurityUserID(function(securityUserID) {
                    businessObjectsService.retrieveCalendarEventsWithFilter(null, securityUserID, start.toISOString(),
                        to.toISOString(), null, null, function (data) {
                            $scope.calendarevents = data.outData.calendarevents;
                            $scope.$apply();
                        });
                });
            };

            $scope.onAddCalendarEvent = function () {
                $state.go('tab.addcalendarevent', { params: { type: null, id: null } });
            };

            $scope.onEditCalendarEvent = function (calendarevent) {
                $state.go('tab.editcalendarevent', { id: calendarevent.CalendarEventID, params: { type: null, id: null } });
            };

            $scope.onDeleteCalendarEvent = function (calendarevent) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this calender event?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        var start = new moment($scope.$$childHead.from);
                        var to = new moment($scope.$$childHead.to);
                        businessObjectsService.deleteCalendarEvent(calendarevent.CalendarEventID, function (data) {
                            applicationService.getLoggedInSecurityUserID(function(securityUserID) {
                                businessObjectsService.retrieveCalendarEventsWithFilter(null, securityUserID, start.toISOString(),
                                    to.toISOString(), null, null, function (data) {
                                        $scope.calendarevents = data.outData.calendarevents;
                                        $scope.$apply();
                                    });
                            });
                        });
                    }
                });
            };

        }]);

