angular.module('offensiveapp')
    .controller('notescontroller', ['$scope', '$http', '$state', '$stateParams', '$ionicPopup', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $stateParams, $ionicPopup, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }
            else if ($stateParams.params.type === 'individual') {
                parentObjectType = 3;
            };

            businessObjectsService.retrieveNotesWithFilter(null, parentObjectType, parentObjectID, function (data) {
                $scope.notes = data.outData.notes;
            });

            $scope.onAddNote = function () {
                $state.go('tab.addnote', { params: { type : parentObjectType, id: parentObjectID } });
            };

            $scope.onEditNote = function (note) {
                $state.go('tab.editnote', { id: note.NoteID, params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onDeleteNote = function (note) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this note?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteNote(note.NoteID, function (data) {
                            businessObjectsService.retrieveNotesWithFilter(null, parentObjectType, parentObjectID, function (data) {
                                $scope.notes = data.outData.notes;
                            });
                        });
                    }
                });
            };

        }]);