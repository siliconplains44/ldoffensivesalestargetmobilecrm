var mBusinessLogic = require('../bl');
var mDalX = require('../dalx');

/* Business Logic Methods */

module.exports.IsCurrentClientVersionValid = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

       if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.IsCurrentClientVersionValid(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in IsCurrentClientVersionValid' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.ActivateService = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ActivateService(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ActivateService' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};


module.exports.DeactivateService = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeactivateService(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeactivateService' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.LoginSystemUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

       if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.LoginSystemUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in LoginSystemUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.GetSetting = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.GetSetting(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in GetSetting' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.SetSetting = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.SetSetting(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in SetSetting' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};


module.exports.RetrieveHandle = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveHandle(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveHandle' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveHandleByName = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveHandleByName(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveHandleByName' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.UpdateHandle = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.UpdateHandle(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in UpdateHandle' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.IsHandlePartOfTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.IsHandlePartOfTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in IsHandlePartOfTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.IsSecurityUserAuthorizedToTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.IsSecurityUserAuthorizedToTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in IsSecurityUserAuthorizedToTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.DenyUserToTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DenyUserToTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DenyUserToTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.CreateTeamJoinRequest = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.CreateTeamJoinRequest(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in CreateTeamJoinRequest' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.UnjoinTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.UnjoinTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in UnjoinTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveAuthorizedTeams = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveAuthorizedTeams(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveAuthorizedTeams' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTeamJoinRequestsByTeamLead = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTeamJoinRequestsByTeamLead(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTeamJoinRequestsByTeamLead' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.AuthorizeUserToTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AuthorizeUserToTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AuthorizeUserToTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.DoesTeamExist = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DoesTeamExist(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DoesTeamExist' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.CreateTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.CreateTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in CreateTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.CreateTeamWithLead = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.CreateTeamWithLead(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in CreateTeamWithLead' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.ModifyTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTeamByTeamID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTeamByTeamID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTeamByTeamID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTeamsForSecurityUserThatAreNotActive = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTeamsForSecurityUserThatAreNotActive(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTeamsForSecurityUserThatAreNotActive' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTeamsLeadBySecurityUserID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTeamsLeadBySecurityUserID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTeamsLeadBySecurityUserID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.DeleteTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveNonLeadTeamMembersOfTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveNonLeadTeamMembersOfTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveNonLeadTeamMembersOfTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveLeadTeamMembersOfTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveLeadTeamMembersOfTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveLeadTeamMembersOfTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.IsSecurityUserLeadOfTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.IsSecurityUserLeadOfTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in IsSecurityUserLeadOfTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.AddTeamMember = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddTeamMember(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddTeamMember' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.SetTeamMemberAsLead = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.SetTeamMemberAsLead(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in SetTeamMemberAsLead' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RevokeTeamMemberAsLead = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RevokeTeamMemberAsLead(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RevokeTeamMemberAsLead' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveCampaignsByTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveCampaignsByTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveCampaignsByTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.AddCampaign = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddCampaign(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddCampaign' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};


module.exports.ModifyCampaign = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyCampaign(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyCampaign' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.DeleteCampaign = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteCampaign(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteCampaign' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveCampaignByCampaignID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveCampaignByCampaignID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveCampaignByCampaignID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.GetOrganizationByTeamID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.GetOrganizationByTeamID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in GetOrganizationByTeamID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.SetOrganizationByTeamID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.SetOrganizationByTeamID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in SetOrganizationByTeamID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.SetTeamOrganization = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.SetTeamOrganization(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in SetTeamOrganization' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddSalesTarget = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddSalesTarget(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddSalesTarget' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifySalesTarget = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifySalesTarget(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifySalesTarget' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteSalesTarget = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteSalesTarget(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteSalesTarget' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveSalesTargetsWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveSalesTargetsWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveSalesTargetsWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ShareSalesTargetWithTeamMember = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ShareSalesTargetWithTeamMember(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ShareSalesTargetWithTeamMember' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.UnshareSalesTargetWithTeamMember = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.UnshareSalesTargetWithTeamMember(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in UnshareSalesTargetWithTeamMember' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.IsSalesTargetSharedWithUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.IsSalesTargetSharedWithUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in IsSalesTargetSharedWithUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveSalesTargetsSharedWithUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveSalesTargetsSharedWithUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveSalesTargetsSharedWithUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveUsersWithSalesTargetShare = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveUsersWithSalesTargetShare(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveUsersWithSalesTargetShare' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddNote = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddNote(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddNote' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyNote = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyNote(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyNote' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteNote = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteNote(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteNote' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveNotesWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveNotesWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveNotesWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveActivityTypes = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveActivityTypes(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveActivityTypes' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddActivity = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddActivity(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddActivity' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyActivity = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyActivity(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyActivity' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteActivity = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteActivity(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteActivity' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveActivitiesWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveActivitiesWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveActivitiesWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddAddress = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddAddress(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddAddress' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyAddress = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyAddress(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyAddress' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteAddress = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteAddress(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteAddress' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveAddressesWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveAddressesWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveAddressesWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddEmailAddress = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddEmailAddress(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddEmailAddress' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyEmailAddress = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyEmailAddress(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyEmailAddress' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteEmailAddress = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteEmailAddress(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteEmailAddress' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveEmailAddressesWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveEmailAddressesWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveEmailAddressesWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddInstantMessengerAccount = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddInstantMessengerAccount(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddInstantMessengerAccount' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyInstantMessengerAccount = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyInstantMessengerAccount(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyInstantMessengerAccount' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteInstantMessengerAccount = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteInstantMessengerAccount(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteInstantMessengerAccount' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveInstantMessengerAccountsWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveInstantMessengerAccountsWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveInstantMessengerAccountsWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddPhoneNumber = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddPhoneNumber(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddPhoneNumber' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyPhoneNumber = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyPhoneNumber(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyPhoneNumber' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeletePhoneNumber = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeletePhoneNumber(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeletePhoneNumber' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrievePhoneNumbersWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrievePhoneNumbersWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrievePhoneNumbersWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddAttachment = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddAttachment(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddAttachment' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyAttachment = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyAttachment(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyAttachment' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteAttachment = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteAttachment(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteAttachment' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveAttachmentsWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveAttachmentsWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveAttachmentsWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddCalendarEvent = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddCalendarEvent(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddCalendarEvent' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyCalendarEvent = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyCalendarEvent(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyCalendarEvent' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteCalendarEvent = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteCalendarEvent(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteCalendarEvent' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveCalendarEventsWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveCalendarEventsWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveCalendarEventsWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddExpenses = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddExpenses(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddExpenses' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyExpenses = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyExpenses(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyExpenses' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteExpenses = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteExpenses(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteExpenses' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveExpensesWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveExpensesWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveExpensesWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddMileageLogEntry = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddMileageLogEntry(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddMileageLogEntry' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyMileageLogEntry = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyMileageLogEntry(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyMileageLogEntry' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteMileageLogEntry = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteMileageLogEntry(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteMileageLogEntry' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveMileageLogEntriesWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveMileageLogEntriesWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveMileageLogEntriesWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddIndividual = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddIndividual(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddIndividual' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyIndividual = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyIndividual(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyIndividual' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteIndividual = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteIndividual(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteIndividual' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveIndividualsWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveIndividualsWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveIndividualsWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddURI = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddURI(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddURI' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyURI = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyURI(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyURI' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteURI = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteURI(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteURI' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveURIsWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveURIsWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveURIsWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddDeal = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddDeal(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddDeal' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyDeal = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyDeal(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyDeal' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteDeal = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteDeal(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteDeal' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveDealsWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealsWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealsWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddQuote = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddQuote(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddQuote' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyQuote = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyQuote(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyQuote' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteQuote = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteQuote(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteQuote' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveQuotesWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveQuotesWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveQuotesWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.AddRevenueEntry = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddRevenueEntry(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddRevenueEntry' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.ModifyRevenueEntry = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyRevenueEntry(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyRevenueEntry' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.DeleteRevenueEntry = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DeleteRevenueEntry(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DeleteRevenueEntry' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};

module.exports.RetrieveRevenueEntrysWithFilter = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveRevenueEntrysWithFilter(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveRevenueEntrysWithFilter' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });
};


module.exports.StartUpload = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

       if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.StartUpload(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in StartUpload' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.UploadFilePart = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

       if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.UploadFilePart(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in UploadFilePart' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.FlagUploadComplete = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

       if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.FlagUploadComplete(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in FlagUploadComplete' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTimeFrameTypes = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTimeFrameTypes(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTimeFrameTypes' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveExpensesNotReimbursedByTeamID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveExpensesNotReimbursedByTeamID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveExpensesNotReimbursedByTeamID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveExpensesReimbursedByTeamID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveExpensesReimbursedByTeamID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveExpensesReimbursedByTeamID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.SetExpenseReimbursed = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.SetExpenseReimbursed(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in SetExpenseReimbursed' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.SetExpenseUnreimbursed = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.SetExpenseUnreimbursed(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in SetExpenseUnreimbursed' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveMileageLogEntriesNotReimbursedByTeamID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveMileageLogEntriesNotReimbursedByTeamID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveMileageLogEntriesNotReimbursedByTeamID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveMileageLogEntriesReimbursedByTeamID = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveMileageLogEntriesReimbursedByTeamID(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveMileageLogEntriesReimbursedByTeamID' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.SetMileageLogEntryReimbursed = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.SetMileageLogEntryReimbursed(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in SetMileageLogEntryReimbursed' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.SetMileageLogEntryUnreimbursed = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.SetMileageLogEntryUnreimbursed(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in SetMileageLogEntryUnreimbursed' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTeamSalesTargetsWithRevenueAmounts = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTeamSalesTargetsWithRevenueAmounts(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTeamSalesTargetsWithRevenueAmounts' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.UpdateSalesTargetRevenueAmountForPeriodYearAndMonth = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.UpdateSalesTargetRevenueAmountForPeriodYearAndMonth(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in UpdateSalesTargetRevenueAmountForPeriodYearAndMonth' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.AddSalesTargetStageChangeLogEntries = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.AddSalesTargetStageChangeLogEntries(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in AddSalesTargetStageChangeLogEntries' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalAccountsCountForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalAccountsCountForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalAccountsCountForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalAccountsByMonthForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalAccountsByMonthForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalAccountsByMonthForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalNewSalesTargetsForMonthForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalNewSalesTargetsForMonthForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalNewSalesTargetsForMonthForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalNewSalesTargetsForPreviousMonthsForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalNewSalesTargetsForPreviousMonthsForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalNewSalesTargetsForPreviousMonthsForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveQuotesSentForMonthByUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveQuotesSentForMonthByUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveQuotesSentForMonthByUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveQuotesSentForPreviousMonthsByUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveQuotesSentForPreviousMonthsByUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveQuotesSentForPreviousMonthsByUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealEstimateCountForMonthForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealEstimateCountForMonthForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealEstimateCountForMonthForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealEstimateCountForPreviousMonthsForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealEstimateCountForPreviousMonthsForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealEstimateCountForPreviousMonthsForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealCountForMonthForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealCountForMonthForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealCountForMonthForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealCountForPreviousMonthsForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealCountForPreviousMonthsForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealCountForPreviousMonthsForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealValueForMonthForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealValueForMonthForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealValueForMonthForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealValueForPreviousMonthsForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealValueForPreviousMonthsForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealValueForPreviousMonthsForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveRevenueForThisMonthForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveRevenueForThisMonthForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveRevenueForThisMonthForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveRevenueForPreviousMonthsForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveRevenueForPreviousMonthsForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveRevenueForPreviousMonthsForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrievePipelineTotalsForMonthForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrievePipelineTotalsForMonthForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrievePipelineTotalsForMonthForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveSalesTargetsAllocatedAcrossPipeline = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveSalesTargetsAllocatedAcrossPipeline(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveSalesTargetsAllocatedAcrossPipeline' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveActivityDataForUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveActivityDataForUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveActivityDataForUser' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalAccountsCountForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalAccountsCountForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalAccountsCountForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalAccountsByMonthForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalAccountsByMonthForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalAccountsByMonthForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalNewSalesTargetsForMonthForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalNewSalesTargetsForMonthForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalNewSalesTargetsForMonthForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveQuotesSentForMonthByTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveQuotesSentForMonthByTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveQuotesSentForMonthByTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveQuotesSentForPreviousMonthsByTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveQuotesSentForPreviousMonthsByTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveQuotesSentForPreviousMonthsByTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealEstimateCountForMonthForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealEstimateCountForMonthForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealEstimateCountForMonthForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealEstimateCountForPreviousMonthsForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealEstimateCountForPreviousMonthsForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealEstimateCountForPreviousMonthsForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealCountForMonthForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealCountForMonthForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealCountForMonthForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealCountForPreviousMonthsForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealCountForPreviousMonthsForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealCountForPreviousMonthsForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealValueForMonthForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealValueForMonthForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealValueForMonthForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveDealValueForPreviousMonthsForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveDealValueForPreviousMonthsForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveDealValueForPreviousMonthsForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveRevenueForThisMonthForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveRevenueForThisMonthForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveRevenueForThisMonthForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveRevenueForPreviousMonthsForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveRevenueForPreviousMonthsForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveRevenueForPreviousMonthsForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrievePipelineTotalsForMonthForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrievePipelineTotalsForMonthForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrievePipelineTotalsForMonthForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveSalesTargetsAllocatedAcrossPipelineForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveSalesTargetsAllocatedAcrossPipelineForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveSalesTargetsAllocatedAcrossPipelineForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.RetrieveActivityDataForTeam = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveActivityDataForTeam(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveActivityDataForTeam' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.CopyFile = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.CopyFile(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in CopyFile' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.StartFileDownload = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

       if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.StartFileDownload(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in StartFileDownload' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};

module.exports.DownloadFilePart = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

       if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.DownloadFilePart(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in DownloadFilePart' + err);
                    jsonObjectResult.err = err;
                    jsonObjectResult.result = false;
                }
                else {
                    jsonObjectResult.result = true;
                    jsonObjectResult.outData = outData;
                }

                res.json(200, jsonObjectResult);
            });
        }
    });

};


module.exports.loadRoutes = function(app, ajaj) {
    app.post('/ajaj/IsCurrentClientVersionValid', ajaj.IsCurrentClientVersionValid);
    app.post('/ajaj/ActivateService', ajaj.ActivateService);
    app.post('/ajaj/DeactivateService', ajaj.DeactivateService);
    app.post('/ajaj/LoginSystemUser', ajaj.LoginSystemUser);

    app.post('/ajaj/GetSetting', ajaj.GetSetting);
    app.post('/ajaj/SetSetting', ajaj.SetSetting);

    app.post('/ajaj/RetrieveHandle', ajaj.RetrieveHandle);
    app.post('/ajaj/RetrieveHandleByName', ajaj.RetrieveHandleByName);
    app.post('/ajaj/UpdateHandle', ajaj.UpdateHandle);
    app.post('/ajaj/IsHandlePartOfTeam', ajaj.IsHandlePartOfTeam);

    app.post('/ajaj/IsSecurityUserAuthorizedToTeam', ajaj.IsSecurityUserAuthorizedToTeam);
    app.post('/ajaj/CreateTeamJoinRequest', ajaj.CreateTeamJoinRequest);
    app.post('/ajaj/UnjoinTeam', ajaj.UnjoinTeam);
    app.post('/ajaj/RetrieveAuthorizedTeams', ajaj.RetrieveAuthorizedTeams);
    app.post('/ajaj/RetrieveTeamJoinRequestsByTeamLead', ajaj.RetrieveTeamJoinRequestsByTeamLead);
    app.post('/ajaj/AuthorizeUserToTeam', ajaj.AuthorizeUserToTeam);
    app.post('/ajaj/DenyUserToTeam', ajaj.DenyUserToTeam);

    app.post('/ajaj/DoesTeamExist', ajaj.DoesTeamExist);
    app.post('/ajaj/CreateTeam', ajaj.CreateTeam);
    app.post('/ajaj/CreateTeamWithLead', ajaj.CreateTeamWithLead);
    app.post('/ajaj/ModifyTeam', ajaj.ModifyTeam);
    app.post('/ajaj/RetrieveTeamByTeamID', ajaj.RetrieveTeamByTeamID);
    app.post('/ajaj/RetrieveTeamsForSecurityUserThatAreNotActive', ajaj.RetrieveTeamsForSecurityUserThatAreNotActive);
    app.post('/ajaj/RetrieveTeamsLeadBySecurityUserID', ajaj.RetrieveTeamsLeadBySecurityUserID);
    app.post('/ajaj/DeleteTeam', ajaj.DeleteTeam);

    app.post('/ajaj/RetrieveNonLeadTeamMembersOfTeam', ajaj.RetrieveNonLeadTeamMembersOfTeam);
    app.post('/ajaj/RetrieveLeadTeamMembersOfTeam', ajaj.RetrieveLeadTeamMembersOfTeam);
    app.post('/ajaj/IsSecurityUserLeadOfTeam', ajaj.IsSecurityUserLeadOfTeam);

    app.post('/ajaj/AddTeamMember', ajaj.AddTeamMember);

    app.post('/ajaj/SetTeamMemberAsLead', ajaj.SetTeamMemberAsLead);
    app.post('/ajaj/RevokeTeamMemberAsLead', ajaj.RevokeTeamMemberAsLead);

    app.post('/ajaj/RetrieveCampaignsByTeam', ajaj.RetrieveCampaignsByTeam);
    app.post('/ajaj/AddCampaign', ajaj.AddCampaign);
    app.post('/ajaj/ModifyCampaign', ajaj.ModifyCampaign);
    app.post('/ajaj/DeleteCampaign', ajaj.DeleteCampaign);
    app.post('/ajaj/RetrieveCampaignByCampaignID', ajaj.RetrieveCampaignByCampaignID);

    app.post('/ajaj/GetOrganizationByTeamID', ajaj.GetOrganizationByTeamID);
    app.post('/ajaj/SetOrganizationByTeamID', ajaj.SetOrganizationByTeamID);

    app.post('/ajaj/SetTeamOrganization', ajaj.SetTeamOrganization);

    app.post('/ajaj/AddSalesTarget', ajaj.AddSalesTarget);
    app.post('/ajaj/ModifySalesTarget', ajaj.ModifySalesTarget);
    app.post('/ajaj/DeleteSalesTarget', ajaj.DeleteSalesTarget);
    app.post('/ajaj/RetrieveSalesTargetsWithFilter', ajaj.RetrieveSalesTargetsWithFilter);

    app.post('/ajaj/ShareSalesTargetWithTeamMember', ajaj.ShareSalesTargetWithTeamMember);
    app.post('/ajaj/UnshareSalesTargetWithTeamMember', ajaj.UnshareSalesTargetWithTeamMember);
    app.post('/ajaj/IsSalesTargetSharedWithUser', ajaj.IsSalesTargetSharedWithUser);
    app.post('/ajaj/RetrieveSalesTargetsSharedWithUser', ajaj.RetrieveSalesTargetsSharedWithUser);
    app.post('/ajaj/RetrieveUsersWithSalesTargetShare', ajaj.RetrieveUsersWithSalesTargetShare);

    app.post('/ajaj/AddNote', ajaj.AddNote);
    app.post('/ajaj/ModifyNote', ajaj.ModifyNote);
    app.post('/ajaj/DeleteNote', ajaj.DeleteNote);
    app.post('/ajaj/RetrieveNotesWithFilter', ajaj.RetrieveNotesWithFilter);

    app.post('/ajaj/RetrieveActivityTypes', ajaj.RetrieveActivityTypes);

    app.post('/ajaj/AddActivity', ajaj.AddActivity);
    app.post('/ajaj/ModifyActivity', ajaj.ModifyActivity);
    app.post('/ajaj/DeleteActivity', ajaj.DeleteActivity);
    app.post('/ajaj/RetrieveActivitiesWithFilter', ajaj.RetrieveActivitiesWithFilter);

    app.post('/ajaj/AddAddress', ajaj.AddAddress);
    app.post('/ajaj/ModifyAddress', ajaj.ModifyAddress);
    app.post('/ajaj/DeleteAddress', ajaj.DeleteAddress);
    app.post('/ajaj/RetrieveAddressesWithFilter', ajaj.RetrieveAddressesWithFilter);

    app.post('/ajaj/AddEmailAddress', ajaj.AddEmailAddress);
    app.post('/ajaj/ModifyEmailAddress', ajaj.ModifyEmailAddress);
    app.post('/ajaj/DeleteEmailAddress', ajaj.DeleteEmailAddress);
    app.post('/ajaj/RetrieveEmailAddressesWithFilter', ajaj.RetrieveEmailAddressesWithFilter);

    app.post('/ajaj/AddInstantMessengerAccount', ajaj.AddInstantMessengerAccount);
    app.post('/ajaj/ModifyInstantMessengerAccount', ajaj.ModifyInstantMessengerAccount);
    app.post('/ajaj/DeleteInstantMessengerAccount', ajaj.DeleteInstantMessengerAccount);
    app.post('/ajaj/RetrieveInstantMessengerAccountsWithFilter', ajaj.RetrieveInstantMessengerAccountsWithFilter);

    app.post('/ajaj/AddPhoneNumber', ajaj.AddPhoneNumber);
    app.post('/ajaj/ModifyPhoneNumber', ajaj.ModifyPhoneNumber);
    app.post('/ajaj/DeletePhoneNumber', ajaj.DeletePhoneNumber);
    app.post('/ajaj/RetrievePhoneNumbersWithFilter', ajaj.RetrievePhoneNumbersWithFilter);

    app.post('/ajaj/AddAttachment', ajaj.AddAttachment);
    app.post('/ajaj/ModifyAttachment', ajaj.ModifyAttachment);
    app.post('/ajaj/DeleteAttachment', ajaj.DeleteAttachment);
    app.post('/ajaj/RetrieveAttachmentsWithFilter', ajaj.RetrieveAttachmentsWithFilter);

    app.post('/ajaj/AddCalendarEvent', ajaj.AddCalendarEvent);
    app.post('/ajaj/ModifyCalendarEvent', ajaj.ModifyCalendarEvent);
    app.post('/ajaj/DeleteCalendarEvent', ajaj.DeleteCalendarEvent);
    app.post('/ajaj/RetrieveCalendarEventsWithFilter', ajaj.RetrieveCalendarEventsWithFilter);

    app.post('/ajaj/AddExpenses', ajaj.AddExpenses);
    app.post('/ajaj/ModifyExpenses', ajaj.ModifyExpenses);
    app.post('/ajaj/DeleteExpenses', ajaj.DeleteExpenses);
    app.post('/ajaj/RetrieveExpensesWithFilter', ajaj.RetrieveExpensesWithFilter);

    app.post('/ajaj/AddMileageLogEntry', ajaj.AddMileageLogEntry);
    app.post('/ajaj/ModifyMileageLogEntry', ajaj.ModifyMileageLogEntry);
    app.post('/ajaj/DeleteMileageLogEntry', ajaj.DeleteMileageLogEntry);
    app.post('/ajaj/RetrieveMileageLogEntriesWithFilter', ajaj.RetrieveMileageLogEntriesWithFilter);

    app.post('/ajaj/AddIndividual', ajaj.AddIndividual);
    app.post('/ajaj/ModifyIndividual', ajaj.ModifyIndividual);
    app.post('/ajaj/DeleteIndividual', ajaj.DeleteIndividual);
    app.post('/ajaj/RetrieveIndividualsWithFilter', ajaj.RetrieveIndividualsWithFilter);

    app.post('/ajaj/AddURI', ajaj.AddURI);
    app.post('/ajaj/ModifyURI', ajaj.ModifyURI);
    app.post('/ajaj/DeleteURI', ajaj.DeleteURI);
    app.post('/ajaj/RetrieveURIsWithFilter', ajaj.RetrieveURIsWithFilter);

    app.post('/ajaj/AddDeal', ajaj.AddDeal);
    app.post('/ajaj/ModifyDeal', ajaj.ModifyDeal);
    app.post('/ajaj/DeleteDeal', ajaj.DeleteDeal);
    app.post('/ajaj/RetrieveDealsWithFilter', ajaj.RetrieveDealsWithFilter);

    app.post('/ajaj/AddQuote', ajaj.AddQuote);
    app.post('/ajaj/ModifyQuote', ajaj.ModifyQuote);
    app.post('/ajaj/DeleteQuote', ajaj.DeleteQuote);
    app.post('/ajaj/RetrieveQuotesWithFilter', ajaj.RetrieveQuotesWithFilter);

    app.post('/ajaj/AddRevenueEntry', ajaj.AddRevenueEntry);
    app.post('/ajaj/ModifyRevenueEntry', ajaj.ModifyRevenueEntry);
    app.post('/ajaj/DeleteRevenueEntry', ajaj.DeleteRevenueEntry);
    app.post('/ajaj/RetrieveRevenueEntrysWithFilter', ajaj.RetrieveRevenueEntrysWithFilter);

    app.post('/ajaj/RetrieveTimeFrameTypes', ajaj.RetrieveTimeFrameTypes);

    app.post('/ajaj/RetrieveExpensesNotReimbursedByTeamID', ajaj.RetrieveExpensesNotReimbursedByTeamID);
    app.post('/ajaj/RetrieveExpensesReimbursedByTeamID', ajaj.RetrieveExpensesReimbursedByTeamID);
    app.post('/ajaj/SetExpenseReimbursed', ajaj.SetExpenseReimbursed);
    app.post('/ajaj/SetExpenseUnreimbursed', ajaj.SetExpenseUnreimbursed);

    app.post('/ajaj/RetrieveMileageLogEntriesNotReimbursedByTeamID', ajaj.RetrieveMileageLogEntriesNotReimbursedByTeamID);
    app.post('/ajaj/RetrieveMileageLogEntriesReimbursedByTeamID', ajaj.RetrieveMileageLogEntriesReimbursedByTeamID);
    app.post('/ajaj/SetMileageLogEntryReimbursed', ajaj.SetMileageLogEntryReimbursed);
    app.post('/ajaj/SetMileageLogEntryUnreimbursed', ajaj.SetMileageLogEntryUnreimbursed);

    app.post('/ajaj/RetrieveTeamSalesTargetsWithRevenueAmounts', ajaj.RetrieveTeamSalesTargetsWithRevenueAmounts);
    app.post('/ajaj/UpdateSalesTargetRevenueAmountForPeriodYearAndMonth', ajaj.UpdateSalesTargetRevenueAmountForPeriodYearAndMonth);

    app.post('/ajaj/AddSalesTargetStageChangeLogEntries', ajaj.AddSalesTargetStageChangeLogEntries);

    // user (my reports)

    app.post('/ajaj/RetrieveTotalAccountsCountForUser', ajaj.RetrieveTotalAccountsCountForUser);
    app.post('/ajaj/RetrieveTotalAccountsByMonthForUser', ajaj.RetrieveTotalAccountsByMonthForUser);
    app.post('/ajaj/RetrieveTotalNewSalesTargetsForMonthForUser', ajaj.RetrieveTotalNewSalesTargetsForMonthForUser);
    app.post('/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser', ajaj.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser);
    app.post('/ajaj/RetrieveTotalNewSalesTargetsForPreviousMonthsForUser', ajaj.RetrieveTotalNewSalesTargetsForPreviousMonthsForUser);
    app.post('/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser', ajaj.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser);
    app.post('/ajaj/RetrieveQuotesSentForMonthByUser', ajaj.RetrieveQuotesSentForMonthByUser);
    app.post('/ajaj/RetrieveQuotesSentForPreviousMonthsByUser', ajaj.RetrieveQuotesSentForPreviousMonthsByUser);
    app.post('/ajaj/RetrieveDealEstimateCountForMonthForUser', ajaj.RetrieveDealEstimateCountForMonthForUser);
    app.post('/ajaj/RetrieveDealEstimateCountForPreviousMonthsForUser', ajaj.RetrieveDealEstimateCountForPreviousMonthsForUser);
    app.post('/ajaj/RetrieveDealCountForMonthForUser', ajaj.RetrieveDealCountForMonthForUser);
    app.post('/ajaj/RetrieveDealCountForPreviousMonthsForUser', ajaj.RetrieveDealCountForPreviousMonthsForUser);
    app.post('/ajaj/RetrieveDealValueForMonthForUser', ajaj.RetrieveDealValueForMonthForUser);
    app.post('/ajaj/RetrieveDealValueForPreviousMonthsForUser', ajaj.RetrieveDealValueForPreviousMonthsForUser);
    app.post('/ajaj/RetrieveRevenueForThisMonthForUser', ajaj.RetrieveRevenueForThisMonthForUser);
    app.post('/ajaj/RetrieveRevenueForPreviousMonthsForUser', ajaj.RetrieveRevenueForPreviousMonthsForUser);

    app.post('/ajaj/RetrievePipelineTotalsForMonthForUser', ajaj.RetrievePipelineTotalsForMonthForUser);
    app.post('/ajaj/RetrieveSalesTargetsAllocatedAcrossPipeline', ajaj.RetrieveSalesTargetsAllocatedAcrossPipeline);

    app.post('/ajaj/RetrieveActivityDataForUser', ajaj.RetrieveActivityDataForUser);

    // team reports

    app.post('/ajaj/RetrieveTotalAccountsCountForTeam', ajaj.RetrieveTotalAccountsCountForTeam);
    app.post('/ajaj/RetrieveTotalAccountsByMonthForTeam', ajaj.RetrieveTotalAccountsByMonthForTeam);
    app.post('/ajaj/RetrieveTotalNewSalesTargetsForMonthForTeam', ajaj.RetrieveTotalNewSalesTargetsForMonthForTeam);
    app.post('/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam', ajaj.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam);
    app.post('/ajaj/RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam', ajaj.RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam);
    app.post('/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam', ajaj.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam);
    app.post('/ajaj/RetrieveQuotesSentForMonthByTeam', ajaj.RetrieveQuotesSentForMonthByTeam);
    app.post('/ajaj/RetrieveQuotesSentForPreviousMonthsByTeam', ajaj.RetrieveQuotesSentForPreviousMonthsByTeam);
    app.post('/ajaj/RetrieveDealEstimateCountForMonthForTeam', ajaj.RetrieveDealEstimateCountForMonthForTeam);
    app.post('/ajaj/RetrieveDealEstimateCountForPreviousMonthsForTeam', ajaj.RetrieveDealEstimateCountForPreviousMonthsForTeam);
    app.post('/ajaj/RetrieveDealCountForMonthForTeam', ajaj.RetrieveDealCountForMonthForTeam);
    app.post('/ajaj/RetrieveDealCountForPreviousMonthsForTeam', ajaj.RetrieveDealCountForPreviousMonthsForTeam);
    app.post('/ajaj/RetrieveDealValueForMonthForTeam', ajaj.RetrieveDealValueForMonthForTeam);
    app.post('/ajaj/RetrieveDealValueForPreviousMonthsForTeam', ajaj.RetrieveDealValueForPreviousMonthsForTeam);
    app.post('/ajaj/RetrieveRevenueForThisMonthForTeam', ajaj.RetrieveRevenueForThisMonthForTeam);
    app.post('/ajaj/RetrieveRevenueForPreviousMonthsForTeam', ajaj.RetrieveRevenueForPreviousMonthsForTeam);

    app.post('/ajaj/RetrievePipelineTotalsForMonthForTeam', ajaj.RetrievePipelineTotalsForMonthForTeam);
    app.post('/ajaj/RetrieveSalesTargetsAllocatedAcrossPipelineForTeam', ajaj.RetrieveSalesTargetsAllocatedAcrossPipelineForTeam);

    app.post('/ajaj/RetrieveActivityDataForTeam', ajaj.RetrieveActivityDataForTeam);

    // document management

    app.post('/ajaj/CopyFile', ajaj.CopyFile);
    app.post('/ajaj/StartFileDownload', ajaj.StartFileDownload);
    app.post('/ajaj/DownloadFilePart', ajaj.DownloadFilePart);

};