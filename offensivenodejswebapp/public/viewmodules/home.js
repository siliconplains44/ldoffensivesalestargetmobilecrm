/**
 * Created by Allan on 1/27/2015.
 */

function ViewModule() { };

ViewModule.Title = "Leopard Data Services Store Home";

ViewModule.minimal = null;

// page vars

// page controls

ViewModule.AnchorLogin = $('#AnchorLogin');
ViewModule.AnchorCreateAccount = $('#AnchorCreateAccount');
ViewModule.AnchorCreateAccountTop = $('#AnchorCreateAccountTop');
ViewModule.AnchorForgotPassword = $('#AnchorForgotPassword');
ViewModule.AnchorForgotUsername = $('#AnchorForgotUsername');

ViewModule.Initialize = function(minimal) {
    var self = this;

    self.minimal = minimal;

    // load page control references

    // initialize initial control state

    // load up events

    self.AnchorLogin.click(function(event) {
        self.minimal.navigateToPage('login');
    });

    self.AnchorCreateAccount.click(function(event) {
        self.minimal.navigateToPage('createldlogin', true);
    });

    self.AnchorCreateAccountTop.click(function(event) {
        self.minimal.navigateToPage('createldlogin', true);
    });

    self.AnchorForgotPassword.click(function(event) {
        self.minimal.navigateToPage('passwordretrieval', true);
    });

    self.AnchorForgotUsername.click(function(event) {
        self.minimal.navigateToPage('usernameretrieval', true);
    });

    self.AnchorForgotPassword.click(function(event) {
        self.minimal.navigateToPage('passwordretrieval', true);
    });

};

ViewModule.Deinitialize = function() {
    var self = this;
};




