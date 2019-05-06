
var mDataAccessLayerXPooled = require('./dalxpooled');
var async = require('async');
var enums = require ('./enums');
var requestenhanced = require('request-enhanced');
var config = require('./config');
var moment = require('moment');
var paypal = require('paypal-rest-sdk');

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
        timeout: 500000
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
            console.log(err);
            console.trace();
            cb(err, false, null);
        }
    });
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
                            cb(null, null);
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
                var objectToSend = {};

                objectToSend.apiusername = config.securityserviceapiusername;
                objectToSend.apipassword = config.securityserviceapipassword;

                objectToSend.SecurityUserInteraction =  { };

                objectToSend.SecurityUserInteraction.SystemComponentId = 13;
                objectToSend.SecurityUserInteraction.SecurityUserId = jsonObjectToReturn.securityuserid;
                objectToSend.SecurityUserInteraction.SecurityUserInteractionTypeId = 21;
                objectToSend.SecurityUserInteraction.Occurred = new Date().toISOString().slice(0, 19).replace('T', ' ');

                self.postAjaj(config.securityserviceapiurl + '/ajaj/LogSecurityUserInteraction', objectToSend, function(err, res, body) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {

                if (err != 'unable to login to security service') {
                    console.log(err);
                    console.trace();

                    cb(null, false, jsonObjectToReturn);
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

businessLogic.prototype.RegisterNewUser = function(inData, cb) {
    var self = this;

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var jsonObjectToReturn = {};

    async.series([
            function(cb) {
                var objectToSend = {};

                objectToSend.apiusername = config.securityserviceapiusername;
                objectToSend.apipassword = config.securityserviceapipassword;

                objectToSend.SecurityUser = inData.SecurityUser;

                self.postAjaj(config.securityserviceapiurl + '/ajaj/CreateSystemUser', objectToSend, function(err, res, body) {
                    if (!err) {
                        var jsonReturnObject = JSON.parse(body);
                        SecurityUser = jsonReturnObject.outData.SecurityUser;
                        jsonObjectToReturn.securityUser = SecurityUser;
                    }

                    cb(err, null);
                });
            },
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var Account = {};

                Account.Created = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Account.EmailAddress = inData.SecurityUser.EmailAddress;
                Account.LastName = inData.SecurityUser.LastName;
                Account.FirstName = inData.SecurityUser.FirstName;
                Account.MobilePhoneNumber = inData.SecurityUser.MobilePhoneNumber;
                Account.SecurityUserId = jsonObjectToReturn.securityUser.SecurityUserId;

                dataAccessLayerX.addAccount(Account, function(err, result) {
                    cb(err, null);
                });
            },
            function(cb) {
                var Credit = {};

                Credit.SecurityUserID = jsonObjectToReturn.securityUser.SecurityUserId;
                Credit.Amount = 35;
                Credit.Posted = new Date().toISOString().slice(0, 19).replace('T', ' ');
                Credit.ServiceOfferingID = 1;
                Credit.Notes = 'New User Sign Up Free Credit';

                dataAccessLayerX.addCredit(Credit, function(err, result) {
                    cb(err, null);
                });
            },
            function(cb) {
                var AccountActivation = {};

                AccountActivation.SecurityUserID = jsonObjectToReturn.securityUser.SecurityUserId;
                AccountActivation.Activated = new Date().toISOString().slice(0, 19).replace('T', ' ');

                dataAccessLayerX.addAccountActivation(AccountActivation, function(err, result) {
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

businessLogic.prototype.ResetSystemUserPasswordByUsername = function (inData, cb) {
    var self = this;

    async.series([
            function(cb) {

                var objectToSend = {};

                objectToSend.apiusername = config.securityserviceapiusername;
                objectToSend.apipassword = config.securityserviceapipassword;

                objectToSend.username = inData.username;
                objectToSend.password = inData.password;

                self.postAjaj(config.securityserviceapiurl + '/ajaj/ResetSystemUserPasswordByUsername', objectToSend, function(err, res, body) {
                    cb(err, null);
                });
            }
        ],
        function(err, results) {
            if (err) {
                console.log(err);
                console.trace();
            }

            if (err) {
                cb(err, false, null);
            }
            else {
                cb(null, true, null);
            }
        }
    );
};

businessLogic.prototype.RetrieveUsernameByEmailAddress = function (inData, cb) {
    var self = this;

    var jsonObjectToReturn = {};

    var dataAccessLayerX = new mDataAccessLayerXPooled.dataAccessLayerX(GLOBAL.serviceConnectionPool);

    var securityUserId = -1;
    var username = '';

    async.series([
            function(cb) {
                dataAccessLayerX.openConnection(function(err) {
                    cb(err, null);
                });
            },
            function(cb) {
                var sqlSelectStatement = "SELECT SecurityUserId FROM accounts WHERE EmailAddress= '" + inData.emailaddress + "'";

                dataAccessLayerX.executeQuery(sqlSelectStatement, function(err, rows, fields) {
                    if (rows.length > 0){
                        securityUserId = rows[0].SecurityUserId;
                        cb(err, null);
                    }
                    else {
                        cb('Unable to find user', null);
                    }
                });
            },
            function(cb) {

                var objectToSend = {};

                objectToSend.apiusername = config.securityserviceapiusername;
                objectToSend.apipassword = config.securityserviceapipassword;

                objectToSend.securityuserid = securityUserId;

                self.postAjaj(config.securityserviceapiurl + '/ajaj/RetrieveUsernameBySecurityUserId', objectToSend, function(err, res, body) {
                    var jsonReturnObject = JSON.parse(body);
                    if (jsonReturnObject.result == true) {
                        username = jsonReturnObject.outData.username;
                        cb(err, null);
                    }
                    else {
                        cb('Unable to find user', null);
                    }
                });
            },
            function(cb) {

                var objectToSend = {};

                objectToSend.apiusername = config.emailsenderserviceapiusername;
                objectToSend.apipassword = config.emailsenderserviceapipassword;

                objectToSend.Email = {};

                objectToSend.Email.From = 'inquiries@leoparddata.com';
                objectToSend.Email.To = inData.emailaddress;
                objectToSend.Email.Subject = 'Leopard Data Automated Notification'
                objectToSend.Email.Text = 'Your Leopard Data Services Store username is -> ' + username;
                objectToSend.Email.Html = '';

                self.postAjaj(config.emailsenderserviceurl + '/ajaj/sendEmail', objectToSend, function(err, res, body) {
                    var jsonReturnObject = JSON.parse(body);
                    if (jsonReturnObject.result == true) {

                        cb(err, null);
                    }
                    else {
                        cb(err, null);
                    }
                });
            }
        ],
        function(err, results) {
            dataAccessLayerX.closeConnection();

            if (err && err !== 'Unable to find user') {
                console.log(err);
                console.trace();
            }

            if (err) {
                cb(err, false, null);
            }
            else {
                cb(null, true, jsonObjectToReturn);
            }
        }
    );
};

businessLogic.prototype.LogModuleView = function(inData, cb) {
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

                inData.moduleview.Occurred = new Date().toISOString().slice(0, 19).replace('T', ' ');

                dataAccessLayerX.addModuleView(inData.moduleview, function(err, result) {
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

businessLogic.prototype.LogModuleInteraction = function(inData, cb) {
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

                inData.moduleinteraction.Occurred = new Date().toISOString().slice(0, 19).replace('T', ' ');

                dataAccessLayerX.addModuleInteraction(inData.moduleinteraction, function(err, result) {
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

module.exports.businessLogic = businessLogic;