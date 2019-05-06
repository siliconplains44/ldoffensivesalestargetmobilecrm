/**
 * Created by Allan on 5/19/2015.
 */

function ViewModule() { };

ViewModule.Title = "Username Retrieval";
ViewModule.minimal = null;

// page vars

// page controls

//ViewModule.LoginLink = null;
ViewModule.ButtonRetrieve = null;
ViewModule.LinkHome = $('#LinkHome');
ViewModule.TextEmailAddress = $('#TextEmailAddress');
ViewModule.ButtonRetrieve = $('#ButtonRetrieve');
ViewModule.AccountUsernameSentModal = $('#AccountUsernameSentModal');
ViewModule.ParagraphEmailStatus = $('#ParagraphEmailStatus');

ViewModule.Initialize = function(minimal) {
    var self = this;

    self.minimal = minimal;

    // load page control references

    // initialize initial control state

    // load up events

    ViewModule.LinkHome.click(function() {
        minimal.navigateToPage('home', true);
    });

    ViewModule.ButtonRetrieve.click(function(e) {

        e.preventDefault();

        var objectToSend = {};

        objectToSend.emailaddress = ViewModule.TextEmailAddress.val();

        postAjaj('/ajaj/RetrieveUsernameByEmailAddress', objectToSend, function (returnObject) {
            if (returnObject.result == true) {
                ViewModule.ParagraphEmailStatus.text('Your username was sent via email to you!');

                ViewModule.AccountUsernameSentModal.modal({
                    keyboard: false
                });

                setTimeout(function () {
                    ViewModule.AccountUsernameSentModal.removeData();
                    ViewModule.AccountUsernameSentModal.hide();
                }, 3000);
            }
            else {
                // this is bad, for some reason registration failed!
                ViewModule.ParagraphEmailStatus.text('Unable to send email with username!');

                ViewModule.AccountUsernameSentModal.modal({
                    keyboard: false
                });

                setTimeout(function () {
                    ViewModule.AccountUsernameSentModal.removeData();
                    ViewModule.AccountUsernameSentModal.hide();
                }, 3000);
            }
        });

    });

};

ViewModule.Deinitialize = function() {
    var self = this;
};
