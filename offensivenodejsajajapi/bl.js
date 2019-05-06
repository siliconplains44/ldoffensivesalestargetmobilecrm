
var mDataAccessLayerXPooled = require('./dalxpooled');
var async = require('async');
var requestenhanced = require('request-enhanced');
var config = require('./config');
var moment = require('moment');

var winston = require('winston');
require('winston-email');

winston.loggers.add('logger', {
    email: {
        from   : 'inquiries@leoparddata.com',
        to     : 'allan@leoparddata.com',
        service: 'Gmail',
        auth   : { user: 'inquiries@leoparddata.com', pass: 'anniswonderful00'},
        tags   : ['sales target service'] //optional tags for the subject
    }
    // other transports
});

logger = winston.loggers.get('logger');

function businessLogic() {

};

businessLogic.prototype.postAjaj = function(url, objectToSend, cb) {

    var default_headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux i686; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-us,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
        // 'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Content-Type': "application/json; charset=utf-8"
    };

    requestenhanced.get({
        url: url,
        headers: default_headers,
        method: 'POST',
        body: JSON.stringify(objectToSend),
        rejectUnauthorized: false,
        timeout: 250000
    }, function (err, res, body) {

        if (err) {
            console.log(err);
            console.trace();
        }

        cb(err, res, res);
    });

};

businessLogic.prototype.authenticateApiUser = function(apiUsername, apiPassword, cb) {
    var self = this;

    if (config.webserviceusername === apiUsername &&
        config.webservicepassword === apiPassword) {
        cb(true);
    }
    else {
        cb(false);
    }

};

businessLogic.prototype.IsCurrentClientVersionValid = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    dataAccessLayerX.openConnection(function(err) {
        if (!err) {
            dataAccessLayerX.executeQuery(
                    ' SELECT * FROM CompatibleClients WHERE VersionMajor = ' + inData.majorversion +
                        ' AND VersionMinor = ' + inData.minorversion,
                function (err, rows, fields) {

                    dataAccessLayerX.closeConnection();

                    if (rows.length > 0) {
                        if (rows[0].IsSupported == 1) {
                            cb(err, true, true);
                        }
                        else {
                            cb(err, true, false);
                        }
                    }
                    else {
                        cb(err, false, null);
                    }
                });
        }
        else {
            logger.log('error', arguments.callee.toString(), err);
            console.log(err);
            console.trace();
            cb(err, false, null);
        }
    });
};

