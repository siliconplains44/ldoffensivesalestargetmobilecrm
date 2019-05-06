angular.module('offensiveapp')
    .controller('organizationcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'campaignsservice',
        function ($scope, $http, $state, $ionicPopup, $location, authenticationService, applicationService, teamsService, campaignsService) {

            $scope.formnamerequired = false;
            $scope.formbusinesstyperequired = false;
           
            var theCurrentTeamID = null;

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                applicationService.getCurrentTeam(function (currentTeamID) {
                    if (currentTeamID != null) {
                        theCurrentTeamID = currentTeamID;

                        teamsService.getOrganizationByTeamID(theCurrentTeamID, function (data) {
                            if (null != data.outData.organization) {
                                $scope.$$childHead.name = data.outData.organization.Name;
                                $scope.$$childHead.businesstype = data.outData.organization.Type;
                                $scope.$apply();
                            }
                        });
                    }
                });
            });

            $scope.onSaveOrganization = function () {
                var name = $scope.$$childHead.name;
                var type = $scope.$$childHead.businesstype;

                var isvalid = true;

                if (name == undefined) {
                    $scope.formnamerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (type == undefined) {
                    $scope.formbusinesstyperequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                teamsService.setOrganizationByTeamID(theCurrentTeamID, name, type, function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales Target',
                        template: 'Organization was saved'
                    });
                });

            };

        }]);