angular.module('offensiveapp')
    .controller('reportteamactivitycontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'marketingservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, marketingService, teamsService, businessObjectsService) {

            $scope.buildLast12Months = function () {
                monthcount = 12;
                var months = [];
                currentdate = moment();

                async.whilst(function () {
                    return monthcount > 0;
                },
                function (callback) {
                    amonth = {};
                    amonth.month = currentdate.month();

                    amonth.year = currentdate.year();
                    amonth.value = 0;
                    months.push(amonth);
                    currentdate.subtract(1, 'M');
                    monthcount--;

                    callback();
                },
                function (err) {

                });

                return months.reverse();
            };

            $scope.buildCategories = function (monthdata) {
                var categories = [];

                async.each(monthdata,
                    function (item, callback) {
                        if (item.month == 0) {
                            categories.push('Jan');
                        }
                        else if (item.month == 1) {
                            categories.push('Feb');
                        }
                        else if (item.month == 2) {
                            categories.push('Mar');
                        }
                        else if (item.month == 3) {
                            categories.push('Apr');
                        }
                        else if (item.month == 4) {
                            categories.push('May');
                        }
                        else if (item.month == 5) {
                            categories.push('Jun');
                        }
                        else if (item.month == 6) {
                            categories.push('Jul');
                        }
                        else if (item.month == 7) {
                            categories.push('Aug');
                        }
                        else if (item.month == 8) {
                            categories.push('Sep');
                        }
                        else if (item.month == 9) {
                            categories.push('Oct');
                        }
                        else if (item.month == 10) {
                            categories.push('Nov');
                        }
                        else if (item.month == 11) {
                            categories.push('Dec');
                        }

                        callback();
                    },
                function (err) {

                });

                return categories;
            };

            var atResearch = 1;
            var atPhoneCall = 2;
            var atTextMessage = 3;
            var atInstantMessage = 4;
            var atPlan = 5;
            var atInPersonCall = 6;
            var atQualifyingLeads = 7;
            var atInternalMeeting = 8;
            var atWritingCollateral = 9;
            var atWritingProposals = 10;
            var atWritingWhitePapers = 11;
            var atClientLunch = 13;
            var atEmailMessage = 14;
            var atCustom = 15;

            $scope.loadDataForActivityType = function (monthdata, data, activityTypeID) {

                var dataobject = {};

                dataobject.name = '';
                dataobject.data = [];

                async.each(monthdata, function (item, callback) {

                    var foundMonth = false;

                    async.each(data.outData.activityoccurrencestotals, function (row, callback) {
                        if (item.month == row.amonth - 1 && item.year == row.ayear && row.ActivityTypeID == activityTypeID) {
                            dataobject.data.push(row.occurences);
                            foundMonth = true;
                        }

                        callback();
                    },
                    function (err) {
                        if (foundMonth == false) {
                            dataobject.data.push(0);
                        }
                    });
                },
                function (err) {

                });

                if (activityTypeID == atResearch) {
                    dataobject.name = 'Research';
                }
                else if (activityTypeID == atPhoneCall) {
                    dataobject.name = 'Phone Call';
                }
                else if (activityTypeID == atTextMessage) {
                    dataobject.name = 'Text Message';
                }
                else if (activityTypeID == atInstantMessage) {
                    dataobject.name = 'Instant Message';
                }
                else if (activityTypeID == atPlan) {
                    dataobject.name = 'Plan';
                }
                else if (activityTypeID == atInPersonCall) {
                    dataobject.name = 'In Person Call';
                }
                else if (activityTypeID == atQualifyingLeads) {
                    dataobject.name = 'Qualifying Leads';
                }
                else if (activityTypeID == atInternalMeeting) {
                    dataobject.name = 'Internal Meeting';
                }
                else if (activityTypeID == atWritingCollateral) {
                    dataobject.name = 'Writing Collateral';
                }
                else if (activityTypeID == atWritingProposals) {
                    dataobject.name = 'Writing Proposals';
                }
                else if (activityTypeID == atWritingWhitePapers) {
                    dataobject.name = 'Writing White Papers';
                }
                else if (activityTypeID == atClientLunch) {
                    dataobject.name = 'Client Lunch';
                }
                else if (activityTypeID == atEmailMessage) {
                    dataobject.name = 'Email Message';
                }
                else if (activityTypeID == atCustom) {
                    dataobject.name = 'Custom';
                }

                return dataobject;
            };

            $scope.loadDataForActivityTypeDuration = function (monthdata, data, activityTypeID) {

                var dataobject = {};

                dataobject.name = '';
                dataobject.data = [];

                async.each(monthdata, function (item, callback) {

                    var foundMonth = false;

                    async.each(data.outData.activitydurationtotals, function (row, callback) {
                        if (item.month == row.amonth - 1 && item.year == row.ayear && row.ActivityTypeID == activityTypeID) {
                            dataobject.data.push(row.totaldurationinhours);
                            foundMonth = true;
                        }

                        callback();
                    },
                    function (err) {
                        if (foundMonth == false) {
                            dataobject.data.push(0);
                        }
                    });
                },
                function (err) {

                });

                if (activityTypeID == atResearch) {
                    dataobject.name = 'Research';
                }
                else if (activityTypeID == atPhoneCall) {
                    dataobject.name = 'Phone Call';
                }
                else if (activityTypeID == atTextMessage) {
                    dataobject.name = 'Text Message';
                }
                else if (activityTypeID == atInstantMessage) {
                    dataobject.name = 'Instant Message';
                }
                else if (activityTypeID == atPlan) {
                    dataobject.name = 'Plan';
                }
                else if (activityTypeID == atInPersonCall) {
                    dataobject.name = 'In Person Call';
                }
                else if (activityTypeID == atQualifyingLeads) {
                    dataobject.name = 'Qualifying Leads';
                }
                else if (activityTypeID == atInternalMeeting) {
                    dataobject.name = 'Internal Meeting';
                }
                else if (activityTypeID == atWritingCollateral) {
                    dataobject.name = 'Writing Collateral';
                }
                else if (activityTypeID == atWritingProposals) {
                    dataobject.name = 'Writing Proposals';
                }
                else if (activityTypeID == atWritingWhitePapers) {
                    dataobject.name = 'Writing White Papers';
                }
                else if (activityTypeID == atClientLunch) {
                    dataobject.name = 'Client Lunch';
                }
                else if (activityTypeID == atEmailMessage) {
                    dataobject.name = 'Email Message';
                }
                else if (activityTypeID == atCustom) {
                    dataobject.name = 'Custom';
                }

                return dataobject;
            };

            $(function () {

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    applicationService.getCurrentTeam(function (currentTeamID) {
                        var theCurrentTeam = parseInt(currentTeamID);

                        businessObjectsService.retrieveActivityDataForTeam(theCurrentTeam, function (data) {

                            var monthdata = $scope.buildLast12Months();

                            var thecategories = $scope.buildCategories(monthdata);

                            var thedata = [];

                            thedata.push($scope.loadDataForActivityType(monthdata, data, atResearch));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atPhoneCall));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atTextMessage));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atInstantMessage));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atPlan));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atInPersonCall));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atQualifyingLeads));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atInternalMeeting));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atWritingCollateral));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atWritingProposals));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atWritingWhitePapers));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atClientLunch));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atEmailMessage));
                            thedata.push($scope.loadDataForActivityType(monthdata, data, atCustom));

                            $('#chartone').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Activity Occurences Counts'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Total Occurences'
                                    }
                                },
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        },
                                        enableMouseTracking: false
                                    }
                                },
                                series: thedata
                            });

                            var thedata = [];

                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atResearch));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atPhoneCall));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atTextMessage));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atInstantMessage));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atPlan));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atInPersonCall));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atQualifyingLeads));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atInternalMeeting));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atWritingCollateral));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atWritingProposals));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atWritingWhitePapers));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atClientLunch));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atEmailMessage));
                            thedata.push($scope.loadDataForActivityTypeDuration(monthdata, data, atCustom));

                            $('#charttwo').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Monthly Activity Duration Totals'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Total Duration in Hours'
                                    }
                                },
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        },
                                        enableMouseTracking: false
                                    }
                                },
                                series: thedata
                            });

                            var thedata = [];

                            async.each(monthdata, function (item, callback) {

                                var foundMonth = false;

                                async.each(data.outData.activitydurationtotalsbymonth, function (row, callback) {
                                    if (item.month == row.amonth - 1 && item.year == row.ayear) {
                                        thedata.push(row.totaldurationinhours);
                                        foundMonth = true;
                                    }

                                    callback();
                                },
                                function (err) {
                                    if (foundMonth == false) {
                                        thedata.push(0);
                                    }

                                    callback();
                                });
                            },
                            function (err) { });

                            $('#chartthree').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Monthly Duration Totals'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Total Duration'
                                    }
                                },
                                plotOptions: {
                                    line: {
                                        dataLabels: {
                                            enabled: true
                                        },
                                        enableMouseTracking: false
                                    }
                                },
                                series: [{
                                    name: 'Hours',
                                    data: thedata
                                }]
                            });
                        });
                    });
                });
            });

        }]);