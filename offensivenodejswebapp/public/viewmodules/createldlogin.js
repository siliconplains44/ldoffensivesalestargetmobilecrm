/**
 * Created by Allan on 1/27/2015.
 */

function ViewModule() { };

ViewModule.Title = "Leopard Data Account Registration";
ViewModule.minimal = null;

// page vars

// page controls

ViewModule.ButtonRegister = $('#ButtonRegister');
ViewModule.LinkHome = $('#LinkHome');

ViewModule.TextLastName = $('#TextLastName');
ViewModule.TextFirstName = $('#TextFirstName');
ViewModule.TextUsername = $('#TextUsername');
ViewModule.TextPasswordPassword = $('#TextPasswordPassword');
ViewModule.TextPasswordRepeatPassword = $('#TextPasswordRepeatPassword');
ViewModule.TextEmailAddress = $('#TextEmailAddress');
ViewModule.TextRepeatEmailAddress = $('#TextRepeatEmailAddress');
ViewModule.TextMobilePhoneNumber = $('#TextMobilePhoneNumber');
ViewModule.TextRepeatMobilePhoneNumber = $('#TextRepeatMobilePhoneNumber');

ViewModule.AlertTextLastName = $('#AlertTextLastName');
ViewModule.AlertTextFirstName = $('#AlertTextFirstName');
ViewModule.AlertTextUsername = $('#AlertTextUsername');
ViewModule.AlertTextPasswordPassword = $('#AlertTextPasswordPassword');
ViewModule.AlertTextPasswordRepeatPassword = $('#AlertTextPasswordRepeatPassword');
ViewModule.AlertTextEmailAddress = $('#AlertTextEmailAddress');
ViewModule.AlertTextRepeatEmailAddress = $('#AlertTextRepeatEmailAddress');
ViewModule.AlertTextMobilePhoneNumber = $('#AlertTextMobilePhoneNumber');
ViewModule.AlertTextRepeatMobilePhoneNumber = $('#AlertTextRepeatMobilePhoneNumber');

ViewModule.AccountReadyModal = $('#AccountReadyModal');
ViewModule.ParagraphLoginCreationStatus = $('#ParagraphLoginCreationStatus');

ViewModule.Initialize = function(minimal) {
    var self = this;

    self.minimal = minimal;

    // load page control references

    // initialize initial control state

    ViewModule.AlertTextLastName.hide();
    ViewModule.AlertTextFirstName.hide();
    ViewModule.AlertTextUsername.hide();
    ViewModule.AlertTextPasswordPassword.hide();
    ViewModule.AlertTextPasswordRepeatPassword.hide();
    ViewModule.AlertTextEmailAddress.hide();
    ViewModule.AlertTextRepeatEmailAddress.hide();
    ViewModule.AlertTextMobilePhoneNumber.hide();
    ViewModule.AlertTextRepeatMobilePhoneNumber.hide();

    // load up events

    ViewModule.LinkHome.click(function() {
        minimal.navigateToPage('home', true);
    });

    ViewModule.ButtonRegister.click(function(e) {

        e.preventDefault();

        var validationFailed = false;

        if (ViewModule.TextLastName.val().length == 0) {
            validationFailed = true;
            ViewModule.AlertTextLastName.show();
        } else {
            ViewModule.AlertTextLastName.hide();
        }

        if (ViewModule.TextFirstName.val().length == 0) {
            validationFailed = true;
            ViewModule.AlertTextFirstName.show();
        } else {
            ViewModule.AlertTextFirstName.hide();
        }

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

            if (ViewModule.TextPasswordPassword.val() !==
                ViewModule.TextPasswordRepeatPassword.val()) {
                validationFailed = true;
                ViewModule.AlertTextPasswordRepeatPassword.show();
            } else {
                ViewModule.AlertTextPasswordRepeatPassword.hide();
            }
        }

        if (ViewModule.TextEmailAddress.val().length == 0) {
            validationFailed = true;
            ViewModule.AlertTextEmailAddress.text('Email address is required!');
            ViewModule.AlertTextEmailAddress.show();
        } else {
            if (false == validateEmail(ViewModule.TextEmailAddress.val())) {
                validationFailed = true;
                ViewModule.AlertTextEmailAddress.text('The email address you entered is in an invalid format!');
                ViewModule.AlertTextEmailAddress.show();
            } else {
                ViewModule.AlertTextEmailAddress.hide();

                if (ViewModule.TextEmailAddress.val() !==
                    ViewModule.TextRepeatEmailAddress.val()) {
                    validationFailed = true;
                    ViewModule.AlertTextRepeatEmailAddress.show();
                } else {
                    ViewModule.AlertTextRepeatEmailAddress.hide();
                }
            }
        }

        if (ViewModule.TextMobilePhoneNumber.val().length == 0) {
            validationFailed = true;
            ViewModule.AlertTextMobilePhoneNumber.text('Mobile phone number is required!');
            ViewModule.AlertTextMobilePhoneNumber.show();
        } else {
            ViewModule.AlertTextMobilePhoneNumber.hide();

            if (ViewModule.TextMobilePhoneNumber.val() !==
                ViewModule.TextRepeatMobilePhoneNumber.val()) {
                validationFailed = true;
                ViewModule.AlertTextRepeatMobilePhoneNumber.show();
            } else {
                ViewModule.AlertTextRepeatMobilePhoneNumber.hide();
            }
        }

        var objectToSend = {};
        objectToSend.username = ViewModule.TextUsername.val();

        postAjaj('/ajaj/IsUsernameInUse', objectToSend, function(returnObject) {

            if (returnObject.outData.inuse == 0) {

                if (false == validationFailed) {

                    var objectToSend = {};
                    objectToSend.SecurityUser = {};

                    // security service
                    objectToSend.SecurityUser.SecurityUserID = -1;
                    objectToSend.SecurityUser.PasswordHash = ViewModule.TextPasswordPassword.val();
                    objectToSend.SecurityUser.IsEnabled = 1;
                    objectToSend.SecurityUser.Username = ViewModule.TextUsername.val();

                    // services store account
                    objectToSend.SecurityUser.EmailAddress = ViewModule.TextEmailAddress.val();
                    objectToSend.SecurityUser.LastName = ViewModule.TextLastName.val();
                    objectToSend.SecurityUser.FirstName = ViewModule.TextFirstName.val();
                    objectToSend.SecurityUser.MobilePhoneNumber = ViewModule.TextMobilePhoneNumber.val();

                    postAjaj('/ajaj/RegisterNewUser', objectToSend, function (returnObject) {
                        if (returnObject.result == true) {
                            ViewModule.AccountReadyModal.modal({
                                keyboard: false
                            });

                            setTimeout(function () {
                                ViewModule.AccountReadyModal.hide();
                                ViewModule.AccountReadyModal.removeData();
                                minimal.navigateToPage('login', true);
                            }, 3000);
                        }
                        else {
                            // this is bad, for some reason registration failed!
                            ViewModule.ParagraphLoginCreationStatus.text('Registration failed... please call Leopard Data at 806-305-0223 for support!');

                            ViewModule.AccountReadyModal.modal({
                                keyboard: false
                            });

                            setTimeout(function () {
                                ViewModule.AccountReadyModal.hide();
                                ViewModule.AccountReadyModal.removeData();
                            }, 3000);
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

ViewModule.Deinitialize = function() {
    var self = this;
};