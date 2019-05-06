angular.module('offensiveapp')
    .controller('addattachmentcontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$window', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'teamsservice', 'businessobjectsservice', 'filepodsapiservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $window, $stateParams, $location, authenticationService, applicationService, teamsService, businessObjectsService, filepodsApiService) {

            $scope.formnumberrequired = false;
            $scope.podid = -1;
            $scope.selectedfile = null;

            $('#folderTree')
                .on('changed.jstree', function (e, data) {
                    if (data.action == 'select_node') {
                        var folderID = parseInt(data.node.id);

                        filepodsApiService.retrieveFilePodFilesByParentFolderID($scope.podid, folderID, function (data) {
                            $scope.files = data.outData.podfolderfiles;                            
                        });
                    }                    
                }).
                jstree();

            applicationService.getLoggedInSecurityUserID(function (securityUserID) {
                filepodsApiService.retrieveFilePodsByOwnerSecurityUserID(securityUserID, function (data) {

                    $scope.pods = data.outData.pods;

                    filepodsApiService.retrieveFilePodsSharedWithMe(securityUserID, function (data) {

                        $scope.podssharedwithme = data.outData.pods;

                        filepodsApiService.retrievefilePodsArchived(securityUserID, function (data) {

                            $scope.podsarchived = data.outData.pods;
                        });
                    });
                });
            });           

            $scope.buildTreeViewData = function (folders, parentFolderID, parentFolder) {

                parentFolder.children = [];

                for (var i = 0; i < folders.length; i++) {
                    if (folders[i].FolderParentID == parentFolderID) {

                        childFolder = {};
                        childFolder.id = folders[i].FolderID.toString();
                        childFolder.text = folders[i].Name;                        
                        childFolder.folder = folders[i];

                        parentFolder.children.push(childFolder);

                        $scope.buildTreeViewData(folders, folders[i].FolderID, childFolder);
                    }
                }

            };

            $scope.onLoadPodFolders = function (podID) {
                $scope.podid = podID;

                filepodsApiService.retrieveFilePodRootFolder(podID, function (data) {
                    filepodsApiService.retrieveFolderTree(data.outData.podfolders[0].FolderID, function (data) {

                        var folders = data.outData.treefolders;

                        var parentFolder = {};

                        for (var i = 0; i < folders.length; i++) {
                            if (folders[i].FolderParentID == null) {
                                parentFolder.id = folders[i].FolderID.toString();
                                parentFolder.text = folders[i].Name;
                                parentFolder.folder = folders[i];
                                break;
                            }
                        }

                        $scope.buildTreeViewData(folders, parentFolder.folder.FolderID, parentFolder);                        

                        $('#folderTree').jstree(true).settings.core.data = parentFolder;
                        $('#folderTree').jstree(true).refresh();
                    });
                });
            };

            $scope.onPodSelected = function () {
                selectedPodID = parseInt($scope.selectedpod);
                $scope.selectedpodshared = null;
                $scope.selectedpodarchived = null;
                if (null != selectedPodID) {
                    $scope.onLoadPodFolders(selectedPodID);
                }
            };

            $scope.onPodSharedWithMeSelected = function () {
                $scope.selectedpod = null;
                selectedPodID = parseInt($scope.selectedpodshared);
                $scope.selectedpodarchived = null;
                if (null != selectedPodID) {
                    $scope.onLoadPodFolders(selectedPodID);
                }
            };

            $scope.onPodArchivedSelected = function () {
                $scope.selectedpod = null;
                $scope.selectedpodshared = null;
                selectedPodID = parseInt($scope.selectedpodarchived);
                if (null != selectedPodID) {
                    $scope.onLoadPodFolders(selectedPodID);
                }
            };

            $scope.onSelectFile = function (file) {
                $scope.selectedfile = file;
            };

            $scope.onCreateAttachment = function () {
                var name = $scope.$$childHead.name;

                var isvalid = true;

                if (name == undefined) {
                    $scope.formnamerequired = true;
                    isvalid = false;
                    $scope.$apply();
                }

                if (false == isvalid) {
                    return;
                }

                if (null == $scope.selectedfile) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Sales Target',
                        template: 'You must select a valid file first!'
                    });
                    return;
                }

                businessObjectsService.copyFile($scope.selectedfile.ExternalFileID, function (data) {                    
                    businessObjectsService.addAttachment(name, $scope.$$childHead.description, $scope.selectedfile.Filename,
                        data.outData.newfileid, $stateParams.params.type, $stateParams.params.id,
                        $scope.selectedfile.FileSizeInBytes, 1, function (data) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Sales Target',
                            template: 'Attachment has been added!'
                        });
                    });
                });                

            };

        }]);