/**
 * Created by Allan on 1/27/2015.
 */

function ViewModule() {
};

ViewModule.Title = "Leopard Data Title";
ViewModule.minimal = null;

// page vars

// page controls

ViewModule.LinkDashboard = $('#LinkDashboard');

ViewModule.TextUsername = $('#TextUsername');
ViewModule.TextPasswordPassword = $('#TextPasswordPassword');

ViewModule.AlertTextUsername = $('#AlertTextUsername');
ViewModule.AlertTextPasswordPassword = $('#AlertTextPasswordPassword');

ViewModule.ButtonSubmit = $('#ButtonSubmit');

ViewModule.AccountChangedModal = $('#AccountChangedModal');
ViewModule.ParagraphStatus = $('#ParagraphStatus');

ViewModule.Initialize = function (minimal) {
    var self = this;

    self.minimal = minimal;

    // load page control references

    // initialize initial control state

    ViewModule.AlertTextUsername.hide();
    ViewModule.AlertTextPasswordPassword.hide();

    // load up events

    ViewModule.LinkDashboard.click(function () {
        minimal.navigateToPage('dashboard', true);
    });

    ViewModule.ButtonSubmit.click(function (e) {

        var validationFailed = false;

        if (ViewModule.TextUsername.val().length == 0) {
            validationFailed = true;
            ViewModule.AlertTextUsername.text('Username is required!')
            ViewModule.AlertTextUsername.show()
        } else {

            if (ViewModule.TextUsername.val().length < 8) {
                validationFailed = true;
                ViewModule.AlertTextUsername.text('Your username must be at least 8 characters long')
                ViewModule.AlertTextUsername.show();
            } else {
                ViewModule.AlertTextUsername.hide();
            }
        }

        if (ViewModule.TextPasswordPassword.val().length == 0) {
            validationFailed = true;
            ViewModule.AlertTextPasswordPassword.text('Your password is required!');
            ViewModule.AlertTextPasswordPassword.show();
        } else {

            if (ViewModule.TextPasswordPassword.val().length < 10) {
                validationFailed = true;
                ViewModule.AlertTextPasswordPassword.text('Your password must be at least 10 characters long!');
                ViewModule.AlertTextPasswordPassword.show();
            } else {
                ViewModule.AlertTextPasswordPassword.hide();
            }
        }

        var objectToSend = {};
        objectToSend.username = ViewModule.TextUsername.val();

        postAjaj('/ajaj/IsUsernameInUse', objectToSend, function (returnObject) {

            if (returnObject.outData.inuse == 0 ||
                (returnObject.outData.inuse == 1 && ViewModule.TextUsername.val() === application.Username)) {

                if (false == validationFailed) {

                    var objectToSend = {};

                    // security service
                    objectToSend.securityuserid = application.loggedInUserID;
                    objectToSend.username = ViewModule.TextUsername.val();
                    objectToSend.password = ViewModule.TextPasswordPassword.val();

                    postAjaj('/ajaj/ModifyAccountLogin', objectToSend, function (returnObject) {
                        if (returnObject.result == true) {
                            ViewModule.AccountChangedModal.modal({
                                keyboard: false
                            });

                            setTimeout(function () {
                                ViewModule.AccountChangedModal.hide();
                                ViewModule.AccountChangedModal.removeData();
                            }, 3000);
                        }
                        else {
                            // this is bad, for some reason registration failed!
                            ViewModule.ParagraphStatus.text('Account update failed... please call Leopard Data at 806-305-0223 for support!');

                            ViewModule.AccountChangedModal.modal({
                                keyboard: false
                            });

                            setTimeout(function () {
                                ViewModule.AccountChangedModal.hide();
                                ViewModule.AccountChangedModal.removeData();
                            }, 5000);
                        }
                    });
                }
            }
            else {
                ViewModule.AlertTextUsername.text('Username is alread in use, please choose something unique!')
                ViewModule.AlertTextUsername.show();
            }
        });
    });

};

ViewModule.Deinitialize = function () {
    var self = this;
};