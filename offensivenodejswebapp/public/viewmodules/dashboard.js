/**
 * Created by Allan on 1/27/2015.
 */

function ViewModule() { };

ViewModule.Title = "Leopard Data Services Account Dashboard";
ViewModule.minimal = null;

// page vars

// page controls


ViewModule.LinkLogout = $('#LinkLogout');

ViewModule.Initialize = function(minimal) {
    var self = this;

    self.minimal = minimal;

    // load page control references

    // initialize initial control state

    // load up events

    ViewModule.LinkLogout.click(function(event) {
        ViewModule.minimal.navigateToPage('loggedout', true);
        application.LogOut();
    });

    var objectToSend = {};

    objectToSend.securityuserid = application.loggedInUserID;

};

ViewModule.Deinitialize = function() {
    var self = this;
};