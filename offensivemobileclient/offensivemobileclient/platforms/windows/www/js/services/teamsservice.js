var teamsService = angular.module('offensiveapp')

teamsService.factory('teamsservice',
    ['$http', 'utilityservice',
        function ($http, utilityService) {
            
            var teamsService = {};

            teamsService.createTeamJoinRequest = function (securityUserID, teamName, cb) {
                TeamJoinRequest = {};
                TeamJoinRequest.TeamJoinRequestID = -1;
                TeamJoinRequest.TeamID = -1;
                TeamJoinRequest.SecurityUserID = securityUserID;
                TeamJoinRequest.RequestAuthorized = 0;
                TeamJoinRequest.RequestAuthorizedBySecurityuserID = -1;                

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamname = teamName;
                objectToSend.TeamJoinRequest = TeamJoinRequest;

                var res = $http.post(utilityService.baseUrl + '/ajaj/CreateTeamJoinRequest', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            teamsService.unJoinTeam = function (teamMemberID, cb) {
                TeamMember = {};
                TeamMember.TeamMemberID = teamMemberID;
                TeamMember.TeamID = -1;
                TeamMember.SecurityUserID = -1;
                TeamMember.Created = null;
                TeamMember.IsActive = 0;
                TeamMember.IsDeleted = 0;

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.TeamMember = TeamMember;

                var res = $http.post(utilityService.baseUrl + '/ajaj/UnjoinTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {                    
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            teamsService.retrieveAuthorizedTeams = function (securityUserID, cb) {                

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveAuthorizedTeams', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            teamsService.doesTeamExist = function (teamName, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.name = teamName;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DoesTeamExist', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            };

            teamsService.createTeam = function (teamName, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamname = teamName;

                var res = $http.post(utilityService.baseUrl + '/ajaj/CreateTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.addTeamMember = function (teamID, securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;
                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddTeamMember', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.setTeamMemberAsLead = function (teamMemberID, teamID, cb) {
                
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;
                objectToSend.teammemberid = teamMemberID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/SetTeamMemberAsLead', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.retrieveTeamByTeamID = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTeamByTeamID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.retrieveTeamsForSecurityUserThatAreNotActive = function (securityUserID, currentTeamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.currentteamid = currentTeamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTeamsForSecurityUserThatAreNotActive', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.retrieveTeamJoinRequestsByTeamLead = function (securityUserID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;                

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTeamJoinRequestsByTeamLead', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.authorizeUserToTeam = function (securityUserID, teamjoinrequestID, teamID, securityUserIDTeamMember, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamjoinrequestid = teamjoinrequestID;
                objectToSend.TeamMember = {};
                objectToSend.TeamMember.TeamMemberID = -1;
                objectToSend.TeamMember.TeamID = teamID;
                objectToSend.TeamMember.SecurityUserID = securityUserIDTeamMember;
                objectToSend.TeamMember.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                objectToSend.TeamMember.IsActive = 1;
                objectToSend.TeamMember.IsDeleted = 0;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AuthorizeUserToTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.denyUserToTeam = function (teamjoinrequestID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamjoinrequestid = teamjoinrequestID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DenyUserToTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.retrieveTeamsLeadBySecurityUserID = function (securityUserID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTeamsLeadBySecurityUserID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.createTeamWithLead = function (teamName, securityUserID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamname = teamName;
                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/CreateTeamWithLead', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.deleteTeam = function (teamID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;                

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.modifyTeam = function (teamID, teamName, cb) {
                teamsService.retrieveTeamByTeamID(teamID, function (data) {
                    var team = data.outData.team;

                    team.Name = teamName;

                    var objectToSend = utilityService.buildObjectToSend();

                    objectToSend.team = team;

                    var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyTeam', JSON.stringify(objectToSend));
                    res.success(function (data, status, headers, config) {
                        cb(data);
                    });
                    res.error(function (data, status, headers, config) {
                        console.log("failure message: " + JSON.stringify({ data: data }));
                        cb(data);
                    });
                });
            }

            teamsService.retrieveNonLeadTeamMembersOfTeam = function (teamID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveNonLeadTeamMembersOfTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.retrieveLeadTeamMembersOfTeam = function (teamID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveLeadTeamMembersOfTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.isSecurityUserLeadOfTeam = function (teamID, securityUserID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;
                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/IsSecurityUserLeadOfTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.retrieveHandle = function (securityUserID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveHandle', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.retrieveHandleByName = function (name, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.name = name;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveHandleByName', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.isHandlePartOfTeam = function (teamID, name, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.name = name;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/IsHandlePartOfTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.updateHandle = function (securityUserID, handleName, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.handlename = handleName;

                var res = $http.post(utilityService.baseUrl + '/ajaj/UpdateHandle', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.getOrganizationByTeamID = function (teamID, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;
               
                var res = $http.post(utilityService.baseUrl + '/ajaj/GetOrganizationByTeamID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            teamsService.setOrganizationByTeamID = function (teamID, name, type, cb) {
                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;
                objectToSend.name = name;
                objectToSend.type = type;

                var res = $http.post(utilityService.baseUrl + '/ajaj/SetOrganizationByTeamID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });
            }

            return teamsService;

        }]);
