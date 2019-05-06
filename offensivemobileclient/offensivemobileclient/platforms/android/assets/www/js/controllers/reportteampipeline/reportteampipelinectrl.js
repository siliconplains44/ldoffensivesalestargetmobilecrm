angular.module('offensiveapp')
    .controller('reportteampipelinecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'marketingservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, marketingService, teamsService, businessObjectsService) {

            $scope.findCount = function (pipelinetotalrows, stageID) {

                var count = 0;

                async.each(pipelinetotalrows, function (item, callback) {
                    if (item.SalesTargetStageID == stageID) {
                        count = item.stagecount;
                    }
                },
                function (err) { });

                return count;
            };

            $(function () {

                applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                    applicationService.getCurrentTeam(function (currentTeamID) {
                        var theCurrentTeam = parseInt(currentTeamID);

                        businessObjectsService.retrievePipelineTotalsForMonthForTeam(theCurrentTeam, function (data) {

                            $scope.countprospects = $scope.findCount(data.outData.pipelinetotals, 2);
                            $scope.countleads = $scope.findCount(data.outData.pipelinetotals, 3);
                            $scope.countopportunities = $scope.findCount(data.outData.pipelinetotals, 4);
                            $scope.countaccounts = $scope.findCount(data.outData.pipelinetotals, 5);
                            $scope.countinactives = $scope.findCount(data.outData.pipelinetotals, 6);

                            var total = $scope.countprospects + $scope.countleads + $scope.countopportunities + $scope.countaccounts + $scope.countinactives;

                            thedata = [];

                            thedata.push(['prospects', $scope.countprospects / total]);
                            thedata.push(['leads', $scope.countleads / total]);
                            thedata.push(['opportunities', $scope.countopportunities / total]);
                            thedata.push(['accounts', $scope.countaccounts / total]);
                            thedata.push(['inactives', $scope.countinactives / total]);


                            $('#chart').highcharts({
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false
                                },
                                title: {
                                    text: 'Your Pipeline Allocation'
                                },
                                tooltip: {
                                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: false
                                        },
                                        showInLegend: true
                                    }
                                },
                                series: [{
                                    type: 'pie',
                                    name: 'Pipeline share',
                                    data: thedata
                                }]
                            });

                        });

                        businessObjectsService.retrieveSalesTargetsAllocatedAcrossPipelineForTeam(theCurrentTeam, function (data) {

                            $scope.prospectsalestargets = data.outData.prospectsalestargets;
                            $scope.leadsalestargets = data.outData.leadsalestargets;
                            $scope.opportunitysalestargets = data.outData.opportunitysalestargets;
                            $scope.accountsalestargets = data.outData.accountsalestargets;
                            $scope.inactivesalestargets = data.outData.inactivesalestargets;

                        });
                    });
                });


            });

        }]);