var filepodsapiService = angular.module('offensiveapp')

filepodsapiService.factory('filepodsapiservice',
    ['$http', 'utilityservice',
        function ($http, utilityService) {

            var filepodsapiService = {};

            var baseUrl = "https://filepodsapi.leoparddata.com:50002";
            var webserviceusername = "wearesuperswiftandfast";
            var webservicepassword = "!@)($%6al;asdfkl;j;ekaii3$$#2ljl;asdlj(";

            filepodsapiService.retrieveFilePodsByOwnerSecurityUserID = function (securityUserID, cb) {
                    
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;

                var res = $http.post(baseUrl + '/ajaj/RetrieveFilePodsByOwnerSecurityUserID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            filepodsapiService.retrieveFilePodsSharedWithMe = function (securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;

                var res = $http.post(baseUrl + '/ajaj/RetrieveFilePodsSharedWithMe', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            filepodsapiService.retrievefilePodsArchived = function (securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;

                var res = $http.post(baseUrl + '/ajaj/RetrieveFilePodsArchived', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            filepodsapiService.lockFilePodForEditing = function (podID, securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.podid = podID;

                var res = $http.post(baseUrl + '/ajaj/LockFilePodForEditing', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            filepodsapiService.unlockFilePod = function (podID, cb) {

                var objectToSend = utilityService.buildObjectToSend();
                
                objectToSend.podid = podID;

                var res = $http.post(baseUrl + '/ajaj/UnlockFilePod', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            filepodsapiService.isFilePodLocked = function (podID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.podid = podID;

                var res = $http.post(baseUrl + '/ajaj/IsFilePodLocked', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            filepodsapiService.retrieveFilePodRootFolder = function (podID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.podid = podID;

                var res = $http.post(baseUrl + '/ajaj/RetrieveFilePodRootFolder', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            filepodsapiService.retrieveFolderTree = function (rootFolderID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.treeid = rootFolderID;

                var res = $http.post(baseUrl + '/ajaj/RetrieveFolderTree', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            filepodsapiService.retrieveFilePodFilesByParentFolderID = function (podID, parentFolderID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.parentfolderid = parentFolderID;
                objectToSend.podid = podID;

                var res = $http.post(baseUrl + '/ajaj/RetrieveFilePodFilesByParentFolderID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            return filepodsapiService;

        }]);