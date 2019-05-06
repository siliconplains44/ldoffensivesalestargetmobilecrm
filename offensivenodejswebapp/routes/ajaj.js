var mBusinessLogic = require('../bl');

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

module.exports.LoginSystemUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    result = true;
    //bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

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
    //});

};

module.exports.RegisterNewUser = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    result = true;
    //bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RegisterNewUser(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RegisterNewUser' + err);
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
    //});

};

module.exports.ResetSystemUserPasswordByUsername = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    result = true;
    //bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ResetSystemUserPasswordByUsername(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ResetSystemUserPasswordByUsername' + err);
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
    //});

};

module.exports.RetrieveUsernameByEmailAddress = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    result = true;
    //bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.RetrieveUsernameByEmailAddress(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in RetrieveUsernameByEmailAddress' + err);
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
    //});

};

module.exports.ModifyAccountLogin = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    result = true;
    //bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

        if (result == false) {
            jsonObjectResult.result = false;
            jsonObjectReceived.err = 'api authentication failed';
            res.json(200, jsonObjectResult);
        }
        else {
            bl.ModifyAccountLogin(jsonObjectReceived, function (err, result, outData) {

                if (err) {
                    console.log('error in ModifyAccountLogin' + err);
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
    //});

};

module.exports.IsUsernameInUse = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    result = true;
    //bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

    if (result == false) {
        jsonObjectResult.result = false;
        jsonObjectReceived.err = 'api authentication failed';
        res.json(200, jsonObjectResult);
    }
    else {
        bl.IsUsernameInUse(jsonObjectReceived, function (err, result, outData) {

            if (err) {
                console.log('error in IsUsernameInUse' + err);
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
    //});

};

module.exports.LogModuleView = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    result = true;
    //bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

    if (result == false) {
        jsonObjectResult.result = false;
        jsonObjectReceived.err = 'api authentication failed';
        res.json(200, jsonObjectResult);
    }
    else {
        bl.LogModuleView(jsonObjectReceived, function (err, result, outData) {

            if (err) {
                console.log('error in LogModuleView' + err);
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
    //});

};

module.exports.LogModuleInteraction = function (req, res) {

    var bl = new mBusinessLogic.businessLogic();

    var jsonObjectReceived = req.body;
    var jsonObjectResult = {};

    result = true;
    //bl.authenticateApiUser(jsonObjectReceived.apiusername, jsonObjectReceived.apipassword, function(result) {

    if (result == false) {
        jsonObjectResult.result = false;
        jsonObjectReceived.err = 'api authentication failed';
        res.json(200, jsonObjectResult);
    }
    else {
        bl.LogModuleInteraction(jsonObjectReceived, function (err, result, outData) {

            if (err) {
                console.log('error in LogModuleInteraction' + err);
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
    //});

};

module.exports.loadRoutes = function(app, ajaj) {
    app.post('/ajaj/LoginSystemUser', ajaj.LoginSystemUser);
    app.post('/ajaj/RegisterNewUser', ajaj.RegisterNewUser);
    app.post('/ajaj/ResetSystemUserPasswordByUsername', ajaj.ResetSystemUserPasswordByUsername);
    app.post('/ajaj/RetrieveUsernameByEmailAddress', ajaj.RetrieveUsernameByEmailAddress);
    app.post('/ajaj/ModifyAccountLogin', ajaj.ModifyAccountLogin);
    app.post('/ajaj/IsUsernameInUse', ajaj.IsUsernameInUse);
    app.post('/ajaj/LogModuleView', ajaj.LogModuleView);
    app.post('/ajaj/LogModuleInteraction', ajaj.LogModuleInteraction);
};