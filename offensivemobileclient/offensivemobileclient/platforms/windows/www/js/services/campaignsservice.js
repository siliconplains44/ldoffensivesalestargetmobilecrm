var campaignsService = angular.module('offensiveapp')

campaignsService.factory('campaignsservice', 
    ['$http', 'settingsservice', 'applicationservice', 'utilityservice',        
        function ($http, settingsService, applicationService, utilityService) {

            var campaignsService = {};

            campaignsService.retrieveCampaignsByTeam = function (teamID, cb) {             
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveCampaignsByTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            campaignsService.addCampaign = function (startDate, Name, Description, endDate, teamID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.startdate = startDate;
                objectToSend.name = Name;
                objectToSend.description = Description;
                objectToSend.enddate = endDate;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddCampaign', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            campaignsService.modifyCampaign = function (campaignId, startDate, Name, Description, endDate, teamID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.campaignid = campaignId;
                objectToSend.startdate = startDate;
                objectToSend.name = Name;
                objectToSend.description = Description;
                objectToSend.enddate = endDate;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyCampaign', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            campaignsService.deleteCampaign = function (campaignId, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.campaignid = campaignId;                

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteCampaign', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            campaignsService.retrieveCampaignByCampaignID = function (campaignID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.campaignid = campaignID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveCampaignByCampaignID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            campaignsService.getDefaultCampaignSelectionForTeam = function (teamID, cb) {
                settingsService.GetSetting('SecurityUserID' + applicationService.loggedInSecurityUserID + 'TeamID' + teamID + 'currentUserTeamCampaignID', null, function (settingvalue) {
                    cb(settingvalue);
                });
            };

            campaignsService.setDefaultCampaignSelectionForTeam = function (teamID, campaignID, cb) {
                settingsService.SetSetting('SecurityUserID' + applicationService.loggedInSecurityUserID + 'TeamID' + teamID + 'currentUserTeamCampaignID', campaignID, function (data) {
                    cb();
                });
            };

            return campaignsService;

        }]);