businessLogic.prototype.ActivateService = function(inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {

                var sqlQueryStatement = "SELECT * FROM SecurityUsers WHERE ExternalSecurityUserId = ";
                sqlQueryStatement += inData.securityuserid;

                dataAccessLayerX.executeQuery(sqlQueryStatement, function(err, rows, fields) {

                    if (rows.length == 0) {
                        var securityUser = {};
                        securityUser.ExternalSecurityUserId = inData.securityuserid;
                        securityUser.IsEnabled = 1;

                        dataAccessLayerX.addSecurityUser(securityUser, function(err, result) {
                            cb(err, null);
                        });
                    }
                    else {
                        var sqlStatement = "UPDATE SecurityUsers Set IsEnabled = 1 WHERE ExternalSecurityUserId = ";
                        sqlStatement += inData.securityuserid;

                        dataAccessLayerX.executeStatement(sqlStatement, function(err, rows, fields) {
                            cb(err, null);
                        });
                    }
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeactivateService = function(inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlStatement = "UPDATE SecurityUsers Set IsEnabled = 0 WHERE ExternalSecurityUserId = ";
                sqlStatement += inData.securityuserid;

                dataAccessLayerX.executeStatement(sqlStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.LoginSystemUser = function (inData, cb) { // forward to security serice
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    var users = null;

    async.series([
            function(cb) {
                var objectToSend = {};

                objectToSend.apiusername = config.securityserviceapiusername;
                objectToSend.apipassword = config.securityserviceapipassword;

                objectToSend.username = inData.username;
                objectToSend.password = inData.password;

                self.postAjaj(config.securityserviceapiurl + '/ajaj/AuthenticateSystemUser', objectToSend, function(err, res, body) {
                    var jsonObjectReceived = JSON.parse(body);

                    if (jsonObjectReceived.result == true) {
                        if (jsonObjectReceived.outData.loginresult == false) {
                            jsonObjectToReturn.loginresult = jsonObjectReceived.outData.loginresult;
                            cb('unable to login to security service', null);
                        }
                        else {
                            jsonObjectToReturn.loginresult = jsonObjectReceived.outData.loginresult;
                            jsonObjectToReturn.securityuserid = jsonObjectReceived.outData.securityuserid;
                            cb(null, null);
                        }
                    } else {
                        jsonObjectToReturn.loginresult = false;
                        cb('unable to login to security service', null);
                    }
                });
            },
            function (cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlWhereClause = " ExternalSecurityUserId = " + jsonObjectToReturn.securityuserid + ' AND IsEnabled = 1 ';

                dataAccessLayerX.retrieveWithWhereClauseSecurityUser(sqlWhereClause, function(err, rows, fields) {
                    if (!err) {
                        dataAccessLayerX.closeConnection();

                        if (rows.length > 0) {
                            cb(null, null);
                        }
                        else {
                            cb('invalid offensive user', null);
                        }
                    }
                    else {
                        cb(err, null)
                    }
                });
            },
            function (cb) {
                var objectToSend = {};

                objectToSend.apiusername = config.securityserviceapiusername;
                objectToSend.apipassword = config.securityserviceapipassword;

                objectToSend.SecurityUserInteraction =  { };

                objectToSend.SecurityUserInteraction.SystemComponentId = 14;
                objectToSend.SecurityUserInteraction.SecurityUserId = jsonObjectToReturn.securityuserid;
                objectToSend.SecurityUserInteraction.SecurityUserInteractionTypeId = 21;
                objectToSend.SecurityUserInteraction.Occurred = new Date().toISOString().slice(0, 19).replace('T', ' ');

                self.postAjaj(config.securityserviceapiurl + '/ajaj/LogSecurityUserInteraction', objectToSend, function(err, res, body) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err === true) {
                cb(null, true, jsonObjectToReturn);
            }
            else if (err) {

                if (err != 'unable to login to security service') {
                    logger.log('error', arguments.callee.toString(), err);
                    console.log(err);
                    console.trace();

                    cb(err, false, jsonObjectToReturn);
                }
                else {
                    cb(null, true, jsonObjectToReturn);
                }

            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.GetSetting = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM settings WHERE Name = '" + inData.settingname + "'";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            jsonObjectToReturn.settingvalue = rows[0].Value;
                        }
                        else {
                            jsonObjectToReturn.settingvalue = null;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.SetSetting = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var settingvalue = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM settings WHERE Name = '" + inData.settingname + "'";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            settingvalue = rows[0].Value;
                        }
                        else {
                            settingvalue = null;
                        }
                    }
                    cb(err, null);
                });
            },
            function (cb) {
                if (settingvalue == null) {
                    var Setting = {};

                    Setting.Name = inData.settingname;
                    Setting.Value = inData.settingvalue;

                    dataAccessLayerX.addSetting(Setting, function(err, result) {
                        cb(err, null);
                    });
                }
                else {
                    var sqlUpdateStatement = "UPDATE settings SET Value = '" + inData.settingvalue + "' ";
                    sqlUpdateStatement += " WHERE name = '" + inData.settingname + "'";

                    dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                        cb(err, null);
                    });
                }
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveHandle = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM handles WHERE SecurityUserID = " + inData.securityuserid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            jsonObjectToReturn.handle = rows[0].Name;
                        }
                        else {
                            jsonObjectToReturn.handle = null;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveHandleByName = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM handles WHERE Name = '" + inData.name + "'";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            jsonObjectToReturn.handle = rows[0];
                        }
                        else {
                            jsonObjectToReturn.handle = null;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.UpdateHandle = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var handlename = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM handles WHERE SecurityUserID = " + inData.securityuserid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            handlename = rows[0].Name;
                        }
                        else {
                            handlename = null;
                        }
                    }
                    cb(err, null);
                });
            },
            function (cb) {
                if (handlename == null) {
                    var Handle = {};

                    Handle.Name = inData.handlename;
                    Handle.SecurityUserID = inData.securityuserid;

                    dataAccessLayerX.addHandle(Handle, function(err, result) {
                        cb(err, null);
                    });
                }
                else {
                    var sqlUpdateStatement = "UPDATE handles SET Name = '" + inData.handlename + "' ";
                    sqlUpdateStatement += " WHERE SecurityUserId = '" + inData.securityuserid + "'";

                    dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                        cb(err, null);
                    });
                }
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.IsHandlePartOfTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                jsonObjectToReturn.partofteam = false;

                var sqlSelectStatement = " select * from teammembers tms INNER JOIN handles h ON h.SecurityUserID = tms.SecurityUserID ";
                sqlSelectStatement += " WHERE tms.IsDeleted = 0 AND TeamID = " + inData.teamid + " AND h.`Name` = '" + inData.name + "'";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            jsonObjectToReturn.partofteam = true;
                            jsonObjectToReturn.securityuserid = rows[0].SecurityUserID;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.IsSecurityUserAuthorizedToTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM teammembers WHERE SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND TeamID = " + inData.teamid + "  AND IsDeleted = 0 ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            if (rows[0].IsActive == 1) {
                                jsonObjectToReturn.isauthorized = 1;
                            }
                            else {
                                jsonObjectToReturn.isauthorized = 0;
                            }
                        }
                        else {
                            jsonObjectToReturn.isauthorized = 0;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.CreateTeamJoinRequest = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var teamID = -1;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT TeamID from teams WHERE Name = '" + inData.teamname + "'";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                teamID = rows[0].TeamID;
                            }
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                inData.TeamJoinRequest.TeamID = teamID;

                dataAccessLayerX.addTeamJoinRequest(inData.TeamJoinRequest, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.UnjoinTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                dataAccessLayerX.deleteSoftTeamMember(inData.TeamMember, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.RetrieveAuthorizedTeams = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM teammembers tm INNER JOIN teams t ON tm.TeamID = t.TeamID WHERE tm.IsActive = 1 ";
                sqlSelectStatement += " AND tm.SecurityUserID = " + inData.securityuserid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        jsonObjectToReturn.authorizedteams = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTeamJoinRequestsByTeamLead = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select h.`Name` AS handleName, t.Name AS teamName, tjr.TeamJoinRequestID, tjr.SecurityUserID, tjr.TeamID from teamjoinrequests tjr ";
                sqlSelectStatement += " INNER JOIN teams t ON tjr.TeamID = t.TeamID ";
                sqlSelectStatement += " INNER JOIN handles h ON tjr.SecurityUserID = h.SecurityUserID ";
                sqlSelectStatement += " WHERE tjr.RequestAuthorized IS NULL ";
                sqlSelectStatement += " AND tjr.TeamID IN ( ";
                sqlSelectStatement += "     SELECT tls.TeamID FROM teamleads tls ";
                sqlSelectStatement += " INNER JOIN teammembers tm ON tls.TeamMemberID = tm.TeamMemberID ";
                sqlSelectStatement += " WHERE tm.SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " ) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        jsonObjectToReturn.teamjoinrequests = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AuthorizeUserToTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                dataAccessLayerX.addTeamMember(inData.TeamMember, function(err, result) {
                    jsonObjectToReturn.teammemberid = result.insertId;
                    cb(err, null);
                });
            },
            function(cb) {
                dataAccessLayerX.executeStatement("UPDATE teamjoinrequests SET RequestAuthorized = '" + new Date().toISOString().slice(0, 19).replace('T', ' ') + "', " +
                    "RequestAuthorizedBySecurityUserID = " + inData.securityuserid + " WHERE TeamJoinRequestID = " + inData.teamjoinrequestid, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.DenyUserToTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                dataAccessLayerX.executeStatement('DELETE FROM teamjoinrequests WHERE TeamJoinRequestID = ' + inData.teamjoinrequestid, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.DoesTeamExist = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT COUNT(*) AS teamcount FROM teams WHERE name = '" + inData.name + "'";

                jsonObjectToReturn.teamexists = 0;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                if (rows[0].teamcount > 0) {
                                    jsonObjectToReturn.teamexists = 1;
                                }
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.CreateTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                Team = {};
                Team.TeamId = -1;
                Team.Name = inData.teamname;
                Team.OrganizationId = null;
                Team.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Team.IsDeleted = 0;

                dataAccessLayerX.addTeam(Team, function(err, result) {
                    jsonObjectToReturn.teamid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.CreateTeamWithLead = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                dataAccessLayerX.startTransaction(function(err, rows, fields) {
                    cb(err, null);
                });
            },
            function(cb) {
                Team = {};
                Team.TeamId = -1;
                Team.Name = inData.teamname;
                Team.OrganizationId = null;
                Team.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Team.IsDeleted = 0;

                dataAccessLayerX.addTeam(Team, function(err, result) {
                    jsonObjectToReturn.teamid = result.insertId;
                    cb(err, null);
                });
            },
            function(cb) {
                TeamMember = {};
                TeamMember.TeamMemberID = -1;
                TeamMember.TeamID = jsonObjectToReturn.teamid;
                TeamMember.SecurityUserID = inData.securityuserid;
                TeamMember.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                TeamMember.IsActive = 1;
                TeamMember.IsDeleted = 0;

                dataAccessLayerX.addTeamMember(TeamMember, function(err, result) {
                    jsonObjectToReturn.teammemberid = result.insertId;
                    cb(err, null);
                });
            },
            function(cb) {
                TeamLead = {};
                TeamLead.TeamLeadID = -1;
                TeamLead.TeamMemberID =  jsonObjectToReturn.teammemberid;
                TeamLead.TeamID = jsonObjectToReturn.teamid;
                TeamLead.IsDeleted = 0;

                dataAccessLayerX.addTeamLead(TeamLead, function(err, result) {
                    jsonObjectToReturn.teamleadid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                dataAccessLayerX.rollbackTransaction(function(err, rows, fields) { });
                dataAccessLayerX.closeConnection();
                cb(err, false, null);
            }
            else {
                dataAccessLayerX.commitTransaction(function(err, rows, fields) {

                    if (err) {
                        logger.log('error', arguments.callee.toString(), err);
                        dataAccessLayerX.rollbackTransaction(function(err, rows, fields) { });
                        dataAccessLayerX.closeConnection();
                        cb(err, false, null);
                    }
                    else {
                        dataAccessLayerX.closeConnection();
                        cb(null, true, jsonObjectToReturn);
                    }
                });
            }
        }
    );
};

businessLogic.prototype.ModifyTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                dataAccessLayerX.modifyTeam(inData.team, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.RetrieveTeamByTeamID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM teams WHERE TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                    jsonObjectToReturn.team = rows[0];
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTeamsForSecurityUserThatAreNotActive = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM teams t ";
                sqlSelectStatement += " INNER JOIN teammembers tm ON t.TeamID = tm.TeamID ";
                sqlSelectStatement += " WHERE tm.SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND t.TeamID <> " + inData.currentteamid;
                sqlSelectStatement += " AND t.IsDeleted = 0 AND tm.IsActive = 1 ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                jsonObjectToReturn.teams = rows;
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTeamsLeadBySecurityUserID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "";
                sqlSelectStatement += "     SELECT t.TeamID, t.Name, t.OrganizationID FROM teamleads tls ";
                sqlSelectStatement += " INNER JOIN teammembers tm ON tls.TeamMemberID = tm.TeamMemberID ";
                sqlSelectStatement += " INNER JOIN teams t on tls.TeamID = t.TeamID"
                sqlSelectStatement += " WHERE tm.SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND t.IsDeleted = 0 ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                jsonObjectToReturn.teams = rows;
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlStatement = "UPDATE teams SET IsDeleted = 1 WHERE TeamID = " + inData.teamid;

                dataAccessLayerX.executeStatement(sqlStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveNonLeadTeamMembersOfTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "";
                sqlSelectStatement += "     select * from teammembers tms INNER JOIN handles h ON tms.SecurityUserID = h.SecurityUserID ";
                sqlSelectStatement += "     WHERE tms.TeamID = " + inData.teamid;
                sqlSelectStatement += "     AND tms.IsDeleted = 0 AND  tms.TeamMemberID NOT IN ";
                sqlSelectStatement += "     (SELECT TeamMemberID FROM teamleads WHERE teamID = " + inData.teamid + " AND IsDeleted = 0) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                jsonObjectToReturn.teammembers = rows;
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveLeadTeamMembersOfTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "";
                sqlSelectStatement += "     SELECT * FROM teamleads tls ";
                sqlSelectStatement += " INNER JOIN teammembers tms ON tms.TeamMemberID = tls.TeamMemberID ";
                sqlSelectStatement += " INNER JOIN handles h ON h.SecurityUserID = tms.SecurityUserID ";
                sqlSelectStatement += " WHERE tls.teamID = " + inData.teamid + " AND tls.IsDeleted = 0 ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                jsonObjectToReturn.teamleads = rows;
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.IsSecurityUserLeadOfTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "";
                sqlSelectStatement += "     SELECT * FROM teammembers tms ";
                sqlSelectStatement += " INNER JOIN teamleads tls ON tls.TeamMemberID = tms.TeamMemberID ";
                sqlSelectStatement += " WHERE tls.teamID = " + inData.teamid + " AND tls.IsDeleted = 0 ";
                sqlSelectStatement += " AND tms.SecurityUserID = " + inData.securityuserid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                jsonObjectToReturn.islead = 1;
                            }
                            else {
                                jsonObjectToReturn.islead = 0;
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddTeamMember = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                TeamMember = {};
                TeamMember.TeamMemberID = -1;
                TeamMember.TeamID = inData.teamid;
                TeamMember.SecurityUserID = inData.securityuserid;
                TeamMember.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                TeamMember.IsActive = 1;
                TeamMember.IsDeleted = 0;

                dataAccessLayerX.addTeamMember(TeamMember, function(err, result) {
                    jsonObjectToReturn.teammemberid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.SetTeamMemberAsLead = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                TeamLead = {};
                TeamLead.TeamLeadID = -1;
                TeamLead.TeamMemberID = inData.teammemberid;
                TeamLead.TeamID = inData.teamid;
                TeamLead.IsDeleted = 0;

                dataAccessLayerX.addTeamLead(TeamLead, function(err, result) {
                    jsonObjectToReturn.teamleadid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RevokeTeamMemberAsLead = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                dataAccessLayerX.deleteSoftTeamLead(inData.TeamLead, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.RetrieveCampaignsByTeam = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " SELECT * FROM campaigns WHERE TeamID = " + inData.teamid;
                sqlSelectStatement += " AND IsDeleted = 0 ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                jsonObjectToReturn.campaigns = rows;
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddCampaign = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                Campaign = {};
                Campaign.CampaignID = -1;
                Campaign.StartDate = inData.startdate;
                Campaign.Name = inData.name;
                Campaign.Description = inData.description;
                Campaign.EndDate = inData.enddate;
                Campaign.TeamID = inData.teamid;
                Campaign.IsDeleted = 0;
                Campaign.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');

                dataAccessLayerX.addCampaign(Campaign, function(err, result) {
                    jsonObjectToReturn.campaignid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyCampaign = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                Campaign = {};
                Campaign.CampaignID = inData.campaignid;
                Campaign.StartDate = inData.startdate;
                Campaign.Name = inData.name;
                Campaign.Description = inData.description;
                Campaign.EndDate = inData.enddate;
                Campaign.TeamID = inData.teamid;
                Campaign.IsDeleted = 0;
                Campaign.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');

                dataAccessLayerX.modifyCampaign(Campaign, function(err, result) {
                    jsonObjectToReturn.campaignid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteCampaign = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                Campaign = {};
                Campaign.CampaignID = inData.campaignid;

                dataAccessLayerX.deleteSoftCampaign(Campaign, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.RetrieveCampaignByCampaignID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM campaigns WHERE CampaignID = " + inData.campaignid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                jsonObjectToReturn.campaign = rows[0];
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.GetOrganizationByTeamID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    jsonObjectToReturn.organization = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT o.OrganizationID, o.Name, o.Type FROM organizations o INNER JOIN teams t ON t.OrganizationID = o.OrganizationID WHERE TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (!err) {
                        if (rows) {
                            if (rows.length > 0) {
                                jsonObjectToReturn.organization = rows[0];
                            }
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.SetOrganizationByTeamID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var organization = null;
    var newOrganizationID = -1;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT o.OrganizationID, o.Name, o.Type FROM organizations o INNER JOIN teams t ON t.OrganizationID = o.OrganizationID WHERE TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            organization = rows[0];
                        }
                        else {
                            organization = null;
                        }
                    }
                    cb(err, null);
                });
            },
            function (cb) {
                if (organization == null) {
                    var Organization = {};

                    Organization.Name = inData.name;
                    Organization.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    Organization.Type = inData.type;

                    dataAccessLayerX.addOrganization(Organization, function(err, result) {
                        newOrganizationID = result.insertId;
                        cb(err, null);
                    });
                }
                else {
                    var organizationID = organization.OrganizationID;

                    var sqlUpdateStatement = "UPDATE organizations SET Name = '" + inData.name + "', ";
                    sqlUpdateStatement += " Type = '" + inData.type + "' ";
                    sqlUpdateStatement += " WHERE OrganizationID = " + organizationID;

                    dataAccessLayerX.executeStatement(sqlUpdateStatement, function (err, rows, fields) {
                        cb(err, null);
                    });
                }
            },
            function (cb) {
                if (newOrganizationID > -1) {
                    var sqlUpdateStatement = "UPDATE teams SET OrganizationID = " + newOrganizationID;
                    sqlUpdateStatement += " WHERE TeamID = " + inData.teamid;

                    dataAccessLayerX.executeStatement(sqlUpdateStatement, function (err, rows, fields) {
                        cb(err, null);
                    });
                }
                else {
                    cb(null, null);
                }
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.SetTeamOrganization = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "UPDATE teams SET OrganizationID = " + inData.organizationid;
                sqlSelectStatement += " WHERE TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.AddSalesTarget = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var SalesTarget = {};
                SalesTarget.SalesTargetID = -1;
                SalesTarget.Name = inData.name;
                SalesTarget.SecurityUserID = inData.securityuserid;
                SalesTarget.SalesTargetStageID = inData.salestargetstageid;
                SalesTarget.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                SalesTarget.TeamID = inData.teamid;
                SalesTarget.IsDeleted = null;

                dataAccessLayerX.addSalesTarget(SalesTarget, function(err, result) {
                    jsonObjectToReturn.salestargetid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifySalesTarget = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM salestargets WHERE SalesTargetID = " + inData.salestargetid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var SalesTarget = {};
                SalesTarget.SalesTargetID = inData.salestargetid;
                SalesTarget.Name = inData.name;
                SalesTarget.SecurityUserID = inData.securityuserid;
                SalesTarget.SalesTargetStageID = inData.salestargetstageid;
                SalesTarget.Created = created;
                SalesTarget.TeamID = inData.teamid;
                SalesTarget.IsDeleted = null;

                dataAccessLayerX.modifySalesTarget(SalesTarget, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteSalesTarget = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE salestargets set IsDeleted = 1 WHERE SalesTargetID = " + inData.salestargetid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveSalesTargetsWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM salestargets WHERE IsDeleted IS NULL ";

                var hasWhere = false;

                if (inData.salestargetid != null) {
                    sqlSelectStatement += " AND SalesTargetID = " + inData.salestargetid;
                }

                if (inData.securityuserid != null) {
                    sqlSelectStatement += " AND SecurityUserID = " + inData.securityuserid;
                }

                if (inData.salestargetstageid != null) {
                    sqlSelectStatement += " AND SalesTargetStageID = " + inData.salestargetstageid;
                }

                if (inData.teamid != null) {
                    sqlSelectStatement += " AND TeamID = " + inData.teamid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.salestargets = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ShareSalesTargetWithTeamMember = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var SalesTargetShare = {};
                SalesTargetShare.SalesTargetShareID = -1;
                SalesTargetShare.SalesTargetID = inData.salestargetid;
                SalesTargetShare.SecurityUserID = inData.securityuserid;

                dataAccessLayerX.addSalesTargetShare(SalesTargetShare, function(err, result) {
                    jsonObjectToReturn.salestargetshareid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.UnshareSalesTargetWithTeamMember = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlStatement = "DELETE FROM SalesTargetShares WHERE SalesTargetID = " + inData.salestargetid;
                sqlStatement += " AND SecurityUserID = " + inData.securityuserid;

                dataAccessLayerX.executeStatement(sqlStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.IsSalesTargetSharedWithUser = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM salestargetshares WHERE SalesTargetID = " + inData.salestargetid;
                sqlSelectStatement += " AND SecurityUserID = " + inData.securityuserid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            jsonObjectToReturn.isshared = 1;
                        }
                        else {
                            jsonObjectToReturn.isshared = 0;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveSalesTargetsSharedWithUser = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM salestargetshares sts INNER JOIN salestargets st ON sts.SalesTargetID = st.SalesTargetID WHERE ";
                sqlSelectStatement += " sts.SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.salestargets = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveUsersWithSalesTargetShare = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM salestargetshares WHERE ";
                sqlSelectStatement += " salestargetid = " + inData.salestargetid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.salestargetshares = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddNote = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var Note = {};
                Note.NoteID = -1;
                Note.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Note.AttachedToObjectID = inData.attachedtoobjectid;
                Note.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Note.Modified =  new Date().toISOString().slice(0, 19).replace('T', ' ');
                Note.Content = inData.content;
                Note.IsDeleted = 0;

                dataAccessLayerX.addNote(Note, function(err, result) {
                    jsonObjectToReturn.noteid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyNote = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM notes WHERE NoteID = " + inData.noteid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var Note = {};
                Note.NoteID = inData.noteid;
                Note.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Note.AttachedToObjectID = inData.attachedtoobjectid;
                Note.Created = created;
                Note.Modified = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Note.Content = inData.content;
                Note.IsDeleted = 0;

                dataAccessLayerX.modifyNote(Note, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteNote = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE notes set IsDeleted = 1 WHERE NoteID = " + inData.noteid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveNotesWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM notes WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.noteid != null) {
                    sqlSelectStatement += " AND NoteID = " + inData.noteid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                sqlSelectStatement += " ORDER BY Created DESC ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.notes = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveActivityTypes = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM activitytypes ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.activitytypes = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};


businessLogic.prototype.AddActivity = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var Activity = {};
                Activity.ActivityID = -1;
                Activity.SecurityUserID = inData.securityuserid;
                Activity.CampaignID = inData.campaignid;
                Activity.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Activity.Started = inData.started;
                Activity.Description = inData.description;
                Activity.DurationInHours = inData.durationinhours;
                Activity.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Activity.AttachedToObjectID = inData.attachedtoobjectid;
                Activity.IsDeleted = 0;
                Activity.ActivityTypeID = inData.activitytypeid;
                Activity.ActivityTypeCustomName = inData.activitytypecustomername;

                dataAccessLayerX.addActivity(Activity, function(err, result) {
                    jsonObjectToReturn.activityid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyActivity = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM activities WHERE ActivityID = " + inData.activityid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var Activity = {};
                Activity.ActivityID = inData.activityid;
                Activity.SecurityUserID = inData.securityuserid;
                Activity.CampaignID = inData.campaignid;
                Activity.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Activity.Started = inData.started;
                Activity.Description = inData.description;
                Activity.DurationInHours = inData.durationinhours;
                Activity.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Activity.AttachedToObjectID = inData.attachedtoobjectid;
                Activity.IsDeleted = 0;
                Activity.ActivityTypeID = inData.activitytypeid;
                Activity.ActivityTypeCustomName = inData.activitytypecustomname;

                dataAccessLayerX.modifyActivity(Activity, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteActivity = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE activities set IsDeleted = 1 WHERE ActivityID = " + inData.activityid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveActivitiesWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT a.*, i.IndividualID, i.LastName, i.FirstName, sts.SalesTargetID, sts.Name as SalesTargetName, at.Name as ActivityName ";
                sqlSelectStatement += " FROM activities a INNER JOIN activitytypes at ON a.ActivityTypeID = at.ActivityTypeID ";
                sqlSelectStatement += " LEFT JOIN individuals i ON (a.AttachedToObjectTypeID = 3 and a.AttachedToObjectID = i.IndividualID) ";
                sqlSelectStatement += " LEFT JOIN salestargets sts ON (a.AttachedToObjectTypeID = 7 and a.AttachedToObjectID = sts.SalesTargetID) ";
                sqlSelectStatement += " WHERE a.IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.activityid != null) {
                    sqlSelectStatement += " AND a.ActivityID = " + inData.activityid;
                }

                if (inData.securityuserid != null) {
                    sqlSelectStatement += " AND a.SecurityUserID = " + inData.securityuserid;
                }

                if (inData.campaignid != null) {
                    sqlSelectStatement += " AND a.CampaignID = " + inData.campaignid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND a.AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND a.AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                sqlSelectStatement += " ORDER BY a.Created DESC ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.activities = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddAddress = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                Address = {};
                Address.AddressID = -1;
                Address.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Address.AttachedToObjectID = inData.attachedtoobjectid;
                Address.Name = inData.name;
                Address.Line1 = inData.line1;
                Address.Line2 = inData.line2;
                Address.City = inData.city;
                Address.State = inData.state;
                Address.Zip = inData.zip;
                Address.Country = inData.country;
                Address.Type = inData.type;
                Address.IsDeleted = 0;

                dataAccessLayerX.addAddress(Address, function(err, result) {
                    jsonObjectToReturn.addressid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyAddress = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                Address = {};
                Address.AddressID = inData.addressid;
                Address.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Address.AttachedToObjectID = inData.attachedtoobjectid;
                Address.Name = inData.name;
                Address.Line1 = inData.line1;
                Address.Line2 = inData.line2;
                Address.City = inData.city;
                Address.State = inData.state;
                Address.Zip = inData.zip;
                Address.Country = inData.country;
                Address.Type = inData.type;
                Address.IsDeleted = 0;

                dataAccessLayerX.modifyAddress(Address, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteAddress = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE addresses set IsDeleted = 1 WHERE AddressID = " + inData.addressid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveAddressesWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM addresses WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.addressid != null) {
                    sqlSelectStatement += " AND AddressID = " + inData.addressid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.addresses = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddEmailAddress = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                EmailAddress = {};
                EmailAddress.EmailAddressID = -1;
                EmailAddress.Type = inData.type;
                EmailAddress.Address = inData.address;
                EmailAddress.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                EmailAddress.AttachedToObjectID = inData.attachedtoobjectid;
                EmailAddress.IsDeleted = 0;

                dataAccessLayerX.addEmailAddress(EmailAddress, function(err, result) {
                    jsonObjectToReturn.emailaddressid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyEmailAddress = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                EmailAddress = {};
                EmailAddress.EmailAddressID = inData.emailaddressid;
                EmailAddress.Type = inData.type;
                EmailAddress.Address = inData.address;
                EmailAddress.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                EmailAddress.AttachedToObjectID = inData.attachedtoobjectid;
                EmailAddress.IsDeleted = 0;

                dataAccessLayerX.modifyEmailAddress(EmailAddress, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteEmailAddress = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE emailaddresses set IsDeleted = 1 WHERE EmailAddressID = " + inData.emailaddressid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveEmailAddressesWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM emailaddresses WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.addressid != null) {
                    sqlSelectStatement += " AND EmailAddressID = " + inData.emailaddressid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.emailaddresses = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddInstantMessengerAccount = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                InstantMessengerAccount = {};
                InstantMessengerAccount.InstantMessageAccountID = -1;
                InstantMessengerAccount.Type = inData.type;
                InstantMessengerAccount.Handle = inData.handle;
                InstantMessengerAccount.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                InstantMessengerAccount.AttachedToObjectID = inData.attachedtoobjectid;
                InstantMessengerAccount.IsDeleted = 0;

                dataAccessLayerX.addInstantMessageAccount(InstantMessengerAccount, function(err, result) {
                    jsonObjectToReturn.instantmessengeraccountid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyInstantMessengerAccount = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                InstantMessengerAccount = {};
                InstantMessengerAccount.InstantMessageAccountID = inData.instantmessageaccountid;
                InstantMessengerAccount.Type = inData.type;
                InstantMessengerAccount.Handle = inData.handle;
                InstantMessengerAccount.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                InstantMessengerAccount.AttachedToObjectID = inData.attachedtoobjectid;
                InstantMessengerAccount.IsDeleted = 0;

                dataAccessLayerX.modifyInstantMessageAccount(InstantMessengerAccount, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteInstantMessengerAccount = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE instantmessageaccounts set IsDeleted = 1 WHERE InstantMessageAccountID = " + inData.instantmessageaccountid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveInstantMessengerAccountsWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM instantmessageaccounts WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.instantmessageaccountid != null) {
                    sqlSelectStatement += " AND InstantMessageAccountID = " + inData.instantmessageaccountid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.instantmessageaccounts = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddPhoneNumber = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                PhoneNumber = {};
                PhoneNumber.PhoneNumberID = -1;
                PhoneNumber.Type = inData.type;
                PhoneNumber.Number = inData.number;
                PhoneNumber.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                PhoneNumber.AttachedToObjectID = inData.attachedtoobjectid;
                PhoneNumber.IsDeleted = 0;

                dataAccessLayerX.addPhoneNumber(PhoneNumber, function(err, result) {
                    jsonObjectToReturn.phonenumberid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyPhoneNumber = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                PhoneNumber = {};
                PhoneNumber.PhoneNumberID = inData.phonenumberid;
                PhoneNumber.Type = inData.type;
                PhoneNumber.Number = inData.number;
                PhoneNumber.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                PhoneNumber.AttachedToObjectID = inData.attachedtoobjectid;
                PhoneNumber.IsDeleted = 0;

                dataAccessLayerX.modifyPhoneNumber(PhoneNumber, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeletePhoneNumber = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE PhoneNumbers set IsDeleted = 1 WHERE PhoneNumberID = " + inData.phonenumberid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrievePhoneNumbersWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM phonenumbers WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.phonenumberid != null) {
                    sqlSelectStatement += " AND PhoneNumberID = " + inData.phonenumberid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.phonenumbers = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddAttachment = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                Attachment = {};
                Attachment.AttachmentID = -1;
                Attachment.Name = inData.name;
                Attachment.Description = inData.description;
                Attachment.Filename = inData.filename;
                Attachment.ExternalFileID = inData.externalfileid;
                Attachment.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Attachment.AttachedToObjectID = inData.attachedtoobjectid;
                Attachment.FileSizeInBytes = inData.filesizeinbytes;
                Attachment.UploadCompleted = inData.uploadcompleted;
                Attachment.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Attachment.IsDeleted = 0;
                Attachment.PurgeCompleted = null;

                dataAccessLayerX.addAttachment(Attachment, function(err, result) {
                    jsonObjectToReturn.attachmentid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyAttachment = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM attachments WHERE AttachmentID = " + inData.attachmentid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                Attachment = {};
                Attachment.AttachmentID = inData.attachmentid;
                Attachment.Name = inData.name;
                Attachment.Description = inData.description;
                Attachment.Filename = inData.filename;
                Attachment.ExternalFileID = inData.externalfileid;
                Attachment.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Attachment.AttachedToObjectID = inData.attachedtoobjectid;
                Attachment.FileSizeInBytes = inData.filesizeinbytes;
                Attachment.UploadCompleted = inData.uploadcompleted;
                Attachment.Created = created;
                Attachment.IsDeleted = 0;
                Attachment.PurgeCompleted = null;

                dataAccessLayerX.modifyAttachment(Attachment, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteAttachment = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE attachments set IsDeleted = 1 WHERE AttachmentID = " + inData.attachmentid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveAttachmentsWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM attachments WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.attachmentid != null) {
                    sqlSelectStatement += " AND AttachmentID = " + inData.attachmentid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.attachments = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddCalendarEvent = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                CalendarEvent = {};
                CalendarEvent.CalendarEventID = -1;
                CalendarEvent.Title = inData.title;
                CalendarEvent.StartDateTime = inData.startdatetime;
                CalendarEvent.EndDateTime = inData.enddatetime;
                CalendarEvent.Location = inData.where;
                CalendarEvent.Description = inData.description;
                CalendarEvent.Color = inData.color;
                CalendarEvent.SecurityUserID = inData.securityuserid;
                CalendarEvent.IsDeleted = 0;
                CalendarEvent.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                CalendarEvent.AttachedToObjectID = inData.attachedtoobjectid;

                dataAccessLayerX.addCalendarEvent(CalendarEvent, function(err, result) {
                    jsonObjectToReturn.calendareventid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyCalendarEvent = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                CalendarEvent = {};
                CalendarEvent.CalendarEventID = inData.calendareventid;
                CalendarEvent.Title = inData.title;
                CalendarEvent.StartDateTime = inData.startdatetime;
                CalendarEvent.EndDateTime = inData.enddatetime;
                CalendarEvent.Location = inData.where;
                CalendarEvent.Description = inData.description;
                CalendarEvent.Color = inData.color;
                CalendarEvent.SecurityUserID = inData.securityuserid;
                CalendarEvent.IsDeleted = 0;
                CalendarEvent.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                CalendarEvent.AttachedToObjectID = inData.attachedtoobjectid;

                dataAccessLayerX.modifyCalendarEvent(CalendarEvent, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteCalendarEvent = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE calendarevents set IsDeleted = 1 WHERE CalendarEventID = " + inData.calendareventid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveCalendarEventsWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM calendarevents WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.calendareventid != null) {
                    sqlSelectStatement += " AND CalendarEventID = " + inData.calendareventid;
                }

                if (inData.securityuserid != null) {
                    sqlSelectStatement += " AND SecurityUserID = " + inData.securityuserid;
                }

                if (inData.from != null && inData.to != null) {
                    sqlSelectStatement += " AND StartDateTime BETWEEN '" + inData.from + "' AND '" + inData.to + "' ";
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                sqlSelectStatement += " ORDER BY StartDateTime DESC ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.calendarevents = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddExpenses = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var Expense = {};
                Expense.ExpenseID = -1;
                Expense.Name = inData.name;
                Expense.Description = inData.description;
                Expense.SecurityUserID = inData.securityuserid;
                Expense.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Expense.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Expense.AttachedToObjectID = inData.attachedtoobjectid;
                Expense.Amount = inData.amount;
                Expense.IsReimbursed = inData.isreimbursed;
                Expense.IsDeleted = 0;

                dataAccessLayerX.addExpense(Expense, function(err, result) {
                    jsonObjectToReturn.expenseid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyExpenses = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM expenses WHERE ExpenseID = " + inData.expenseid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var Expense = {};
                Expense.ExpenseID = inData.expenseid;
                Expense.Name = inData.name;
                Expense.Description = inData.description;
                Expense.SecurityUserID = inData.securityuserid;
                Expense.Created = created;
                Expense.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Expense.AttachedToObjectID = inData.attachedtoobjectid;
                Expense.Amount = inData.amount;
                Expense.IsReimbursed = inData.isreimbursed;
                Expense.IsDeleted = 0;

                dataAccessLayerX.modifyExpense(Expense, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteExpenses = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE expenses set IsDeleted = 1 WHERE ExpenseID = " + inData.expenseid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveExpensesWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM expenses WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.expenseid != null) {
                    sqlSelectStatement += " AND ExpenseID = " + inData.expenseid;
                }

                if (inData.securityuserid != null) {
                    sqlSelectStatement += " AND SecurityUserID = " + inData.securityuserid;
                }

                if (inData.isreimbursed != null) {
                    sqlSelectStatement += " AND IsReimbursed = " + inData.isreimbursed;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.expenses = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddMileageLogEntry = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var MileageLogEntry = {};
                MileageLogEntry.MileageLogEntryID = -1;
                MileageLogEntry.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                MileageLogEntry.Occurred = inData.occurred;
                MileageLogEntry.Description = inData.description;
                MileageLogEntry.SecurityUserID = inData.securityuserid;
                MileageLogEntry.StartingMileage = inData.startingmileage;
                MileageLogEntry.EndingMileage = inData.endingmileage;
                MileageLogEntry.IsReimbursed = inData.isreimbursed;
                MileageLogEntry.IsDeleted = 0;

                dataAccessLayerX.addMileageLogEntry(MileageLogEntry, function(err, result) {
                    jsonObjectToReturn.mileagelogentryid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyMileageLogEntry = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM mileagelogentries WHERE MileageLogEntryID = " + inData.mileagelogentryid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var MileageLogEntry = {};
                MileageLogEntry.MileageLogEntryID = inData.mileagelogentryid;
                MileageLogEntry.Created = created;
                MileageLogEntry.Occurred = inData.occurred;
                MileageLogEntry.Description = inData.description;
                MileageLogEntry.SecurityUserID = inData.securityuserid;
                MileageLogEntry.StartingMileage = inData.startingmileage;
                MileageLogEntry.EndingMileage = inData.endingmileage;
                MileageLogEntry.IsReimbursed = inData.isreimbursed;
                MileageLogEntry.IsDeleted = 0;

                dataAccessLayerX.addMileageLogEntry(MileageLogEntry, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteMileageLogEntry = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE mileagelogentries set IsDeleted = 1 WHERE MileageLogEntryID = " + inData.mileagelogentryid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveMileageLogEntriesWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM mileagelogentries WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.mileagelogentryid != null) {
                    sqlSelectStatement += " AND MileageLogEntryID = " + inData.mileagelogentryid;
                }

                if (inData.securityuserid != null) {
                    sqlSelectStatement += " AND SecurityUserID = " + inData.securityuserid;
                }

                if (inData.isreimbursed != null) {
                    sqlSelectStatement += " AND IsReimbursed = " + inData.isreimbursed;
                }

                sqlSelectStatement += " ORDER BY Occurred DESC ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.mileagelogentries = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddIndividual = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var Individual = {};
                Individual.IndividualID = null;
                Individual.LastName = inData.lastname;
                Individual.MiddleName = inData.middlename;
                Individual.FirstName = inData.firstname;
                Individual.Birthday = inData.birthday;
                Individual.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Individual.AttachedToObjectID = inData.attachedtoobjectid;
                Individual.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Individual.IsDeleted = 0;

                dataAccessLayerX.addIndividual(Individual, function(err, result) {
                    jsonObjectToReturn.individualid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyIndividual = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM individual WHERE IndividualID = " + inData.individualid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var Individual = {};
                Individual.IndividualID = inData.individualid;
                Individual.LastName = inData.lastname;
                Individual.MiddleName = inData.middlename;
                Individual.FirstName = inData.firstname;
                Individual.Birthday = inData.birthday;
                Individual.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                Individual.AttachedToObjectID = inData.attachedtoobjectid;
                Individual.Created = created;
                Individual.IsDeleted = 0;

                dataAccessLayerX.modifyIndividual(Individual, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteIndividual = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE individuals set IsDeleted = 1 WHERE IndividualID = " + inData.individualid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveIndividualsWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM individuals WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.individualid != null) {
                    sqlSelectStatement += " AND IndividualID = " + inData.individualid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.individuals = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddURI = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var URI = {};
                URI.Uriid = -1;
                URI.Type = inData.type;
                URI.Identifier = inData.identifier;
                URI.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                URI.AttachedToObjectID = inData.attachedtoobjectid;
                URI.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                URI.IsDeleted = 0;

                dataAccessLayerX.addUri(URI, function(err, result) {
                    jsonObjectToReturn.uriid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyURI = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM uris WHERE UriID = " + inData.uriid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var URI = {};
                URI.UriID = inData.uriid;
                URI.Type = inData.type;
                URI.Identifier = inData.identifier;
                URI.AttachedToObjectTypeID = inData.attachedtoobjecttypeid;
                URI.AttachedToObjectID = inData.attachedtoobjectid;
                URI.Created = created;
                URI.IsDeleted = 0;

                dataAccessLayerX.modifyUri(URI, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteURI = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE uris set IsDeleted = 1 WHERE UriID = " + inData.uriid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveURIsWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM uris WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.uriid != null) {
                    sqlSelectStatement += " AND uriid = " + inData.uriid;
                }

                if (inData.attachedtoobjecttypeid != null) {
                    sqlSelectStatement += " AND AttachedToObjectTypeID = " + inData.attachedtoobjecttypeid;
                }

                if (inData.attachedtoobjectid != null) {
                    sqlSelectStatement += " AND AttachedToObjectID = " + inData.attachedtoobjectid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.uris = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddDeal = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var Deal = {};
                Deal.DealID = -1;
                Deal.SalesTargetID = inData.salestargetid;
                Deal.ProductOrService = inData.productorservice;
                Deal.ClosedDate = null;
                Deal.IsEstimate = inData.isestimate;
                Deal.TimeFrameTypeID = inData.timeframetypeid;
                Deal.Amount = inData.amount;
                Deal.Notes = inData.notes;
                Deal.IsDeleted = 0;
                Deal.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');

                dataAccessLayerX.addDeal(Deal, function(err, result) {
                    jsonObjectToReturn.Dealid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyDeal = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM Deals WHERE DealID = " + inData.dealid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var Deal = {};
                Deal.DealID = inData.dealid;
                Deal.SalesTargetID = inData.salestargetid;
                Deal.ProductOrService = inData.productorservice;
                Deal.ClosedDate = null;
                Deal.IsEstimate = inData.isestimate;
                Deal.TimeFrameTypeID = inData.timeframetypeid;
                Deal.Amount = inData.amount;
                Deal.Notes = inData.notes;
                Deal.IsDeleted = 0;
                Deal.Created = created;

                dataAccessLayerX.modifyDeal(Deal, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteDeal = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE Deals set IsDeleted = 1 WHERE DealID = " + inData.Dealid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealsWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT *, tft.Name as timeframetypename FROM Deals d INNER JOIN TimeFrameTypes tft ON tft.TimeFrameTypeID = d.TimeFrameTypeID WHERE d.IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.dealid != null) {
                    sqlSelectStatement += " AND d.DealId = " + inData.dealid;
                }

                if (inData.salestargetid != null) {
                    sqlSelectStatement += " AND d.SalesTargetID = " + inData.salestargetid;
                }

                if (inData.isestimate != null) {
                    sqlSelectStatement += " AND d.IsEstimate = " + inData.isestimate;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.deals = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddQuote = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var Quote = {};
                Quote.QuoteID = -1;
                Quote.SalesTargetID = inData.salestargetid;
                Quote.ProductOrService = inData.productorservice;
                Quote.SentDate = inData.sentdate;
                Quote.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Quote.IsDeleted = 0;
                Quote.TimeFrameTypeID = inData.timeframetypeid;
                Quote.Amount = inData.amount;
                Quote.Notes = inData.notes;

                dataAccessLayerX.addQuote(Quote, function(err, result) {
                    jsonObjectToReturn.quoteid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyQuote = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM Quotes WHERE QuoteID = " + inData.quoteid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var Quote = {};
                Quote.QuoteID = inData.quoteid;
                Quote.SalesTargetID = inData.salestargetid;
                Quote.ProductOrService = inData.productorservice;
                Quote.SentDate = inData.sentdate;
                Quote.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Quote.IsDeleted = 0;
                Quote.TimeFrameTypeID = inData.timeframetypeid;
                Quote.Amount = inData.amount;
                Quote.Notes = inData.notes;

                dataAccessLayerX.modifyQuote(Quote, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteQuote = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE Quotes set IsDeleted = 1 WHERE QuoteID = " + inData.quoteid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveQuotesWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT *, tft.Name as timeframetypename FROM Quotes q INNER JOIN TimeFrameTypes tft ON tft.TimeFrameTypeID = q.TimeFrameTypeID WHERE q.IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.quoteid != null) {
                    sqlSelectStatement += " AND q.QuoteID = " + inData.quoteid;
                }

                if (inData.salestargetid != null) {
                    sqlSelectStatement += " AND q.SalesTargetID = " + inData.salestargetid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.quotes = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.AddRevenueEntry = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var RevenueEntry = {};
                RevenueEntry.RevenueEntryID = -1;
                RevenueEntry.SalesTargetID = inData.salestargetid;
                RevenueEntry.Amount = inData.amount;
                RevenueEntry.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                RevenueEntry.Notes = inData.notes;
                RevenueEntry.PeriodYear = inData.periodyear;
                RevenueEntry.PeriodMonth = inData.periodmonth;
                RevenueEntry.IsDeleted = 0;

                dataAccessLayerX.addRevenueEntry(RevenueEntry, function(err, result) {
                    jsonObjectToReturn.RevenueEntryid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.ModifyRevenueEntry = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT Created FROM RevenueEntries WHERE RevenueEntryID = " + inData.revenueentryid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var RevenueEntry = {};
                RevenueEntry.RevenueEntryID = inData.revenueentryid;
                RevenueEntry.SalesTargetID = inData.salestargetid;
                RevenueEntry.Amount = inData.amount;
                RevenueEntry.Created = created;
                RevenueEntry.Notes = inData.notes;
                RevenueEntry.PeriodYear = inData.periodyear;
                RevenueEntry.PeriodMonth = inData.periodmonth;
                RevenueEntry.IsDeleted = 0;

                dataAccessLayerX.modifyRevenueEntry(RevenueEntry, function(err, result) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DeleteRevenueEntry = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlUpdateStatement = "UPDATE RevenueEntries set IsDeleted = 1 WHERE RevenueEntryID = " + inData.revenueentryid;

                dataAccessLayerX.executeStatement(sqlUpdateStatement, function(err, rows, fields) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveRevenueEntrysWithFilter = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM RevenueEntries WHERE IsDeleted = 0 ";

                var hasWhere = false;

                if (inData.revenueentryid != null) {
                    sqlSelectStatement += " AND RevenueEntryid = " + inData.revenueentryid;
                }

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.RevenueEntrys = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};


businessLogic.prototype.RetrieveTimeFrameTypes = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT * FROM timeframetypes ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.timeframetypes = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveExpensesNotReimbursedByTeamID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select *, h.Name as handleName from expenses e ";
                sqlSelectStatement += " INNER JOIN teammembers tm ON tm.SecurityUserID = e.SecurityUserID ";
                sqlSelectStatement += " INNER JOIN handles h ON h.SecurityUserID = e.SecurityUserID ";
                sqlSelectStatement += " WHERE tm.TeamID = " + inData.teamid + " AND e.IsReimbursed = 0 AND e.IsDeleted = 0";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.notreimbursedexpenses = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveExpensesReimbursedByTeamID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select *, h.Name as handleName from expenses e ";
                sqlSelectStatement += " INNER JOIN teammembers tm ON tm.SecurityUserID = e.SecurityUserID ";
                sqlSelectStatement += " INNER JOIN handles h ON h.SecurityUserID = e.SecurityUserID ";
                sqlSelectStatement += " WHERE tm.TeamID = " + inData.teamid + " AND e.IsReimbursed = 1 AND e.IsDeleted = 0";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.reimbursedexpenses = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.SetExpenseReimbursed = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "UPDATE expenses SET IsReimbursed = 1 WHERE ExpenseID = " + inData.expenseid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.SetExpenseUnreimbursed = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "UPDATE expenses SET IsReimbursed = 0 WHERE ExpenseID = " + inData.expenseid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};


businessLogic.prototype.RetrieveMileageLogEntriesNotReimbursedByTeamID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select *, h.Name as handleName from mileagelogentries m ";
                sqlSelectStatement += " INNER JOIN teammembers tm ON tm.SecurityUserID = m.SecurityUserID ";
                sqlSelectStatement += " INNER JOIN handles h ON h.SecurityUserID = m.SecurityUserID ";
                sqlSelectStatement += " WHERE tm.TeamID = " + inData.teamid + " AND m.IsReimbursed = 0 AND m.IsDeleted = 0";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.notreimbursedmileagelogentries = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveMileageLogEntriesReimbursedByTeamID = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select *, h.Name as handleName from mileagelogentries m ";
                sqlSelectStatement += " INNER JOIN teammembers tm ON tm.SecurityUserID = m.SecurityUserID ";
                sqlSelectStatement += " INNER JOIN handles h ON h.SecurityUserID = m.SecurityUserID ";
                sqlSelectStatement += " WHERE tm.TeamID = " + inData.teamid + " AND m.IsReimbursed = 1 AND m.IsDeleted = 0";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.reimbursedmileagelogentries = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.SetMileageLogEntryReimbursed = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "UPDATE mileagelogentries SET IsReimbursed = 1 WHERE MileageLogEntryID = " + inData.mileagelogentryid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.SetMileageLogEntryUnreimbursed = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var created = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "UPDATE mileagelogentries SET IsReimbursed = 0 WHERE MileageLogEntryID = " + inData.mileagelogentryid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            created = rows[0].Created;
                        }
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTeamSalesTargetsWithRevenueAmounts = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT ";
                sqlSelectStatement += " st.SalesTargetID as SalesTargetID, ";
                sqlSelectStatement += " st.`Name` as SalesTargetName, ";
                sqlSelectStatement += "    atbl.RevenueEntryID, ";
                sqlSelectStatement += "    atbl.Amount, ";
                sqlSelectStatement += " h.Name as Owner ";
                sqlSelectStatement += " FROM ";
                sqlSelectStatement += " salestargets st ";
                sqlSelectStatement += " INNER JOIN teammembers AS tm ON tm.SecurityUserID = st.SecurityUserID ";
                sqlSelectStatement += " INNER JOIN handles AS h ON tm.SecurityUserID = h.SecurityUserID ";
                sqlSelectStatement += " LEFT OUTER JOIN ";
                sqlSelectStatement += " ( ";
                sqlSelectStatement += "    SELECT * FROM revenueentries WHERE PeriodYear = " + inData.periodyear + " AND PeriodMonth = " + inData.periodmonth;
                sqlSelectStatement += " ) AS atbl ON atbl.SalesTargetID = st.SalesTargetID ";
                sqlSelectStatement += " WHERE ";
                sqlSelectStatement += " tm.TeamID = " + inData.teamid;
                sqlSelectStatement += "  AND st.IsDeleted IS NULL ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.salestargets = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.UpdateSalesTargetRevenueAmountForPeriodYearAndMonth = function (inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var foundrow = null;

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function (cb) {
                var sqlSelectStatement = " SELECT * FROM revenueentries WHERE SalesTargetID = " + inData.salestargetid;
                sqlSelectStatement += " AND PeriodYear = " + inData.periodyear + " AND PeriodMonth = " + inData.periodmonth;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        if (rows.length > 0) {
                            foundrow = rows[0];
                        }
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                if (foundrow == null) {
                    var RevenueEntry = {};
                    RevenueEntry.SalesTargetID = inData.salestargetid;
                    RevenueEntry.Amount = inData.amount;
                    RevenueEntry.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    RevenueEntry.Notes = '';
                    RevenueEntry.PeriodYear = inData.periodyear;
                    RevenueEntry.PeriodMonth = inData.periodmonth;
                    RevenueEntry.IsDeleted = 0;

                    dataAccessLayerX.addRevenueEntry(RevenueEntry, function(err, result) {
                        cb(err, null);
                    });
                }
                else {
                    var sqlStatement = "UPDATE revenueentries SET amount = " + inData.amount;
                    sqlStatement += "  WHERE RevenueEntryID = " + foundrow.RevenueEntryID;

                    dataAccessLayerX.executeQuery(sqlStatement, function(err, rows, fields) {
                        cb(err, null);
                    });
                }
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                logger.log('error', arguments.callee.toString(), err);
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.AddSalesTargetStageChangeLogEntries = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var SalesTargetStageChangeLogEntry = {};
                SalesTargetStageChangeLogEntry.SalesTargetID = inData.salestargetid;
                SalesTargetStageChangeLogEntry.SalesTargetStageFromID = inData.salestargetstagefromid;
                SalesTargetStageChangeLogEntry.SalesTargetStageToID = inData.salestargetstagetoid;
                SalesTargetStageChangeLogEntry.Occurred = new Date().toISOString().slice(0, 19).replace('T', ' ');
                SalesTargetStageChangeLogEntry.ChangedBySecurityUserID = inData.changedbysecurityuserid;
                SalesTargetStageChangeLogEntry.CampaignID = inData.campaignid;
                SalesTargetStageChangeLogEntry.TeamID = inData.teamid;

                dataAccessLayerX.addSalesTargetStageChangeLogEntry(SalesTargetStageChangeLogEntry, function(err, result) {
                    jsonObjectToReturn.salestargetstagechangelogentryid = result.insertId;
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalAccountsCountForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT count(*) as totalaccounts";
                sqlSelectStatement += " FROM salestargets sts WHERE sts.SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND sts.SalesTargetStageID = 5 AND sts.TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.totalaccounts = rows[0].totalaccounts;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
};

businessLogic.prototype.RetrieveTotalAccountsByMonthForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var salestargethistoryrecords = null;
    var distinctsalestargets = null;
    var daterangetoprocess = null;
    var startdate = null;
    var enddate = null;

    jsonObjectToReturn.accountaccumulationdata = [];

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select * from salestargets sts ";
                sqlSelectStatement += " INNER JOIN salestargetstagechangelogentries stscl ON sts.SalesTargetID = stscl.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.SecurityUserID = " + inData.securityuserid + " AND sts.IsDeleted IS NULL AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " ORDER BY stscl.Occurred ASC"

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        salestargethistoryrecords = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select DISTINCT(sts.SalesTargetID) from salestargets sts ";
                sqlSelectStatement += " INNER JOIN salestargetstagechangelogentries stscl ON sts.SalesTargetID = stscl.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.SecurityUserID = " + inData.securityuserid + " AND sts.IsDeleted IS NULL AND sts.TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        distinctsalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select MIN(sts.Created) as firstdate, MAX(sts.Created) as maxcreated, MAX(stscl.Occurred) as maxoccurred from salestargets sts ";
                sqlSelectStatement += " INNER JOIN salestargetstagechangelogentries stscl ON sts.SalesTargetID = stscl.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.SecurityUserID = " + inData.securityuserid + " AND sts.IsDeleted IS NULL and sts.TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        daterangetoprocess = rows;
                    }
                    cb(err, null);
                });
            },
            function (cb) {  // prepare all moment objects and get our start and end dates for this user's sales targets
                startdate = moment(daterangetoprocess[0].firstdate);
                var testdateone = moment(daterangetoprocess[0].maxcreated);
                var testdatetwo = moment(daterangetoprocess[0].maxoccurred);

                if (true == testdateone.isBefore(testdatetwo)) {
                    enddate = testdatetwo;
                }
                else {
                    enddate = testdateone;
                }

                async.each(salestargethistoryrecords, function(row, callback) {
                    row.momentcreated = moment(row.Created);
                    row.momentoccurred = moment(row.Occurred);
                    callback();
                },
                function(err) {
                    cb(null, null);
                });
            },
            function (cb) { // now we build our return array that shows month, year, and total accounts accumlated by that month and year

                var currentdate = startdate;
                var currentmonth = currentdate.month();
                var currentyear = currentdate.year();

                async.whilst(
                    function () {
                        var endmonth = enddate.month();
                        var endyear = enddate.year();

                        if (currentdate.month() > endmonth && currentdate.year() >= endyear) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                    function (callback) {
                        var newmonth = {};
                        newmonth.month = currentdate.month();
                        newmonth.year = currentdate.year();
                        newmonth.accountscount = 0;
                        jsonObjectToReturn.accountaccumulationdata.push(newmonth);

                        currentdate.add(1, 'M');

                        callback(null, null);
                    },
                    function (err, n) {
                        cb(null, null);
                    }
                );

            },
            function (cb) { // now calculate all of our accounts for each month, we loop through sales target history and figure out if dates allow the acceptance of a sales target active

                // We loop through each accum month, then for each sales target we figure out if that sales target was an
                // account on that month

                async.each(distinctsalestargets, function(salestargetrow, callback) {
                        async.each(jsonObjectToReturn.accountaccumulationdata, function(accumrow, callback) {

                                // build start and end periods when this sales target was an account so we can test overlap

                                var periodsasaccount = [];
                                var isinperiod = false;

                                async.each(salestargethistoryrecords, function(salestargethistoryrecordrow, callback) {
                                        if (salestargethistoryrecordrow.SalesTargetID == salestargetrow.SalesTargetID) {

                                            if (salestargethistoryrecordrow.SalesTargetStageToID == 5 && isinperiod == false) {
                                                isinperiod = true;
                                                var period = {};
                                                period.start = salestargethistoryrecordrow.momentoccurred;
                                                period.end = null;
                                                periodsasaccount.push(period);
                                            }

                                            if (salestargethistoryrecordrow.SalesTargetStageToID != 5 && isinperiod == true) {
                                                isinperiod = false;
                                                periodsasaccount[periodsasaccount.length - 1].end = salestargethistoryrecordrow.momentoccurred;
                                            }
                                        }

                                        callback();
                                },
                                function(err) {

                                });

                                if (periodsasaccount.length > 0) {
                                    if (periodsasaccount[periodsasaccount.length - 1].end == null) {
                                        periodsasaccount[periodsasaccount.length - 1].end = moment(); // just set end to today
                                    }
                                }

                                // now we loop through periods and see if any period overlaps the current month, if
                                // it does it counts as an account for that month

                                var overlaps = 0;

                                async.each(periodsasaccount, function(periodinaccountrow, callback) {

                                        var days = daysInMonth(accumrow.month, accumrow.year);
                                        var found = false;

                                        async.whilst(
                                            function ()
                                            {
                                                if (days == 0)
                                                    return false;

                                                if (found == true)
                                                    return false;

                                                return true;
                                            },
                                            function (callback) {

                                                var testmoment = moment({year: accumrow.year, month: accumrow.month, day: days});

                                                if (testmoment.isBetween(periodinaccountrow.start, periodinaccountrow.end)) {
                                                    found = true;
                                                    overlaps++;
                                                }

                                                days--;

                                                callback();
                                            },
                                            function (err, n) {
                                                callback();
                                            }
                                        );
                                    },
                                function(err) {

                                });

                                if (overlaps > 0) {
                                    accumrow.accountscount += 1;
                                }

                                callback();
                        },
                        function(err) {
                            callback();
                        });
                },
                function(err) {
                    cb(null, null);
                });

            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalNewSalesTargetsForMonthForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select count(distinct(stsc.salestargetid)) as newsalestargets ";
                sqlSelectStatement += " FROM salestargetstagechangelogentries stsc ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = stsc.SalesTargetID " ;
                sqlSelectStatement += " WHERE month(Created) = " + inData.month + " and year(Created) = " + inData.year;
                sqlSelectStatement += " and sts.SecurityUserID = " + inData.securityuserid + " AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.newsalestargetscount = rows[0].newsalestargets;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select count(distinct(stsc.salestargetid)) as newsalestargets ";
                sqlSelectStatement += " FROM salestargetstagechangelogentries stsc ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = stsc.SalesTargetID " ;
                sqlSelectStatement += " WHERE stsc.SalesTargetStageToID = 5 and month(occurred) = " + inData.month + " and year(Occurred) = " + inData.year;
                sqlSelectStatement += " and sts.SecurityUserID = " + inData.securityuserid + " AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.convertedsalestargetscount = rows[0].newsalestargets;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalNewSalesTargetsForPreviousMonthsForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select count(distinct(stsc.salestargetid)) as newsalestargets, YEAR(Created) AS ayear, MONTH(Created) AS amonth ";
                sqlSelectStatement += " FROM salestargetstagechangelogentries stsc ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = stsc.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.SecurityUserID = " + inData.securityuserid + " AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY YEAR(Created), MONTH(Created) ";
                sqlSelectStatement += " ORDER BY YEAR(Created), MONTH(Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.newsalestargetdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select count(distinct(stsc.salestargetid)) AS convertedsalestargets, year(Occurred) AS ayear, month(Occurred) AS amonth ";
                sqlSelectStatement += " FROM salestargetstagechangelogentries stsc ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = stsc.SalesTargetID ";
                sqlSelectStatement += " WHERE stsc.SalesTargetStageToID = 5 ";
                sqlSelectStatement += " and sts.SecurityUserID = " + inData.securityuserid + " AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(Occurred), month(Occurred) ";
                sqlSelectStatement += " ORDER BY year(Occurred), month(Occurred);";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.convertedsalestargetdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveQuotesSentForMonthByUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as quotecount, year(q.Created) ayear, month(q.Created) as amonth ";
                sqlSelectStatement += " FROM quotes q ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = q.SalesTargetID ";
                sqlSelectStatement += " WHERE st.SecurityUserID = " + inData.securityuserid + " AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(q.Created), month(q.Created) ";
                sqlSelectStatement += " ORDER BY year(q.Created), month(q.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.quotesdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveQuotesSentForPreviousMonthsByUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as quotecount, year(q.Created) ayear, month(q.Created) as amonth ";
                sqlSelectStatement += " FROM quotes q ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = q.SalesTargetID ";
                sqlSelectStatement += " WHERE st.SecurityUserID = " + inData.securityuserid + " AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(q.Created), month(q.Created) ";
                sqlSelectStatement += " ORDER BY year(q.Created), month(q.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.quotesdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealEstimateCountForMonthForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as dealestimatecount, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE st.SecurityUserID = " + inData.securityuserid + " AND d.IsEstimate = 1 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealEstimateCountForPreviousMonthsForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as dealestimatecount, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE st.SecurityUserID = " + inData.securityuserid + " AND d.IsEstimate = 1 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealCountForMonthForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as dealcount, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE st.SecurityUserID = " + inData.securityuserid + " AND d.IsEstimate = 0 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealCountForPreviousMonthsForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as dealcount, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE st.SecurityUserID = " + inData.securityuserid + " AND d.IsEstimate = 0 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealValueForMonthForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(Amount) as dealvalue, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE st.SecurityUserID = " + inData.securityuserid + " AND d.IsEstimate = 0 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealValueForPreviousMonthsForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(Amount) as dealvalue, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE st.SecurityUserID = " + inData.securityuserid + " AND d.IsEstimate = 0 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveRevenueForThisMonthForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(re.Amount) as revenueamount, re.periodmonth, re.periodyear ";
                sqlSelectStatement += " from revenueentries re ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = re.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.SecurityUserID = " + inData.securityuserid + " and re.IsDeleted = 0 AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY re.PeriodYear, re.PeriodMonth ";
                sqlSelectStatement += " ORDER BY re.PeriodYear, re.PeriodMonth ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.revenuedata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveRevenueForPreviousMonthsForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(re.Amount) as revenueamount, re.periodmonth, re.periodyear ";
                sqlSelectStatement += " from revenueentries re ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = re.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.SecurityUserID = " + inData.securityuserid + " and re.IsDeleted = 0 AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY re.PeriodYear, re.PeriodMonth ";
                sqlSelectStatement += " ORDER BY re.PeriodYear, re.PeriodMonth ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.revenuedata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrievePipelineTotalsForMonthForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as stagecount, stsg.`Name`, stsg.SalesTargetStageID ";
                sqlSelectStatement += " from salestargets sts ";
                sqlSelectStatement += " INNER JOIN salestargetstages stsg on stsg.SalesTargetStageID = sts.SalesTargetStageID ";
                sqlSelectStatement += " WHERE sts.SecurityUserID = " + inData.securityuserid + " and sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " GROUP BY sts.SalesTargetStageID ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.pipelinetotals = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveSalesTargetsAllocatedAcrossPipelineForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND SalesTargetStageID = 2 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function (err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.prospectsalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND SalesTargetStageID = 3 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.leadsalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND SalesTargetStageID = 4 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.opportunitysalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND SalesTargetStageID = 5 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.accountsalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " AND SalesTargetStageID = 6 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.inactivesalestargets = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveActivityDataForUser = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select COUNT(*) as occurences, at.`Name`, `at`.ActivityTypeID, year(Started) as ayear, month(Started) as amonth FROM activities a ";
                sqlSelectStatement += " INNER JOIN activitytypes at on at.ActivityTypeID = a.ActivityTypeID ";
                sqlSelectStatement += " where a.SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " GROUP BY a.ActivityTypeID, year(Started), month(Started) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function (err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.activityoccurrencestotals = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(a.DurationInHours) as totaldurationinhours, at.`Name`, `at`.ActivityTypeID, year(Started) as ayear, month(Started) as amonth FROM activities a ";
                sqlSelectStatement += " INNER JOIN activitytypes at on at.ActivityTypeID = a.ActivityTypeID ";
                sqlSelectStatement += " where a.SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " GROUP BY a.ActivityTypeID, year(Started), month(Started) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.activitydurationtotals = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select sum(a.DurationInHours) as totaldurationinhours, year(Started) as ayear, month(Started) as amonth from activities a ";
                sqlSelectStatement += " where a.SecurityUserID = " + inData.securityuserid;
                sqlSelectStatement += " GROUP BY year(Started), month(Started) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.activitydurationtotalsbymonth = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalAccountsCountForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT count(*) as totalaccounts";
                sqlSelectStatement += " FROM salestargets sts WHERE ";
                sqlSelectStatement += " sts.SalesTargetStageID = 5 AND sts.TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.totalaccounts = rows[0].totalaccounts;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalAccountsByMonthForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};
    var salestargethistoryrecords = null;
    var distinctsalestargets = null;
    var daterangetoprocess = null;
    var startdate = null;
    var enddate = null;

    jsonObjectToReturn.accountaccumulationdata = [];

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select * from salestargets sts ";
                sqlSelectStatement += " INNER JOIN salestargetstagechangelogentries stscl ON sts.SalesTargetID = stscl.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.IsDeleted IS NULL AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " ORDER BY stscl.Occurred ASC"

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        salestargethistoryrecords = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select DISTINCT(sts.SalesTargetID) from salestargets sts ";
                sqlSelectStatement += " INNER JOIN salestargetstagechangelogentries stscl ON sts.SalesTargetID = stscl.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.IsDeleted IS NULL AND sts.TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        distinctsalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select MIN(sts.Created) as firstdate, MAX(sts.Created) as maxcreated, MAX(stscl.Occurred) as maxoccurred from salestargets sts ";
                sqlSelectStatement += " INNER JOIN salestargetstagechangelogentries stscl ON sts.SalesTargetID = stscl.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.IsDeleted IS NULL and sts.TeamID = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        daterangetoprocess = rows;
                    }
                    cb(err, null);
                });
            },
            function (cb) {  // prepare all moment objects and get our start and end dates for this user's sales targets
                startdate = moment(daterangetoprocess[0].firstdate);
                var testdateone = moment(daterangetoprocess[0].maxcreated);
                var testdatetwo = moment(daterangetoprocess[0].maxoccurred);

                if (true == testdateone.isBefore(testdatetwo)) {
                    enddate = testdatetwo;
                }
                else {
                    enddate = testdateone;
                }

                async.each(salestargethistoryrecords, function(row, callback) {
                        row.momentcreated = moment(row.Created);
                        row.momentoccurred = moment(row.Occurred);
                        callback();
                    },
                    function(err) {
                        cb(null, null);
                    });
            },
            function (cb) { // now we build our return array that shows month, year, and total accounts accumlated by that month and year

                var currentdate = startdate;
                var currentmonth = currentdate.month();
                var currentyear = currentdate.year();

                async.whilst(
                    function () {
                        var endmonth = enddate.month();
                        var endyear = enddate.year();

                        if (currentdate.month() > endmonth && currentdate.year() >= endyear) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    },
                    function (callback) {
                        var newmonth = {};
                        newmonth.month = currentdate.month();
                        newmonth.year = currentdate.year();
                        newmonth.accountscount = 0;
                        jsonObjectToReturn.accountaccumulationdata.push(newmonth);

                        currentdate.add(1, 'M');

                        callback(null, null);
                    },
                    function (err, n) {
                        cb(null, null);
                    }
                );

            },
            function (cb) { // now calculate all of our accounts for each month, we loop through sales target history and figure out if dates allow the acceptance of a sales target active

                // We loop through each accum month, then for each sales target we figure out if that sales target was an
                // account on that month

                async.each(distinctsalestargets, function(salestargetrow, callback) {
                        async.each(jsonObjectToReturn.accountaccumulationdata, function(accumrow, callback) {

                                // build start and end periods when this sales target was an account so we can test overlap

                                var periodsasaccount = [];
                                var isinperiod = false;

                                async.each(salestargethistoryrecords, function(salestargethistoryrecordrow, callback) {
                                        if (salestargethistoryrecordrow.SalesTargetID == salestargetrow.SalesTargetID) {

                                            if (salestargethistoryrecordrow.SalesTargetStageToID == 5 && isinperiod == false) {
                                                isinperiod = true;
                                                var period = {};
                                                period.start = salestargethistoryrecordrow.momentoccurred;
                                                period.end = null;
                                                periodsasaccount.push(period);
                                            }

                                            if (salestargethistoryrecordrow.SalesTargetStageToID != 5 && isinperiod == true) {
                                                isinperiod = false;
                                                periodsasaccount[periodsasaccount.length - 1].end = salestargethistoryrecordrow.momentoccurred;
                                            }
                                        }

                                        callback();
                                    },
                                    function(err) {

                                    });

                                if (periodsasaccount.length > 0) {
                                    if (periodsasaccount[periodsasaccount.length - 1].end == null) {
                                        periodsasaccount[periodsasaccount.length - 1].end = moment(); // just set end to today
                                    }
                                }

                                // now we loop through periods and see if any period overlaps the current month, if
                                // it does it counts as an account for that month

                                var overlaps = 0;

                                async.each(periodsasaccount, function(periodinaccountrow, callback) {

                                        var days = daysInMonth(accumrow.month, accumrow.year);
                                        var found = false;

                                        async.whilst(
                                            function ()
                                            {
                                                if (days == 0)
                                                    return false;

                                                if (found == true)
                                                    return false;

                                                return true;
                                            },
                                            function (callback) {

                                                var testmoment = moment({year: accumrow.year, month: accumrow.month, day: days});

                                                if (testmoment.isBetween(periodinaccountrow.start, periodinaccountrow.end)) {
                                                    found = true;
                                                    overlaps++;
                                                }

                                                days--;

                                                callback();
                                            },
                                            function (err, n) {
                                                callback();
                                            }
                                        );
                                    },
                                    function(err) {

                                    });

                                if (overlaps > 0) {
                                    accumrow.accountscount += 1;
                                }

                                callback();
                            },
                            function(err) {
                                callback();
                            });
                    },
                    function(err) {
                        cb(null, null);
                    });

            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalNewSalesTargetsForMonthForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select count(distinct(stsc.salestargetid)) as newsalestargets ";
                sqlSelectStatement += " FROM salestargetstagechangelogentries stsc ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = stsc.SalesTargetID " ;
                sqlSelectStatement += " WHERE month(Created) = " + inData.month + " and year(Created) = " + inData.year;
                sqlSelectStatement += " and sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.newsalestargetscount = rows[0].newsalestargets;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select count(distinct(stsc.salestargetid)) as newsalestargets ";
                sqlSelectStatement += " FROM salestargetstagechangelogentries stsc ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = stsc.SalesTargetID " ;
                sqlSelectStatement += " WHERE stsc.SalesTargetStageToID = 5 and month(occurred) = " + inData.month + " and year(Occurred) = " + inData.year;
                sqlSelectStatement += " AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.convertedsalestargetscount = rows[0].newsalestargets;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select count(distinct(stsc.salestargetid)) as newsalestargets, YEAR(Created) AS ayear, MONTH(Created) AS amonth ";
                sqlSelectStatement += " FROM salestargetstagechangelogentries stsc ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = stsc.SalesTargetID ";
                sqlSelectStatement += " WHERE sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY YEAR(Created), MONTH(Created) ";
                sqlSelectStatement += " ORDER BY YEAR(Created), MONTH(Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.newsalestargetdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "select count(distinct(stsc.salestargetid)) AS convertedsalestargets, year(Occurred) AS ayear, month(Occurred) AS amonth ";
                sqlSelectStatement += " FROM salestargetstagechangelogentries stsc ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = stsc.SalesTargetID ";
                sqlSelectStatement += " WHERE stsc.SalesTargetStageToID = 5 ";
                sqlSelectStatement += " AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(Occurred), month(Occurred) ";
                sqlSelectStatement += " ORDER BY year(Occurred), month(Occurred);";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.convertedsalestargetdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveQuotesSentForMonthByTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as quotecount, year(q.Created) ayear, month(q.Created) as amonth ";
                sqlSelectStatement += " FROM quotes q ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = q.SalesTargetID ";
                sqlSelectStatement += " WHERE st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(q.Created), month(q.Created) ";
                sqlSelectStatement += " ORDER BY year(q.Created), month(q.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.quotesdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveQuotesSentForPreviousMonthsByTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as quotecount, year(q.Created) ayear, month(q.Created) as amonth ";
                sqlSelectStatement += " FROM quotes q ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = q.SalesTargetID ";
                sqlSelectStatement += " WHERE st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(q.Created), month(q.Created) ";
                sqlSelectStatement += " ORDER BY year(q.Created), month(q.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.quotesdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealEstimateCountForMonthForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as dealestimatecount, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE d.IsEstimate = 1 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealEstimateCountForPreviousMonthsForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as dealestimatecount, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE d.IsEstimate = 1 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealCountForMonthForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as dealcount, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE d.IsEstimate = 0 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealCountForPreviousMonthsForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as dealcount, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE d.IsEstimate = 0 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealValueForMonthForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(Amount) as dealvalue, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE d.IsEstimate = 0 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveDealValueForPreviousMonthsForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(Amount) as dealvalue, year(d.Created) ayear, month(d.Created) as amonth ";
                sqlSelectStatement += " FROM deals d ";
                sqlSelectStatement += " INNER JOIN salestargets st ON st.SalesTargetID = d.SalesTargetID ";
                sqlSelectStatement += " WHERE d.IsEstimate = 0 AND st.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND st.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY year(d.Created), month(d.Created) ";
                sqlSelectStatement += " ORDER BY year(d.Created), month(d.Created) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.dealsdata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveRevenueForThisMonthForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(re.Amount) as revenueamount, re.periodmonth, re.periodyear ";
                sqlSelectStatement += " from revenueentries re ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = re.SalesTargetID ";
                sqlSelectStatement += " WHERE re.IsDeleted = 0 AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY re.PeriodYear, re.PeriodMonth ";
                sqlSelectStatement += " ORDER BY re.PeriodYear, re.PeriodMonth ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.revenuedata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveRevenueForPreviousMonthsForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(re.Amount) as revenueamount, re.periodmonth, re.periodyear ";
                sqlSelectStatement += " from revenueentries re ";
                sqlSelectStatement += " INNER JOIN salestargets sts ON sts.SalesTargetID = re.SalesTargetID ";
                sqlSelectStatement += " WHERE re.IsDeleted = 0 AND sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " AND sts.IsDeleted IS NULL ";
                sqlSelectStatement += " GROUP BY re.PeriodYear, re.PeriodMonth ";
                sqlSelectStatement += " ORDER BY re.PeriodYear, re.PeriodMonth ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.revenuedata = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrievePipelineTotalsForMonthForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select count(*) as stagecount, stsg.`Name`, stsg.SalesTargetStageID ";
                sqlSelectStatement += " from salestargets sts ";
                sqlSelectStatement += " INNER JOIN salestargetstages stsg on stsg.SalesTargetStageID = sts.SalesTargetStageID ";
                sqlSelectStatement += " WHERE sts.TeamID = " + inData.teamid;
                sqlSelectStatement += " GROUP BY sts.SalesTargetStageID ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.pipelinetotals = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveSalesTargetsAllocatedAcrossPipelineForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SalesTargetStageID = 2 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function (err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.prospectsalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SalesTargetStageID = 3 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.leadsalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SalesTargetStageID = 4 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.opportunitysalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SalesTargetStageID = 5 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.accountsalestargets = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select * from salestargets where SalesTargetStageID = 6 and teamid = " + inData.teamid;

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.inactivesalestargets = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.RetrieveActivityDataForTeam = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select COUNT(*) as occurences, at.`Name`, `at`.ActivityTypeID, year(Started) as ayear, month(Started) as amonth FROM activities a ";
                sqlSelectStatement += " INNER JOIN activitytypes at on at.ActivityTypeID = a.ActivityTypeID ";
                sqlSelectStatement += " INNER JOIN teammembers tm on tm.SecurityUserID = a.SecurityUserID ";
                sqlSelectStatement += " where tm.TeamID = " + inData.teamid;
                sqlSelectStatement += " GROUP BY a.ActivityTypeID, year(Started), month(Started) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function (err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.activityoccurrencestotals = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select SUM(a.DurationInHours) as totaldurationinhours, at.`Name`, `at`.ActivityTypeID, year(Started) as ayear, month(Started) as amonth FROM activities a ";
                sqlSelectStatement += " INNER JOIN activitytypes at on at.ActivityTypeID = a.ActivityTypeID ";
                sqlSelectStatement += " INNER JOIN teammembers tm on tm.SecurityUserID = a.SecurityUserID ";
                sqlSelectStatement += " where tm.TeamID = " + inData.teamid;
                sqlSelectStatement += " GROUP BY a.ActivityTypeID, year(Started), month(Started) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.activitydurationtotals = rows;
                    }
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = " select sum(a.DurationInHours) as totaldurationinhours, year(Started) as ayear, month(Started) as amonth from activities a ";
                sqlSelectStatement += " INNER JOIN teammembers tm on tm.SecurityUserID = a.SecurityUserID ";
                sqlSelectStatement += " where tm.TeamID = " + inData.teamid;
                sqlSelectStatement += " GROUP BY year(Started), month(Started) ";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows) {
                        jsonObjectToReturn.activitydurationtotalsbymonth = rows;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.CopyFile = function (inData, cb) { // forward to file storage service
    var self = this;

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                var objectToSend = {};

                objectToSend.apiusername = config.filestorageserviceapiusername;
                objectToSend.apipassword = config.filestorageserviceapipassword;

                objectToSend.sourcefileid = inData.sourcefileid;

                self.postAjaj(config.filestorageserviceapiurl + '/ajaj/CopyFile', objectToSend, function (err, res, body) {
                    if (!err) {
                        jsonObjectToReturn.newfileid = JSON.parse(body).outData.newfileid;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.StartFileDownload = function (inData, cb) { // forward to file storage service
    var self = this;

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                var objectToSend = {};

                objectToSend.apiusername = config.filestorageserviceapiusername;
                objectToSend.apipassword = config.filestorageserviceapipassword;

                objectToSend.fileid = inData.fileid;

                self.postAjaj(config.filestorageserviceapiurl + '/ajaj/RetrieveFilePartCount', objectToSend, function (err, res, body) {
                    if (!err) {
                        jsonObjectToReturn.filepartcount = JSON.parse(body).outData.filepartcount;
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.DownloadFilePart = function (inData, cb) { // forward to file storage service
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                var objectToSend = {};

                objectToSend.apiusername = config.filestorageserviceapiusername;
                objectToSend.apipassword = config.filestorageserviceapipassword;

                objectToSend.fileid = inData.fileid;
                objectToSend.partindex = inData.partindex;

                self.postAjaj(config.filestorageserviceapiurl + '/ajaj/RetrieveFilePartByFileIdAndPartIndex', objectToSend, function(err, res, body) {
                    if (!err) {
                        jsonObjectToReturn.partcontent = JSON.parse(body).outData.partcontent;

                        dataAccessLayerX.openConnection(function(err) {

                            if (!err) {
                                var DataTransferLogEntry = {};

                                DataTransferLogEntry.SecurityUserId = inData.securityuserid;
                                DataTransferLogEntry.IsDownload = 1;
                                DataTransferLogEntry.TransferInBytes = jsonObjectToReturn.partcontent.length;
                                DataTransferLogEntry.TransferDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

                                dataAccessLayerX.addDataTransferLogEntry(DataTransferLogEntry, function (err, result) {
                                    dataAccessLayerX.closeConnection();
                                    cb(err, null);
                                });
                            }
                            else {
                                cb(err, null);
                            }
                        });
                    }
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

module.exports.businessLogic = businessLogic;