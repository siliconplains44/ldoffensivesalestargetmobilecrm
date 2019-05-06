var businessObjectsService = angular.module('offensiveapp');

businessObjectsService.factory('businessobjectsservice',
    ['$http', 'utilityservice', 'applicationservice',
        function ($http, utilityService, applicationService) {

            var businessObjectsService = {};

            //app.post('/ajaj/AddSalesTarget', ajaj.AddSalesTarget);

            businessObjectsService.addSalesTarget = function (name, securityUserID, salesTargetStageID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.name = name;
                objectToSend.securityuserid = securityUserID;
                objectToSend.salestargetstageid = salesTargetStageID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddSalesTarget', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifySalesTarget', ajaj.ModifySalesTarget);

            businessObjectsService.modifySalesTarget = function (salesTargetID, name, securityUserID, salesTargetStageID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.name = name;
                objectToSend.securityuserid = securityUserID;
                objectToSend.salestargetstageid = salesTargetStageID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifySalesTarget', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteSalesTarget', ajaj.DeleteSalesTarget);

            businessObjectsService.deleteSalesTarget = function (salesTargetID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteSalesTarget', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveSalesTargetsWithFilter', ajaj.RetrieveSalesTargetsWithFilter);

            businessObjectsService.retrieveSalesTargetsWithFilter = function (salesTargetID, securityUserID, salesTargetStageID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.securityuserid = securityUserID;
                objectToSend.salestargetstageid = salesTargetStageID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveSalesTargetsWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ShareSalesTargetWithTeamMember', ajaj.ShareSalesTargetWithTeamMember);

            businessObjectsService.shareSalesTargetWithTeamMember = function (salesTargetID, securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.securityuserid = securityUserID;               

                var res = $http.post(utilityService.baseUrl + '/ajaj/ShareSalesTargetWithTeamMember', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/UnshareSalesTargetWithTeamMember', ajaj.UnshareSalesTargetWithTeamMember);

            businessObjectsService.unshareSalesTargetWithTeamMember = function (salesTargetID, securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/UnshareSalesTargetWithTeamMember', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/IsSalesTargetSharedWithUser', ajaj.IsSalesTargetSharedWithUser);

            businessObjectsService.isSalesTargetSharedWithUser = function (salesTargetID, securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/IsSalesTargetSharedWithUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveSalesTargetsSharedWithUser', ajaj.RetrieveSalesTargetsSharedWithUser);

            businessObjectsService.retrieveSalesTargetsSharedWithUser = function (securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();
                
                objectToSend.securityuserid = securityUserID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveSalesTargetsSharedWithUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveUsersWithSalesTargetShare', ajaj.RetrieveUsersWithSalesTargetShare);

            businessObjectsService.retrieveUsersWithSalesTargetShare = function (salesTargetID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveUsersWithSalesTargetShare', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddNote', ajaj.AddNote);

            businessObjectsService.addNote = function (content, attachedToObjectTypeID,
                                                              attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.content = content;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddNote', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyNote', ajaj.ModifyNote);

            businessObjectsService.modifyNote = function (noteID, content, attachedToObjectTypeID,
                                                              attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.noteid = noteID;
                objectToSend.content = content;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyNote', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteNote', ajaj.DeleteNote);

            businessObjectsService.deleteNote = function (noteID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.noteid = noteID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteNote', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveNotesWithFilter', ajaj.RetrieveNotesWithFilter);

            businessObjectsService.retrieveNotesWithFilter = function (noteID, attachedToObjectTypeID,
                                                                 attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.noteid = noteID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveNotesWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveActivityTypes', ajaj.RetrieveActivityTypes);

            businessObjectsService.retrieveActivityTypes = function (cb) {

                var objectToSend = utilityService.buildObjectToSend();

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveActivityTypes', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddActivity', ajaj.AddActivity);

            businessObjectsService.addActivity = function (securityUserID, campaignID, started, durationInHours, description,
                                                           attachedToObjectTypeID, attachedToObjectID, activityTypeID, activityTypeCustomName, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.campaignid = campaignID;
                objectToSend.started = started;
                objectToSend.durationinhours = durationInHours;
                objectToSend.description = description;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.activitytypeid = activityTypeID;
                objectToSend.activitytypecustomname = activityTypeCustomName;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddActivity', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyActivity', ajaj.ModifyActivity);

            businessObjectsService.modifyActivity = function (activityID, securityUserID, campaignID, started, durationInHours,
                                                           description, attachedToObjectTypeID, attachedToObjectID, activityTypeID, activityTypeCustomName, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.activityid = activityID;
                objectToSend.securityuserid = securityUserID;
                objectToSend.campaignid = campaignID;
                objectToSend.started = started;
                objectToSend.durationinhours = durationInHours;
                objectToSend.description = description;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.activitytypeid = activityTypeID;
                objectToSend.activitytypecustomname = activityTypeCustomName;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyActivity', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteActivity', ajaj.DeleteActivity);

            businessObjectsService.deleteActivity = function (activityID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.activityid = activityID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteActivity', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveActivitiesWithFilter', ajaj.RetrieveActivitiesWithFilter);

            businessObjectsService.retrieveActivitiesWithFilter = function (activityID, securityUserID, campaignID,
                                                              attachedToObjectTypeID, attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.activityid = activityID;
                objectToSend.securityuserid = securityUserID;
                objectToSend.campaignid = campaignID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveActivitiesWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddAddress', ajaj.AddAddress);

            businessObjectsService.addAddress = function (attachedToObjectTypeID, attachedToObjectID, name,
                line1, line2, city, state, zip, country, type, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.name = name;
                objectToSend.line1 = line1;
                objectToSend.line2 = line2;
                objectToSend.city = city;
                objectToSend.state = state;
                objectToSend.zip = zip;
                objectToSend.country = country;
                objectToSend.type = type;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddAddress', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyAddress', ajaj.ModifyAddress);

            businessObjectsService.modifyAddress = function (addressID, attachedToObjectTypeID, attachedToObjectID, name,
                                                          line1, line2, city, state, zip, country, type, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.addressid = addressID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.name = name;
                objectToSend.line1 = line1;
                objectToSend.line2 = line2;
                objectToSend.city = city;
                objectToSend.state = state;
                objectToSend.zip = zip;
                objectToSend.country = country;
                objectToSend.type = type;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyAddress', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteAddress', ajaj.DeleteAddress);

            businessObjectsService.deleteAddress = function (addressID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.addressid = addressID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteAddress', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveAddressesWithFilter', ajaj.RetrieveAddressesWithFilter);

            businessObjectsService.retrieveAddressesWithFilter = function (addressID, attachedToObjectTypeID, attachedToObjectID,
                                                                           cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.addressid = addressID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveAddressesWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddEmailAddress', ajaj.AddEmailAddress);

            businessObjectsService.addEmailAddress = function (type, address, attachedToObjectTypeID,
                                                               attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.type = type;
                objectToSend.address = address;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddEmailAddress', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyEmailAddress', ajaj.ModifyEmailAddress);

            businessObjectsService.modifyEmailAddress = function (emailAddressID, type, address, attachedToObjectTypeID,
                                                               attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.emailaddressid = emailAddressID;
                objectToSend.type = type;
                objectToSend.address = address;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyEmailAddress', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteEmailAddress', ajaj.DeleteEmailAddress);

            businessObjectsService.deleteEmailAddress = function (emailAddressID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.emailaddressid = emailAddressID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteEmailAddress', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveEmailAddressesWithFilter', ajaj.RetrieveEmailAddressesWithFilter);

            businessObjectsService.retrieveEmailAddressesWithFilter = function (emailAddressID, attachedToObjectTypeID,
                                                                  attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.emailaddressid = emailAddressID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveEmailAddressesWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddInstantMessengerAccount', ajaj.AddInstantMessengerAccount);

            businessObjectsService.addInstantMessengerAccount = function (type, handle, attachedToObjectTypeID,
                                                              attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.type = type;
                objectToSend.handle = handle;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddInstantMessengerAccount', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyInstantMessengerAccount', ajaj.ModifyInstantMessengerAccount);

            businessObjectsService.modifyInstantMessengerAccount = function (instantMessengerAccountID, type, handle, attachedToObjectTypeID,
                                                                          attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.instantmessageaccountid = instantMessengerAccountID;
                objectToSend.type = type;
                objectToSend.handle = handle;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyInstantMessengerAccount', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteInstantMessengerAccount', ajaj.DeleteInstantMessengerAccount);

            businessObjectsService.deleteInstantMessengerAccount = function (instantMessengerAccountID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.instantmessageaccountid = instantMessengerAccountID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteInstantMessengerAccount', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveInstantMessengerAccountsWithFilter', ajaj.RetrieveInstantMessengerAccountsWithFilter);

            businessObjectsService.retrieveInstantMessengerAccountsWithFilter = function (instantMessengerAccountID,
                                                                                          attachedToObjectTypeID,
                                                                             attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.instantmessageaccountid = instantMessengerAccountID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveInstantMessengerAccountsWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddPhoneNumber', ajaj.AddPhoneNumber);

            businessObjectsService.addPhoneNumber = function (type, number, attachedToObjectTypeID,
                                                              attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.type = type;
                objectToSend.number = number;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddPhoneNumber', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyPhoneNumber', ajaj.ModifyPhoneNumber);

            businessObjectsService.modifyPhoneNumber = function (phoneNumberID, type, number, attachedToObjectTypeID,
                                                              attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.phonenumberid = phoneNumberID;
                objectToSend.type = type;
                objectToSend.number = number;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyPhoneNumber', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeletePhoneNumber', ajaj.DeletePhoneNumber);

            businessObjectsService.deletePhoneNumber = function (phoneNumberID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.phonenumberid = phoneNumberID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeletePhoneNumber', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrievePhoneNumbersWithFilter', ajaj.RetrievePhoneNumbersWithFilter);

            businessObjectsService.retrievePhoneNumbersWithFilter = function (phoneNumberID, attachedToObjectTypeID,
                                                                 attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.phonenumberid = phoneNumberID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrievePhoneNumbersWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };


            //app.post('/ajaj/AddAttachment', ajaj.AddAttachment);

            businessObjectsService.addAttachment = function (name, description, filename, externalFileID, attachedToObjectTypeID,
                                                             attachedToObjectID, fileSizeInBytes,
                                                             uploadCompleted, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.name = name;
                objectToSend.description = description;
                objectToSend.filename = filename;
                objectToSend.externalfileid = externalFileID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.filesizeinbytes = fileSizeInBytes;
                objectToSend.uploadcompleted = uploadCompleted;                

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddAttachment', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyAttachment', ajaj.ModifyAttachment);

            businessObjectsService.modifyAttachment = function (attachmentID, externalFileID, attachedToObjectTypeID,
                                                             attachedToObjectID, fileSizeInBytes,
                                                             uploadCompleted, description, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.attachmentID = attachmentID;
                objectToSend.name = name;
                objectToSend.description = description;
                objectToSend.filename = filename;
                objectToSend.externalfileid = externalFileID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.filesizeinbytes = fileSizeInBytes;
                objectToSend.uploadcompleted = uploadCompleted;
                objectToSend.description = description;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyAttachment', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteAttachment', ajaj.DeleteAttachment);

            businessObjectsService.deleteAttachment = function (attachmentID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.attachmentid = attachmentID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteAttachment', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveAttachmentsWithFilter', ajaj.RetrieveAttachmentsWithFilter);

            businessObjectsService.retrieveAttachmentsWithFilter = function (attachmentID, attachedToObjectTypeID,
                                                                attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.attachmentID = attachmentID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveAttachmentsWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddCalendarEvent', ajaj.AddCalendarEvent);

            businessObjectsService.addCalendarEvent = function (title, startDateTime,
                                                                 endDateTime, where, description, color,
                                                                 securityUserID, attachedtoObjectTypeID,
                                                                 attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.title = title;
                objectToSend.startdatetime = startDateTime;
                objectToSend.enddatetime = endDateTime;
                objectToSend.where = where;
                objectToSend.description = description;
                objectToSend.color = color;
                objectToSend.securityuserid = securityUserID;
                objectToSend.attachedtoobjecttypeid = attachedtoObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddCalendarEvent', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyCalendarEvents', ajaj.ModifyCalendarEvents);

            businessObjectsService.modifyCalendarEvent = function (calendarEventID, title, startDateTime,
                                                                 endDateTime, where, description, color,
                                                                 securityUserID, attachedtoObjectTypeID,
                                                                 attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.calendareventid = calendarEventID;
                objectToSend.title = title;
                objectToSend.startdatetime = startDateTime;
                objectToSend.enddatetime = endDateTime;
                objectToSend.where = where;
                objectToSend.description = description;
                objectToSend.color = color;
                objectToSend.securityuserid = securityUserID;
                objectToSend.attachedtoobjecttypeid = attachedtoObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyCalendarEvent', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteCalendarEvent', ajaj.DeleteCalendarEvents);

            businessObjectsService.deleteCalendarEvent = function (calendarEventID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.calendareventid = calendarEventID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteCalendarEvent', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };


            //app.post('/ajaj/RetrieveCalendarEventsWithFilter', ajaj.RetrieveCalendarEventsWithFilter);

            businessObjectsService.retrieveCalendarEventsWithFilter = function (calendarEventID, securityUserID, from, to, attachedtoObjectTypeID,
                                                                    attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.calendarEventID = calendarEventID;
                objectToSend.securityuserid = securityUserID;
                objectToSend.from = from;
                objectToSend.to = to;
                objectToSend.attachedtoobjecttypeid = attachedtoObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveCalendarEventsWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };


            //app.post('/ajaj/AddExpenses', ajaj.AddExpenses);

            businessObjectsService.addExpense = function (name, description, securityUserID,
                                                              attachedToObjectTypeID, attachedToObjectID,
                                                              amount, isReimbursed, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.name = name;
                objectToSend.description = description;
                objectToSend.securityuserid = securityUserID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.amount = amount;
                objectToSend.isreimbursed = isReimbursed;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddExpenses', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyExpenses', ajaj.ModifyExpenses);

            businessObjectsService.modifyExpense = function (expenseID, name, description, securityUserID,
                                                           attachedToObjectTypeID, attachedToObjectID,
                                                           amount, isReimbursed, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.expenseid = expenseID;
                objectToSend.name = name;
                objectToSend.description = description;
                objectToSend.securityuserid = securityUserID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.amount = amount;
                objectToSend.isreimbursed = isReimbursed;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyExpenses', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteExpenses', ajaj.DeleteExpenses);

            businessObjectsService.deleteExpense = function (expenseID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.expenseid = expenseID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteExpenses', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveExpensesWithFilter', ajaj.RetrieveExpensesWithFilter);

            businessObjectsService.retrieveExpensesWithFilter = function (expenseID, securityUserID,
                                                              attachedToObjectTypeID, attachedToObjectID,
                                                              isReimbursed, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.expenseid = expenseID;
                objectToSend.securityuserid = securityUserID; 
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;
                objectToSend.isreimbursed = isReimbursed;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveExpensesWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddMileageLogEntry', ajaj.AddMileageLogEntry);

            businessObjectsService.addMileageLogEntry = function (occurred, description, securityUserID, startingMileage, endingMileage,
                                                                  isReimbursed, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.occurred = occurred;
                objectToSend.description = description;
                objectToSend.securityuserid = securityUserID;
                objectToSend.startingmileage = startingMileage;
                objectToSend.endingmileage = endingMileage;
                objectToSend.isreimbursed = isReimbursed;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddMileageLogEntry', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyMileageLogEntry', ajaj.ModifyMileageLogEntry);

            businessObjectsService.modifyMileageLogEntry = function (mileageLogEntryID, occurred, description, securityUserID, startingMileage, endingMileage,
                                                                  isReimbursed, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.mileagelogentryid = mileageLogEntryID;
                objectToSend.occurred = occurred;
                objectToSend.description = description;
                objectToSend.securityuserid = securityUserID;
                objectToSend.startingmileage = startingMileage;
                objectToSend.endingmileage = endingMileage;
                objectToSend.isreimbursed = isReimbursed;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyMileageLogEntry', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteMileageLogEntry', ajaj.DeleteMileageLogEntry);

            businessObjectsService.deleteMileageLogEntry = function (mileageLogEntryID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.mileagelogentryid = mileageLogEntryID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteMileageLogEntry', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveMileageLogEntriesWithFilter', ajaj.RetrieveMileageLogEntriesWithFilter);

            businessObjectsService.retrieveMileageLogEntriesWithFilter = function (mileageLogEntryID, securityUserID,
                                                                     isReimbursed, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.mileagelogentryid = mileageLogEntryID;
                objectToSend.securityuserid = securityUserID;
                objectToSend.isreimbursed = isReimbursed;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveMileageLogEntriesWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddIndividual', ajaj.AddIndividual);

            businessObjectsService.addIndividual = function (lastName, middleName, firstName, birthday,
                                                              attachedToObjectTypeID, attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.lastname = lastName;
                objectToSend.middlename = middleName;
                objectToSend.firstname = firstName;
                objectToSend.birthday = birthday;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddIndividual', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyIndividual', ajaj.ModifyIndividual);

            businessObjectsService.modifyIndividual = function (individualID, lastName, middleName, firstName, birthday,
                                                             attachedToObjectTypeID, attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.individualid = individualID;
                objectToSend.lastname = lastName;
                objectToSend.middlename = middleName;
                objectToSend.firstname = firstName;
                objectToSend.birthday = birthday;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyIndividual', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteIndividual', ajaj.DeleteIndividual);

            businessObjectsService.deleteIndividual = function (individualID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.individualid = individualID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteIndividual', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveIndividualsWithFilter', ajaj.RetrieveIndividualsWithFilter);

            businessObjectsService.retrieveIndividualsWithFilter = function (individualID,
                                                                attachedToObjectTypeID, attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.individualid = individualID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveIndividualsWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddURI', ajaj.AddURI);

            businessObjectsService.addUri = function (type, identifier, attachedToObjectTypeID, attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.type = type;
                objectToSend.identifier = identifier;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddURI', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyURI', ajaj.ModifyURI);

            businessObjectsService.modifyUri = function (UriID, type, identifier, attachedToObjectTypeID, attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.type = type;
                objectToSend.uriid = UriID;
                objectToSend.identifier = identifier;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyURI', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteURI', ajaj.DeleteURI);

            businessObjectsService.deleteUri = function (UriID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.uriid = UriID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteURI', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveURIsWithFilter', ajaj.RetrieveURIsWithFilter);

            businessObjectsService.retrieveURIsWithFilter = function (UriID, attachedToObjectTypeID, attachedToObjectID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.uriid = UriID;
                objectToSend.attachedtoobjecttypeid = attachedToObjectTypeID;
                objectToSend.attachedtoobjectid = attachedToObjectID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveURIsWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddDeal', ajaj.AddDeal);

            businessObjectsService.addDeal = function (salesTargetID, productOrService, closedDate, isEstimate, timeFrameTypeID, amount, notes, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.productorservice = productOrService;
                objectToSend.closeddate = closedDate;
                objectToSend.isestimate = isEstimate;
                objectToSend.timeframetypeid = timeFrameTypeID;
                objectToSend.amount = amount;
                objectToSend.notes = notes;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddDeal', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyDeal', ajaj.ModifyDeal);

            businessObjectsService.modifyDeal = function (dealID, salesTargetID, productOrService, closedDate, isEstimate, timeFrameTypeID, amount, notes, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.dealid = dealID;
                objectToSend.salestargetid = salesTargetID;
                objectToSend.productorservice = productOrService;
                objectToSend.closeddate = closedDate;
                objectToSend.isestimate = isEstimate;
                objectToSend.timeframetypeid = timeFrameTypeID;
                objectToSend.amount = amount;
                objectToSend.notes = notes;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyDeal', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteDeal', ajaj.DeleteDeal);

            businessObjectsService.deleteUri = function (dealID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.dealid = dealID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteDeal', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealsWithFilter', ajaj.RetrieveDealsWithFilter);

            businessObjectsService.retrieveDealsWithFilter = function (dealID, salesTargetID, isEstimate, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.dealid = dealID;
                objectToSend.salestargetid = salesTargetID;
                objectToSend.isestimate = isEstimate;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealsWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddQuote', ajaj.AddQuote);

            businessObjectsService.addQuote = function (salesTargetID, productOrService, sentDate, timeFrameTypeID, amount, notes, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.productorservice = productOrService;
                objectToSend.sentdate = sentDate;                
                objectToSend.timeframetypeid = timeFrameTypeID;
                objectToSend.amount = amount;
                objectToSend.notes = notes;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddQuote', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyQuote', ajaj.ModifyQuote);

            businessObjectsService.modifyQuote = function (quoteID, salesTargetID, productOrService, sentDate, timeFrameTypeID, amount, notes, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.quoteid = quoteID;
                objectToSend.salestargetid = salesTargetID;
                objectToSend.productorservice = productOrService;
                objectToSend.senddate = sentDate;                
                objectToSend.timeframetypeid = timeFrameTypeID;
                objectToSend.amount = amount;
                objectToSend.notes = notes;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyQuote', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteQuote', ajaj.DeleteQuote);

            businessObjectsService.deleteQuote = function (quoteID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.quoteid = quoteID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteQuote', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };


            //app.post('/ajaj/RetrieveQuotesWithFilter', ajaj.RetrieveQuotesWithFilter);

            businessObjectsService.retrieveQuotesWithFilter = function (quoteID, salesTargetID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.quoteid = quoteID;
                objectToSend.salestargetid = salesTargetID;               

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveQuotesWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/AddRevenueEntry', ajaj.AddRevenueEntry);

            businessObjectsService.addRevenueEntry = function (salesTargetID, amount, notes, periodyear, periodmonth, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.amount = amount;
                objectToSend.notes = notes;
                objectToSend.periodyear = periodyear;
                objectToSend.periodmonth = periodmonth;                

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddRevenueEntry', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/ModifyRevenueEntry', ajaj.ModifyRevenueEntry);

            businessObjectsService.modifyRevenueEntry = function (revenueEntryID, salesTargetID, amount, notes, periodyear, periodmonth, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.revenueentryid = revenueEntryID;
                objectToSend.salestargetid = salesTargetID;
                objectToSend.amount = amount;
                objectToSend.notes = notes;
                objectToSend.periodyear = periodyear;
                objectToSend.periodmonth = periodmonth;

                var res = $http.post(utilityService.baseUrl + '/ajaj/ModifyRevenueEntry', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/DeleteRevenueEntry', ajaj.DeleteRevenueEntry);

            businessObjectsService.deleteRevenueEntry = function (revenueEntryID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.revenueentryid = revenueEntryID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DeleteRevenueEntry', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveRevenueEntrysWithFilter', ajaj.RetrieveRevenueEntrysWithFilter);

            businessObjectsService.retrieveRevenueEntrysWithFilter = function (revenueEntryID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.revenueentryid = revenueEntryID;                

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveRevenueEntrysWithFilter', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.retrieveTimeFrameTypes = function (cb) {

                var objectToSend = utilityService.buildObjectToSend();

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTimeFrameTypes', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.retrieveExpensesNotReimbursedByTeamID = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveExpensesNotReimbursedByTeamID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.retrieveExpensesReimbursedByTeamID = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveExpensesReimbursedByTeamID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.setExpenseReimbursed = function (expenseID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.expenseid = expenseID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/SetExpenseReimbursed', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.setExpenseUnreimbursed = function (expenseID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.expenseid = expenseID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/SetExpenseUnreimbursed', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.retrieveMileageLogEntriesNotReimbursedByTeamID = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveMileageLogEntriesNotReimbursedByTeamID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.retrieveMileageLogEntriesReimbursedByTeamID = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveMileageLogEntriesReimbursedByTeamID', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.setMileageLogEntryReimbursed = function (mileageLogEntryID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.mileagelogentryid = mileageLogEntryID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/SetMileageLogEntryReimbursed', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.setMileageLogEntryUnreimbursed = function (mileageLogEntryID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.mileagelogentryid = mileageLogEntryID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/SetMileageLogEntryUnreimbursed', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.retrieveTeamSalesTargetsWithRevenueAmounts = function (teamID, periodYear, periodMonth, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID;
                objectToSend.periodyear = periodYear;
                objectToSend.periodmonth = periodMonth;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTeamSalesTargetsWithRevenueAmounts', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            

            businessObjectsService.updateSalesTargetRevenueAmountForPeriodYearAndMonth = function (salesTargetID, periodYear, periodMonth, amount, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.periodyear = periodYear;
                objectToSend.periodmonth = periodMonth;
                objectToSend.amount = amount;

                var res = $http.post(utilityService.baseUrl + '/ajaj/UpdateSalesTargetRevenueAmountForPeriodYearAndMonth', JSON.stringify(objectToSend));
                res.success(function(data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " +JSON.stringify({ data : data }));
                    cb(data);
                });

            };

            businessObjectsService.addSalesTargetStageChangeLogEntries = function (salesTargetID, salesTargetStageFromID, salesTargetStageToID,
                changedBySecurityUserID, campaignID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.salestargetid = salesTargetID;
                objectToSend.salestargetstagefromid = salesTargetStageFromID;
                objectToSend.salestargetstagetoid = salesTargetStageToID;
                objectToSend.changedbysecurityuserid = changedBySecurityUserID;
                objectToSend.campaignid = campaignID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/AddSalesTargetStageChangeLogEntries', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalAccountsCountForUser', ajaj.RetrieveTotalAccountsCountForUser);

            businessObjectsService.retrieveTotalAccountsCountForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalAccountsCountForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalAccountsByMonthForUser', ajaj.RetrieveTotalAccountsByMonthForUser);

            businessObjectsService.retrieveTotalAccountsByMonthForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalAccountsByMonthForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalNewSalesTargetsForMonthForUser', ajaj.RetrieveTotalNewSalesTargetsForMonthForUser);

            businessObjectsService.retrieveTotalNewSalesTargetsForMonthForUser = function (securityUserID, teamID, month, year, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.month = month;
                objectToSend.year = year;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalNewSalesTargetsForMonthForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser', ajaj.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser);

            businessObjectsService.retrieveTotalSalesTargetsConvertedToAccountsForMonthForUser = function (securityUserID, teamID, month, year, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.month = month;
                objectToSend.year = year;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForMonthForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalNewSalesTargetsForPreviousMonthsForUser', ajaj.RetrieveTotalNewSalesTargetsForPreviousMonthsForUser);

            businessObjectsService.retrieveTotalNewSalesTargetsForPreviousMonthsForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalNewSalesTargetsForPreviousMonthsForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser', ajaj.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser);

            businessObjectsService.retrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveQuotesSentForMonthByUser', ajaj.RetrieveQuotesSentForMonthByUser);

            businessObjectsService.retrieveQuotesSentForMonthByUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveQuotesSentForMonthByUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveQuotesSentForPreviousMonthsByUser', ajaj.RetrieveQuotesSentForPreviousMonthsByUser);

            businessObjectsService.retrieveQuotesSentForPreviousMonthsByUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveQuotesSentForPreviousMonthsByUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealEstimateCountForMonthForUser', ajaj.RetrieveDealEstimateCountForMonthForUser);

            businessObjectsService.retrieveDealEstimateCountForMonthForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealEstimateCountForMonthForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealEstimateCountForPreviousMonthsForUser', ajaj.RetrieveDealEstimateCountForPreviousMonthsForUser);

            businessObjectsService.retrieveDealEstimateCountForPreviousMonthsForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealEstimateCountForPreviousMonthsForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealCountForMonthForUser', ajaj.RetrieveDealCountForMonthForUser);

            businessObjectsService.retrieveDealCountForMonthForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealCountForMonthForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealCountForPreviousMonthsForUser', ajaj.RetrieveDealCountForPreviousMonthsForUser);

            businessObjectsService.retrieveDealCountForPreviousMonthsForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealCountForPreviousMonthsForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealValueForMonthForUser', ajaj.RetrieveDealValueForMonthForUser);

            businessObjectsService.retrieveDealValueForMonthForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealValueForMonthForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealValueForPreviousMonthsForUser', ajaj.RetrieveDealValueForPreviousMonthsForUser);

            businessObjectsService.retrieveDealValueForPreviousMonthsForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealValueForPreviousMonthsForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveRevenueForThisMonthForUser', ajaj.RetrieveRevenueForThisMonthForUser);

            businessObjectsService.retrieveRevenueForThisMonthForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveRevenueForThisMonthForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveRevenueForPreviousMonthsForUser', ajaj.RetrieveRevenueForPreviousMonthsForUser);

            businessObjectsService.retrieveRevenueForPreviousMonthsForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveRevenueForPreviousMonthsForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrievePipelineTotalsForMonthForUser', ajaj.RetrievePipelineTotalsForMonthForUser);

            businessObjectsService.retrievePipelineTotalsForMonthForUser = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrievePipelineTotalsForMonthForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveSalesTargetsAllocatedAcrossPipeline', ajaj.RetrieveSalesTargetsAllocatedAcrossPipeline);

            businessObjectsService.retrieveSalesTargetsAllocatedAcrossPipeline = function (securityUserID, teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveSalesTargetsAllocatedAcrossPipeline', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveActivityDataForUser', ajaj.RetrieveActivityDataForUser);

            businessObjectsService.retrieveActivityDataForUser = function (securityUserID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;               

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveActivityDataForUser', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalAccountsCountForTeam', ajaj.RetrieveTotalAccountsCountForTeam);

            businessObjectsService.retrieveTotalAccountsCountForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalAccountsCountForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalAccountsByMonthForTeam', ajaj.RetrieveTotalAccountsByMonthForTeam);

            businessObjectsService.retrieveTotalAccountsByMonthForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalAccountsByMonthForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalNewSalesTargetsForMonthForTeam', ajaj.RetrieveTotalNewSalesTargetsForMonthForTeam);

            businessObjectsService.retrieveTotalNewSalesTargetsForMonthForTeam = function (teamID, month, year, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.month = month;
                objectToSend.year = year;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalNewSalesTargetsForMonthForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam', ajaj.RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam);

            businessObjectsService.retrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam = function (teamID, month, year, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.month = month;
                objectToSend.year = year;
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForMonthForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam', ajaj.RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam);

            businessObjectsService.retrieveTotalNewSalesTargetsForPreviousMonthsForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalNewSalesTargetsForPreviousMonthsForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam', ajaj.RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam);

            businessObjectsService.retrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveTotalSalesTargetsConvertedToAccountsForPreviousMonthsForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveQuotesSentForMonthByTeam', ajaj.RetrieveQuotesSentForMonthByTeam);

            businessObjectsService.retrieveQuotesSentForMonthByTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveQuotesSentForMonthByTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveQuotesSentForPreviousMonthsByTeam', ajaj.RetrieveQuotesSentForPreviousMonthsByTeam);

            businessObjectsService.retrieveQuotesSentForPreviousMonthsByTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveQuotesSentForPreviousMonthsByTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealEstimateCountForMonthForTeam', ajaj.RetrieveDealEstimateCountForMonthForTeam);

            businessObjectsService.retrieveDealEstimateCountForMonthForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealEstimateCountForMonthForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealEstimateCountForPreviousMonthsForTeam', ajaj.RetrieveDealEstimateCountForPreviousMonthsForTeam);

            businessObjectsService.retrieveDealEstimateCountForPreviousMonthsForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealEstimateCountForPreviousMonthsForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealCountForMonthForTeam', ajaj.RetrieveDealCountForMonthForTeam);

            businessObjectsService.retrieveDealCountForMonthForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealCountForMonthForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealCountForPreviousMonthsForTeam', ajaj.RetrieveDealCountForPreviousMonthsForTeam);

            businessObjectsService.retrieveDealCountForPreviousMonthsForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealCountForPreviousMonthsForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealValueForMonthForTeam', ajaj.RetrieveDealValueForMonthForTeam);

            businessObjectsService.retrieveDealValueForMonthForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealValueForMonthForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveDealValueForPreviousMonthsForTeam', ajaj.RetrieveDealValueForPreviousMonthsForTeam);

            businessObjectsService.retrieveDealValueForPreviousMonthsForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveDealValueForPreviousMonthsForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveRevenueForThisMonthForTeam', ajaj.RetrieveRevenueForThisMonthForTeam);

            businessObjectsService.retrieveRevenueForThisMonthForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveRevenueForThisMonthForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveRevenueForPreviousMonthsForTeam', ajaj.RetrieveRevenueForPreviousMonthsForTeam);

            businessObjectsService.retrieveRevenueForPreviousMonthsForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveRevenueForPreviousMonthsForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrievePipelineTotalsForMonthForTeam', ajaj.RetrievePipelineTotalsForMonthForTeam);

            businessObjectsService.retrievePipelineTotalsForMonthForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrievePipelineTotalsForMonthForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveSalesTargetsAllocatedAcrossPipelineForTeam', ajaj.RetrieveSalesTargetsAllocatedAcrossPipelineForTeam);

            businessObjectsService.retrieveSalesTargetsAllocatedAcrossPipelineForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                
                objectToSend.teamid = teamID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveSalesTargetsAllocatedAcrossPipelineForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            //app.post('/ajaj/RetrieveActivityDataForTeam', ajaj.RetrieveActivityDataForTeam);

            businessObjectsService.retrieveActivityDataForTeam = function (teamID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.teamid = teamID

                var res = $http.post(utilityService.baseUrl + '/ajaj/RetrieveActivityDataForTeam', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.copyFile = function (fileID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.sourcefileid = fileID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/CopyFile', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.startFileDownload = function (fileID, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.fileid = fileID;

                var res = $http.post(utilityService.baseUrl + '/ajaj/StartFileDownload', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            businessObjectsService.downloadFilePart = function (securityUserID, fileID, partIndex, cb) {

                var objectToSend = utilityService.buildObjectToSend();

                objectToSend.securityuserid = securityUserID;
                objectToSend.fileid = fileID;
                objectToSend.partindex = partIndex;

                var res = $http.post(utilityService.baseUrl + '/ajaj/DownloadFilePart', JSON.stringify(objectToSend));
                res.success(function (data, status, headers, config) {
                    cb(data);
                });
                res.error(function (data, status, headers, config) {
                    console.log("failure message: " + JSON.stringify({ data: data }));
                    cb(data);
                });

            };

            return businessObjectsService;

        }]);
