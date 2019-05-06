angular.module('offensiveapp')
    .controller('addnotecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService) {

            $scope.formcontentrequired = false;

            $scope.onCreateNote = function () {
                var content = $scope.$$childHead.note;

                var isvalid = true;

                if (content == undefined) {
                    $scope.formcontentrequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                businessObjectsService.addNote(content, $stateParams.params.type, $stateParams.params.id, function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales Target',
                        template: 'Note has been added!'
                    });
                });

            };

        }]);