/**
 * Created by Allan on 5/19/2015.
 */

function ViewModule() { };

ViewModule.Title = "Password Retrieval";
ViewModule.minimal = null;

// page vars

// page controls

ViewModule.ButtonRetrieve = null;
ViewModule.LinkHome = $('#LinkHome');
ViewModule.TextUsername = $('#TextUsername');
ViewModule.AlertTextUsername = $('#AlertTextUsername');
ViewModule.TextNewPassword = $('#TextNewPassword');
ViewModule.AlertTextNewPassword = $('#AlertTextNewPassword');
ViewModule.TextRepeatNewPassword = $('#TextRepeatNewPassword');
ViewModule.AlertTextRepeatNewPassword= $('#AlertTextRepeatNewPassword');
ViewModule.ButtonReset = $('#ButtonReset');

ViewModule.AccountResetModal = $('#AccountResetModal');
ViewModule.ParagraphLoginResetStatus = $('#ParagraphLoginResetStatus');

ViewModule.Initialize = function(minimal) {
    var self = this;

    self.minimal = minimal;

    // load page control references

    // initialize initial control state

    ViewModule.AlertTextUsername.hide();
    ViewModule.AlertTextNewPassword.hide();
    ViewModule.AlertTextRepeatNewPassword.hide();

    // load up events

    ViewModule.LinkHome.click(function() {
        minimal.navigateToPage('home', true);
    });

    ViewModule.ButtonReset.click(function(e) {

        e.preventDefault();

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

        if (ViewModule.TextNewPassword.val().length == 0) {
            validationFailed = true;
            ViewModule.AlertTextNewPassword.text('Your password is required!');
            ViewModule.AlertTextNewPassword.show();
        } else {

            if (ViewModule.TextNewPassword.val().length < 10) {
                validationFailed = true;
                ViewModule.AlertTextNewPassword.text('Your password must be at least 10 characters long!');
                ViewModule.AlertTextNewPassword.show();
            } else {
                ViewModule.AlertTextNewPassword.hide();
            }

            if (ViewModule.TextNewPassword.val() !==
                ViewModule.TextRepeatNewPassword.val()) {
                validationFailed = true;
                ViewModule.AlertTextRepeatNewPassword.show();
            } else {
                ViewModule.AlertTextRepeatNewPassword.hide();
            }
        }

        if (false == validationFailed) {

            var objectToSend = {};

            // security service
            objectToSend.username = ViewModule.TextUsername.val();
            objectToSend.password = ViewModule.TextNewPassword.val();

            postAjaj('/ajaj/ResetSystemUserPasswordByUsername', objectToSend, function (returnObject) {
                if (returnObject.result == true) {
                    ViewModule.ParagraphLoginResetStatus.text('Your login was reset successfully, in 3 seconds we will redirect you to the login page!');

                    ViewModule.AccountResetModal.modal({
                        keyboard: false
                    });

                    setTimeout(function () {
                        ViewModule.AccountResetModal.hide();
                        ViewModule.AccountResetModal.removeData();
                        minimal.navigateToPage('login', true);
                    }, 3000);
                }
                else {
                    // this is bad, for some reason registration failed!
                    ViewModule.ParagraphLoginResetStatus.text('Reset failed... please call Leopard Data at 806-305-0223 for support!');

                    ViewModule.AccountResetModal.modal({
                        keyboard: false
                    });

                    setTimeout(function () {
                        ViewModule.AccountResetModal.hide();
                        ViewModule.AccountResetModal.removeData();
                    }, 3000);
                }
            });
        }

    });

};

ViewModule.Deinitialize = function() {
    var self = this;
};