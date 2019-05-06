angular.module('offensiveapp')
    .controller('reportmyperformancecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'marketingservice', 'teamsservice', 'businessobjectsservice',
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

            $scope.buildCategories = function(monthdata) {
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

            $(function () {

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    applicationService.getCurrentTeam(function (currentTeamID) {
                        var theCurrentTeam = parseInt(currentTeamID);

                        businessObjectsService.retrieveTotalAccountsCountForUser(securityUserID, theCurrentTeam,  function (data) {
                            $scope.totalaccounts = data.outData.totalaccounts;
                            $scope.$apply();
                        });

                        businessObjectsService.retrieveTotalAccountsByMonthForUser(securityUserID, theCurrentTeam, function (data) {

                            var monthdata = $scope.buildLast12Months();

                            var thecategories = $scope.buildCategories(monthdata);

                            var thedata = [];

                            async.each(monthdata, function (item, callback) {

                                var foundMonth = false;

                                async.each(data.outData.accountaccumulationdata, function (accumrow, callback) {
                                    if (item.month == accumrow.month && item.year == accumrow.year) {
                                        thedata.push(accumrow.accountscount);
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

                            $('#chart').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Monthly Account Totals'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Total Accounts'
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
                                    name: 'Accounts',
                                    data: thedata
                                }]
                            });
                        });

                        momenttoday = moment();

                        businessObjectsService.retrieveTotalNewSalesTargetsForMonthForUser(securityUserID, theCurrentTeam, momenttoday.month() - 1, momenttoday.year(), function (data) {

                            $scope.totaltargetsinplay = data.outData.newsalestargetscount;

                            businessObjectsService.retrieveTotalSalesTargetsConvertedToAccountsForMonthForUser(securityUserID, theCurrentTeam, momenttoday.month() - 1, momenttoday.year(), function (data) {

                                $scope.conversionsthismonth = data.outData.convertedsalestargetscount;

                                if ($scope.totaltargetsinplay == 0) {
                                    $scope.conversionratio = 0;
                                }
                                else {
                                    $scope.conversionratio = $scope.conversionsthismonth / $scope.totaltargetsinplay;
                                }

                                $scope.$apply();
                            });

                        });

                        businessObjectsService.retrieveTotalNewSalesTargetsForPreviousMonthsForUser(securityUserID, theCurrentTeam, function (data) {

                            var newsalestargets = data;

                            businessObjectsService.retrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser(securityUserID, theCurrentTeam, function (data) {

                                var monthdata = $scope.buildLast12Months();

                                var thecategories = $scope.buildCategories(monthdata);

                                var thedataone = [];

                                async.each(monthdata, function (item, callback) {

                                        var foundMonthSalesTarget = false;

                                        async.each(newsalestargets.outData.newsalestargetdata, function (newsalestargetrow, callback) {
                                            if (item.month + 1 == newsalestargetrow.amonth && item.year == newsalestargetrow.ayear) {
                                                thedataone.push(newsalestargetrow.newsalestargets);
                                                foundMonthSalesTarget = true;
                                            }

                                            callback();
                                        }, function (err) { });

                                        if (false == foundMonthSalesTarget) {
                                            thedataone.push(0);
                                        }

                                        callback();
                                    
                                },
                                function (err) { });

                                $('#charttwo').highcharts({
                                    chart: {
                                        type: 'line'
                                    },
                                    title: {
                                        text: 'Conversions for previous months'
                                    },
                                    xAxis: {
                                        categories: thecategories
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'Converted'
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
                                        name: 'Conversions',
                                        data: thedataone
                                    }]
                                });

                                var interimdata = [];
                                var thedata = [];

                                async.each(monthdata, function (item, callback) {

                                        var foundMonthSalesTarget = false;
                                        var foundConvertedSalesTarget = false;

                                        var interimrecord = {};

                                        interimrecord.newsalestargets = 0;
                                        interimrecord.convertedsalestargets = 0;

                                        async.each(newsalestargets.outData.newsalestargetdata, function (newsalestargetrow, callback) {
                                            if (item.month + 1 == newsalestargetrow.amonth && item.year == newsalestargetrow.ayear) {
                                                interimrecord.newsalestargets = newsalestargetrow.newsalestargets;
                                                foundMonthSalesTarget = true;
                                            }

                                            callback();
                                        }, function (err) { });

                                        async.each(data.outData.convertedsalestargetdata, function (convertedrow, callback) {
                                            if (item.month + 1 == convertedrow.amonth && item.year == convertedrow.ayear) {
                                                interimrecord.convertedsalestargets = convertedrow.convertedsalestargets;
                                                foundConvertedSalesTarget = true;
                                            
                                            }

                                            callback();
                                        }, function (err) { });

                                        if (foundMonthSalesTarget == false) {
                                            interimrecord.newsalestargets = 0;
                                        }

                                        if (foundConvertedSalesTarget == false) {
                                            interimrecord.convertedsalestargets = 0;
                                        }

                                        interimdata.push(interimrecord);

                                        callback();
                                    },
                                    function (err) {
                                       
                                    });

                                async.each(interimdata, function(interimrow, callback) {
                                    if (interimrow.newsalestargets == 0) {
                                        thedata.push(0);
                                    }
                                    else {
                                        thedata.push(interimrow.convertedsalestargets / interimrow.newsalestargets);
                                    }
                                    callback();
                                }, function(err) { });

                                $('#chartthree').highcharts({
                                    chart: {
                                        type: 'line'
                                    },
                                    title: {
                                        text: 'Conversions for previous months'
                                    },
                                    xAxis: {
                                        categories: thecategories
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'Conversion Ratio'
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
                                        name: 'Ratio',
                                        data: thedata
                                    }]
                                });


                            });
                        });

                        businessObjectsService.retrieveQuotesSentForPreviousMonthsByUser(securityUserID, theCurrentTeam, function (data) {

                            async.each(data.outData.quotesdata, function (row, callback) {
                                if (row.amonth - 1 == momenttoday.month() && row.ayear == momenttoday.year()) {
                                    $scope.quotesthismonth = row.quotecount;
                                    $scope.$apply();
                                }
                            }, function (err) { })

                            if ($scope.quotesthismonth == null) {
                                $scope.quotesthismonth = 0;
                                $scope.$apply();
                            }

                            var monthdata = $scope.buildLast12Months();

                            var thecategories = $scope.buildCategories(monthdata);

                            var thedata = [];

                            async.each(monthdata, function (item, callback) {

                                var foundMonth = false;

                                async.each(data.outData.quotesdata, function (row, callback) {
                                    if (item.month + 1 == row.amonth && item.year == row.ayear) {
                                        thedata.push(row.quotecount);
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

                            $('#chartfour').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Quotes written for previous months'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Quote Count'
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
                                    name: 'Quote Count',
                                    data: thedata
                                }]
                            });

                        });

                        businessObjectsService.retrieveDealEstimateCountForPreviousMonthsForUser(securityUserID, theCurrentTeam, function (data) {

                            async.each(data.outData.dealsdata, function (row, callback) {
                                if (row.amonth - 1 == momenttoday.month() && row.ayear == momenttoday.year()) {
                                    $scope.dealestimatescountthismonth = row.dealestimatecount;
                                    $scope.$apply();
                                }
                            }, function (err) { })

                            if ($scope.dealestimatescountthismonth == null) {
                                $scope.dealestimatescountthismonth = 0;
                                $scope.$apply();
                            }

                            var monthdata = $scope.buildLast12Months();

                            var thecategories = $scope.buildCategories(monthdata);

                            var thedata = [];

                            async.each(monthdata, function (item, callback) {

                                var foundMonth = false;

                                async.each(data.outData.dealsdata, function (row, callback) {
                                    if (item.month + 1 == row.amonth && item.year == row.ayear) {
                                        thedata.push(row.dealestimatecount);
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

                            $('#chartfive').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Deal estimate count for previous months'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Deal Estimate Count'
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
                                    name: 'Deal Estimate Count',
                                    data: thedata
                                }]
                            });

                        });

                        businessObjectsService.retrieveDealCountForPreviousMonthsForUser(securityUserID, theCurrentTeam, function (data) {

                            async.each(data.outData.dealsdata, function (row, callback) {
                                if (row.amonth - 1 == momenttoday.month() && row.ayear == momenttoday.year()) {
                                    $scope.dealscountthismonth = row.dealcount;
                                    $scope.$apply();
                                }
                            }, function (err) { })

                            if ($scope.dealscountthismonth == null) {
                                $scope.dealscountthismonth = 0;
                                $scope.$apply();
                            }

                            var monthdata = $scope.buildLast12Months();

                            var thecategories = $scope.buildCategories(monthdata);

                            var thedata = [];

                            async.each(monthdata, function (item, callback) {

                                var foundMonth = false;

                                async.each(data.outData.dealsdata, function (row, callback) {
                                    if (item.month + 1 == row.amonth && item.year == row.ayear) {
                                        thedata.push(row.dealcount);
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

                            $('#chartsix').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Deal count for previous months'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Deal Count'
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
                                    name: 'Deal Count',
                                    data: thedata
                                }]
                            });

                        });

                        businessObjectsService.retrieveDealValueForPreviousMonthsForUser(securityUserID, theCurrentTeam, function (data) {

                            async.each(data.outData.dealsdata, function (row, callback) {
                                if (row.amonth - 1 == momenttoday.month() && row.ayear == momenttoday.year()) {
                                    $scope.dealvaluethismonth = row.dealvalue;
                                    $scope.$apply();
                                }
                            }, function (err) { })

                            if ($scope.dealvaluethismonth == null) {
                                $scope.dealvaluethismonth = 0;
                                $scope.$apply();
                            }

                            var monthdata = $scope.buildLast12Months();

                            var thecategories = $scope.buildCategories(monthdata);

                            var thedata = [];

                            async.each(monthdata, function (item, callback) {

                                var foundMonth = false;

                                async.each(data.outData.dealsdata, function (row, callback) {
                                    if (item.month + 1 == row.amonth && item.year == row.ayear) {
                                        thedata.push(row.dealvalue);
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

                            $('#chartseven').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Deal value for previous months'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Deal Value'
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
                                    name: 'Deal Value',
                                    data: thedata
                                }]
                            });

                        });

                        businessObjectsService.retrieveRevenueForPreviousMonthsForUser(securityUserID, theCurrentTeam, function (data) {

                            async.each(data.outData.revenuedata, function (row, callback) {
                                if (row.periodmonth - 1 == momenttoday.month() && row.periodyear == momenttoday.year()) {
                                    $scope.revenuethismonth = row.revenueamount;
                                    $scope.$apply();
                                }
                            }, function (err) { })

                            if ($scope.revenuethismonth == null) {
                                $scope.revenuethismonth = 0;
                                $scope.$apply();
                            }

                            var monthdata = $scope.buildLast12Months();

                            var thecategories = $scope.buildCategories(monthdata);

                            var thedata = [];

                            async.each(monthdata, function (item, callback) {

                                var foundMonth = false;

                                async.each(data.outData.revenuedata, function (row, callback) {
                                    if (item.month + 1 == row.periodmonth && item.year == row.periodyear) {
                                        thedata.push(row.revenueamount);
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

                            $('#charteight').highcharts({
                                chart: {
                                    type: 'line'
                                },
                                title: {
                                    text: 'Revenue for previous months'
                                },
                                xAxis: {
                                    categories: thecategories
                                },
                                yAxis: {
                                    title: {
                                        text: 'Revenue'
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
                                    name: 'Revenue',
                                    data: thedata
                                }]
                            });

                        });
                    });
                });
            });

        }]);