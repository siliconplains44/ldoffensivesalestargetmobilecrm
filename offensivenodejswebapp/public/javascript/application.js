/**
 * Created by Allan on 1/26/2015.
 */

application = {};

application.loggedInUserID = null;
application.Username = null;

application.initialize = function(bodyElement) {

    minimal.bodyElement = bodyElement;

    minimal.registerRootViewModulesPath('viewmodules');

    minimal.registerViewModules(
        [
            { id: "home", title: "Home", path: "home", requiressession: false },
            { id: "login", title: "Login", path: "login", requiressession: false },
            { id: "dashboard", title: "Dashboard", path: "dashboard", requiressession: true },
            { id: "loggedout", title: "LoggedOut", path: "loggedout", requiressession: false },
            { id: "createldlogin", title: "Create Leoapard Data Login", path: "createldlogin", requiressession: false },
            { id: "passwordretrieval", title: "Password Retrieval", path: "passwordretrieval", requiressession: false },
            { id: "usernameretrieval", title: "Username Retrieval", path: "usernameretrieval", requiressession: false },
            { id: "modifyldlogin", title: "Modify Leopard Data Login", path: "modifyldlogin", requiressession: true }

        ]
    );

    minimal.navigateToPage("home", true);

    return application.minimal;
};

application.LogOut = function() {
    application.loggedInUserID = -1;
};

window.onbeforeunload = function() {
    application.LogOut();
}

