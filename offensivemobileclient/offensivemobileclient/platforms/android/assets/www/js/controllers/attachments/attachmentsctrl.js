angular.module('offensiveapp')
    .controller('attachmentscontroller', ['$scope', '$http', '$state', '$ionicPopup', '$stateParams', '$location', 'authenticationservice', 'applicationservice', 'businessobjectsservice',
        function ($scope, $http, $state, $ionicPopup, $stateParams, $location, authenticationService, applicationService, businessObjectsService) {

            var parentObjectType = $stateParams.params.type;
            var parentObjectID = $stateParams.params.id;

            if ($stateParams.params.type === 'salestarget') {
                parentObjectType = 7;
            }
            else if ($stateParams.params.type === 'individual') {
                parentObjectType = 3;
            };

            businessObjectsService.retrieveAttachmentsWithFilter(null, parentObjectType, parentObjectID, function (data) {
                $scope.attachments = data.outData.attachments;
            });

            $scope.onAddAttachment = function () {                
                $state.go('tab.addattachment', { params: { type: parentObjectType, id: parentObjectID } });
            };

            $scope.onOpenAttachment = function (attachment) {
                window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dir) {
                    dir.getFile(attachment.Filename, { create: true }, function (file) {
                        file.createWriter(function(writer) {
                            businessObjectsService.startFileDownload(attachment.ExternalFileID, function(data) {
                                var partcount = data.outData.filepartcount;

                                var partindex = 0;
                                var blobParts = [];

                                async.whilst(function() {
                                    return partindex < partcount;
                                },
                                function (callback) {
                                    var i = 0;

                                    applicationService.getLoggedInSecurityUserID(function(securityUserID) {
                                        businessObjectsService.downloadFilePart(securityUserID, attachment.ExternalFileID, partindex, function(data) {
                                            var dataBits = atob(data.outData.partcontent);
                                            var length = data.outData.partcontent.length;
                                            var inflatedBits = pako.inflateRaw(dataBits, {windowBits:15});
                                            blobParts.push(new Blob([inflatedBits.buffer]));
                                            partindex++;
                                            callback(null, partindex);
                                        });
                                    });
                                },
                                function (err, n) {
                                    if (!err) {
                                        writer.write(new Blob(blobParts));
                                        var url = file.toURL();
                                        window.open(url);
                                    }
                                });
                            });
                        });
                    });
                });
            };

            $scope.onDeleteAttachment = function (attachment) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Confirm Sales Target Deletion',
                    template: 'Are you sure you want to delete this attachment?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        businessObjectsService.deleteAttachment(attachment.AttachmentID, function (data) {
                            businessObjectsService.retrieveAttachmentsWithFilter(null, parentObjectType, parentObjectID, function (data) {
                                $scope.attachments = data.outData.attachments;
                            });
                        });
                    }
                });
            };

        }]);