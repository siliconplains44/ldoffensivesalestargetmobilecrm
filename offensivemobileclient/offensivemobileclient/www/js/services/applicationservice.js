var applicationService = angular.module('offensiveapp');

applicationService.factory('applicationservice',
    ['$http', 'utilityservice', 'settingsservice',
        function ($http, utilityService, settingsService) {

            var applicationService = {};

            applicationService.loggedInSecurityUserID = null;
            applicationService.currentTeamID = null;

            applicationService.setLoggedInUserID = function(loggedInSecurityUserID, cb) {
                applicationService.loggedInSecurityUserID = loggedInSecurityUserID;
                cb();
            };

            applicationService.getLoggedInSecurityUserID = function(cb) {
                cb(applicationService.loggedInSecurityUserID);
            };         

            applicationService.getCurrentTeam = function (cb) {
                settingsService.GetSetting(applicationService.loggedInSecurityUserID + 'CurrentTeamID', null, function (settingvalue) {
                    applicationService.currentTeamID = settingvalue;
                    cb(settingvalue);
                });
            };

            applicationService.setCurrentTeam = function (teamID, cb) {
                settingsService.SetSetting(applicationService.loggedInSecurityUserID + 'CurrentTeamID', teamID, function (data) {
                    applicationService.currentTeamID = teamID;
                    cb();
                });
            };

            return applicationService;

        }]);
