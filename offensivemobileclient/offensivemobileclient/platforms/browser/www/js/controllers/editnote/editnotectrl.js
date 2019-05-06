angular.module('offensiveapp')
    .controller('editnotecontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService) {

            $scope.formcontentrequired = false;

            var noteID = $location.$$path.split("/")[3];

            businessObjectsService.retrieveNotesWithFilter(noteID, null, null, function (data) {
                $scope.$$childHead.note = data.outData.notes[0].Content;
                $scope.$apply();
            });        

            $scope.onModifyNote = function () {
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

                businessObjectsService.modifyNote(parseInt(noteID), content, $stateParams.params.type, $stateParams.params.id, function (data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales Target',
                        template: 'Note has been modified!'
                    });
                });

            };

        }]);