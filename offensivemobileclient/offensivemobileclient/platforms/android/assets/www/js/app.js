/*window.onerror = function (errorMsg, url, lineNumber) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
}*/

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r; i[r]=i[r]||function() {
        (i[r].q = i[r].q || []).push(arguments);             
    },i[r].l=1*new Date(); a=s.createElement(o),
    m=s.getElementsByTagName(o)[0]; a.async=1; a.src=g; 
    m.parentNode.insertBefore(a, m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-43426391-6', 'auto');


angular.module('offensiveapp', ['ionic'])

.run(function ($ionicPlatform, $rootScope, $window, $location) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
        });
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log('$stateChangeError - fired when an error occurs during transition.');
            console.log(arguments);
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
            
                if (!$window.ga)
                    return;
 
                $window.ga('send', 'pageview', { page: $location.path() });
           
        });
        // $rootScope.$on('$viewContentLoading',function(event, viewConfig){
        //   // runs on individual scopes, so putting it in "run" doesn't work.
        //   console.log('$viewContentLoading - view begins loading - dom not rendered',viewConfig);
        // });
        $rootScope.$on('$viewContentLoaded', function (event) {
            console.log('$viewContentLoaded - fired after dom rendered', event);
        });
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
            console.log(unfoundState, fromState, fromParams);
        });
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.views.forwardCache(true);


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        .state('login', {
            cache: false,
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'logincontroller'
        })

        .state('handle', {
            cache: false,
            url: '/handle',
            templateUrl: 'templates/handle.html',
            controller: 'handlecontroller'
        })

        .state('postloginactionchoices', {
            cache: false,
            url: '/postloginactionchoices',
            templateUrl: 'templates/postloginactionchoices.html',
            controller: 'postloginactionchoicescontroller'
        })

        .state('joinateam', {
            cache: false,
            url: '/joinateam',
            templateUrl: 'templates/joinateam.html',
            controller: 'joinateamcontroller'
        })

        .state('createateam', {
            cache: false,
            url: '/createateam',
            templateUrl: 'templates/createateam.html',
            controller: 'createateamcontroller'
        })

    // setup an abstract state for the tabs directive
      .state('tab', {
          cache: false,
          url: "/tab",
          abstract: true,
          templateUrl: "templates/tabs.html",
          controller: "tabcontroller"
      })

    // Each tab has its own nav history stack:

    .state('tab.salestargets', {
        cache: false,
        url: '/salestargets',
        views: {
            'tab-salestargets': {
                templateUrl: 'templates/tab-salestargets.html'
            }
        }
    })

  .state('tab.thesalestargets', {
      cache: false,
      url: '/thesalestargets/:id',
      views: {
          'tab-salestargets': {
              templateUrl: 'templates/salestargets.html',
              controller: 'salestargetscontroller'
          }
      }
  })

        .state('tab.addsalestarget', {
            cache: false,
            url: '/addsalestarget',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-salestarget.html',
                    controller: 'addsalestargetcontroller'
                }
            }
        })


        .state('tab.editsalestarget', {
            cache: false,
            url: '/editsalestarget/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-salestarget.html',
                    controller: 'editsalestargetcontroller'
                }
            }
        })

        .state('tab.salestargetsharing', {
            cache: false,
            url: '/salestargetsharing/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/salestargetsharing.html',
                    controller: 'salestargetsharingcontroller'
                }
            }
        })

        .state('tab.salestargetindividuals', {
            cache: false,
            url: '/salestargetindividuals/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/salestargetindividuals.html',
                    controller: 'salestargetindividualscontroller'
                }
            }
        })

        .state('tab.addindividual', {
            cache: false,
            url: '/addindividual',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-individual.html',
                    controller: 'addindividualcontroller'
                }
            }
        })

        .state('tab.editindividual', {
            cache: false,
            url: '/editindividual/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-individual.html',
                    controller: 'editindividualcontroller'
                }
            }
        })

         .state('tab.notes', {
             cache: false,
             url: '/notes',
             params: { params: null },
             views: {
                 'tab-salestargets': {
                     templateUrl: 'templates/notes.html',
                     controller: 'notescontroller'
                 }
             }
         })

        .state('tab.addnote', {
            cache: false,
            url: '/addnote',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-note.html',
                    controller: 'addnotecontroller'
                }
            }
        })

        .state('tab.editnote', {
            cache: false,
            url: '/editnote/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-note.html',
                    controller: 'editnotecontroller'
                }
            }
        })

        .state('tab.activities', {
            cache: false,
            url: '/activities',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/activities.html',
                    controller: 'activitiescontroller'
                }
            }
        })

        .state('tab.addactivity', {
            cache: false,
            url: '/addactivity',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-activity.html',
                    controller: 'addactivitycontroller'
                }
            }
        })

        .state('tab.editactivity', {
            cache: false,
            url: '/editactivity/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-activity.html',
                    controller: 'editactivitycontroller'
                }
            }
        })

        .state('tab.quotes', {
            cache: false,
            url: '/quotes',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/quotes.html',
                    controller: 'quotescontroller'
                }
            }
        })

        .state('tab.addquote', {
            cache: false,
            url: '/addquote',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-quote.html',
                    controller: 'addquotecontroller'
                }
            }
        })

        .state('tab.editquote', {
            cache: false,
            url: '/editquote/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-quote.html',
                    controller: 'editquotecontroller'
                }
            }
        })

        .state('tab.deals', {
            cache: false,
            url: '/deals',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/deals.html',
                    controller: 'dealscontroller'
                }
            }
        })

        .state('tab.adddeal', {
            cache: false,
            url: '/adddeal',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-deal.html',
                    controller: 'adddealcontroller'
                }
            }
        })

        .state('tab.editdeal', {
            cache: false,
            url: '/editdeal/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-deal.html',
                    controller: 'editdealcontroller'
                }
            }
        })

        .state('tab.addresses', {
            cache: false,
            url: '/addresses',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/addresses.html',
                    controller: 'addressescontroller'
                }
            }
        })

        .state('tab.addaddress', {
            cache: false,
            url: '/addaddress',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-address.html',
                    controller: 'addaddresscontroller'
                }
            }
        })

        .state('tab.editaddress', {
            cache: false,
            url: '/editaddress/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-address.html',
                    controller: 'editaddresscontroller'
                }
            }
        })

        .state('tab.phonenumbers', {
            cache: false,
            url: '/phonenumbers',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/phonenumbers.html',
                    controller: 'phonenumberscontroller'
                }
            }
        })

        .state('tab.addphonenumber', {
            cache: false,
            url: '/addphonenumber',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-phonenumber.html',
                    controller: 'addphonenumbercontroller'
                }
            }
        })

        .state('tab.editphonenumber', {
            cache: false,
            url: '/editphonenumber/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-phonenumber.html',
                    controller: 'editphonenumbercontroller'
                }
            }
        })

        .state('tab.emailaddresses', {
            cache: false,
            url: '/emailaddresses',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/emailaddresses.html',
                    controller: 'emailaddressescontroller'
                }
            }
        })

        .state('tab.addemailaddress', {
            cache: false,
            url: '/addemailaddress',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-emailaddress.html',
                    controller: 'addemailaddresscontroller'
                }
            }
        })

        .state('tab.editemailaddress', {
            cache: false,
            url: '/editemailaddress/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-emailaddress.html',
                    controller: 'editemailaddresscontroller'
                }
            }
        })

        .state('tab.uris', {
            cache: false,
            url: '/uris',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/uris.html',
                    controller: 'uriscontroller'
                }
            }
        })

        .state('tab.adduri', {
            cache: false,
            url: '/adduri',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-uri.html',
                    controller: 'adduricontroller'
                }
            }
        })

        .state('tab.edituri', {
            cache: false,
            url: '/edituri/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-uri.html',
                    controller: 'edituricontroller'
                }
            }
        })

        .state('tab.instantmessengeraccounts', {
            cache: false,
            url: '/instantmessengeraccounts',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/instantmessengeraccounts.html',
                    controller: 'instantmessengeraccountscontroller'
                }
            }
        })

        .state('tab.addinstantmessengeraccount', {
            cache: false,
            url: '/addinstantmessengeraccount',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-instantmessengeraccount.html',
                    controller: 'addinstantmessengeraccountcontroller'
                }
            }
        })

        .state('tab.editinstantmessengeraccount', {
            cache: false,
            url: '/editinstantmessengeraccount/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-instantmessengeraccount.html',
                    controller: 'editinstantmessengeraccountcontroller'
                }
            }
        })

        .state('tab.attachments', {
            cache: false,
            url: '/attachments',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/attachments.html',
                    controller: 'attachmentscontroller'
                }
            }
        })

        .state('tab.addattachment', {
            cache: false,
            url: '/addattachment',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/add-attachment.html',
                    controller: 'addattachmentcontroller'
                }
            }
        })

        .state('tab.editattachment', {
            cache: false,
            url: '/editattachment/:id',
            params: { params: null },
            views: {
                'tab-salestargets': {
                    templateUrl: 'templates/edit-attachment.html',
                    controller: 'editattachmentcontroller'
                }
            }
        })


    .state('tab.activity', {
        cache: false,
        url: '/activity',
        views: {
            'tab-activity': {
                templateUrl: 'templates/tab-activity.html'
            }
        }
    })

        .state('tab.masteractivities', {
            cache: false,
            url: '/masteractivities',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/masteractivities.html',
                    controller: 'masteractivitiescontroller'
                }
            }
        })

        .state('tab.addmasteractivity', {
            cache: false,
            url: '/addmasteractivity',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/add-masteractivity.html',
                    controller: 'addmasteractivitycontroller'
                }
            }
        })

        .state('tab.editmasteractivity', {
            cache: false,
            url: '/editmasteractivity/:id',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/edit-masteractivity.html',
                    controller: 'editmasteractivitycontroller'
                }
            }
        })

        .state('tab.calendarevents', {
            cache: false,
            url: '/calendarevents',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/calendarevents.html',
                    controller: 'calendareventscontroller'
                }
            }
        })

        .state('tab.addcalendarevent', {
            cache: false,
            url: '/addcalendarevent',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/add-calendarevent.html',
                    controller: 'addcalendareventcontroller'
                }
            }
        })

        .state('tab.editcalendarevent', {
            cache: false,
            url: '/editcalendarevent/:id',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/edit-calendarevent.html',
                    controller: 'editcalendareventcontroller'
                }
            }
        })

        .state('tab.mileagelogentries', {
            cache: false,
            url: '/mileagelogentries',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/mileagelogentries.html',
                    controller: 'mileagelogentriescontroller'
                }
            }
        })

        .state('tab.addmileagelogentry', {
            cache: false,
            url: '/addmileagelogentry',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/add-mileagelogentry.html',
                    controller: 'addmileagelogentrycontroller'
                }
            }
        })

        .state('tab.editmileagelogentry', {
            cache: false,
            url: '/editmileagelogentry/:id',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/edit-mileagelogentry.html',
                    controller: 'editmileagelogentrycontroller'
                }
            }
        })

        .state('tab.expenses', {
            cache: false,
            url: '/expenses',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/expenses.html',
                    controller: 'expensescontroller'
                }
            }
        })

        .state('tab.addexpense', {
            cache: false,
            url: '/addexpense',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/add-expense.html',
                    controller: 'addexpensecontroller'
                }
            }
        })

        .state('tab.editexpense', {
            cache: false,
            url: '/editexpense/:id',
            params: { params: null },
            views: {
                'tab-activity': {
                    templateUrl: 'templates/edit-expense.html',
                    controller: 'editexpensecontroller'
                }
            }
        })


        .state('tab.reports', {
            cache: false,
            url: '/reports',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/tab-reports.html',
                    controller: 'tabreportscontroller'
                }
            }
        })

        .state('tab.myperformance', {
            cache: false,
            url: '/myperformance',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/report-myperformance.html',
                    controller: 'reportmyperformancecontroller'
                }
            }
        })

        .state('tab.mypipeline', {
            cache: false,
            url: '/mypipeline',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/report-mypipeline.html',
                    controller: 'reportmypipelinecontroller'
                }
            }
        })

        .state('tab.myactivity', {
            cache: false,
            url: '/myactivity',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/report-myactivity.html',
                    controller: 'reportmyactivitycontroller'
                }
            }
        })

        .state('tab.myexpenses', {
            cache: false,
            url: '/myexpenses',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/report-myexpenses.html',
                    controller: 'reportmyexpensescontroller'
                }
            }
        })

        .state('tab.mymileage', {
            cache: false,
            url: '/mymileage',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/report-mymileage.html',
                    controller: 'reportmymileagecontroller'
                }
            }
        })

        .state('tab.teamperformance', {
            cache: false,
            url: '/teamperformance',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/report-teamperformance.html',
                    controller: 'reportteamperformancecontroller'
                }
            }
        })

        .state('tab.teampipeline', {
            cache: false,
            url: '/teampipeline',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/report-teampipeline.html',
                    controller: 'reportteampipelinecontroller'
                }
            }
        })

        .state('tab.teamactivity', {
            cache: false,
            url: '/teamactivity',
            views: {
                'tab-reports': {
                    templateUrl: 'templates/report-teamactivity.html',
                    controller: 'reportteamactivitycontroller'
                }
            }
        })

        .state('tab.lead', {
            cache: false,
            url: '/lead',
            views: {
                'tab-lead': {
                    templateUrl: 'templates/tab-lead.html'
                }
            }
        })

        .state('tab.manageteamexpenses', {
            cache: false,
            url: '/manageteamexpenses',
            views: {
                'tab-lead': {
                    templateUrl: 'templates/manageteamexpenses.html',
                    controller: 'manageteamexpensescontroller'
                }
            }
        })

        .state('tab.manageteammileage', {
            cache: false,
            url: '/manageteammileage',
            views: {
                'tab-lead': {
                    templateUrl: 'templates/manageteammileage.html',
                    controller: 'manageteammileagecontroller'
                }
            }
        })

        .state('tab.manageteamrevenue', {
            cache: false,
            url: '/manageteamrevenue',
            views: {
                'tab-lead': {
                    templateUrl: 'templates/manageteamrevenue.html',
                    controller: 'manageteamrevenuecontroller'
                }
            }
        })

        .state('tab.setup', {
            cache: false,
            url: '/setup',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/tab-setup.html',
                    controller: 'tabsetupcontroller'
                }
            }
        })

        .state('tab.teamjoinrequests', {
            cache: false,
            url: '/teamjoinrequests',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/teamjoinrequests.html',
                    controller: 'teamjoinrequestscontroller'
                }
            }
        })

        .state('tab.currentteam', {
            cache: false,
            url: '/currentteam',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/currentteam.html',
                    controller: 'currentteamcontroller'
                }
            }
        })

        .state('tab.teams', {
            cache: false,
            url: '/teams',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/teams.html',
                    controller: 'teamscontroller'
                }
            }
        })

        .state('tab.addteam', {
            cache: false,
            url: '/addteam',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/add-team.html',
                    controller: 'addteamcontroller'
                }
            }
        })

        .state('tab.teammembers', {
            cache: false,
            url: '/teammembers/:id',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/teammembers.html',
                    controller: 'teammemberscontroller'
                }
            }
        })

        .state('tab.editteam', {
            cache: false,
            url: '/editteam/:id',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/edit-team.html',
                    controller: 'editteamcontroller'
                }
            }
        })

        .state('tab.currentcampaign', {
            cache: false,
            url: '/currentcampaign',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/currentcampaign.html',
                    controller: 'currentcampaigncontroller'
                }
            }
        })

        .state('tab.campaigns', {
            cache: false,
            url: '/campaigns',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/campaigns.html',
                    controller: 'campaignscontroller'
                }
            }
        })

        .state('tab.addcampaign', {
            cache: false,
            url: '/addcampaign',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/add-campaign.html',
                    controller: 'addcampaigncontroller'
                }
            }
        })

        .state('tab.editcampaign', {
            cache: false,
            url: '/editcampaign/:id',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/edit-campaign.html',
                    controller: 'editcampaigncontroller'
                }
            }
        })

        .state('tab.organization', {
            cache: false,
            url: '/organization',
            views: {
                'tab-setup': {
                    templateUrl: 'templates/organization.html',
                    controller: 'organizationcontroller'
                }
            }
        })

    .state('tab.account', {
        cache: false,
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'tabaccountcontroller'
            }
        }
    })

        .state('tab.sendafrown', {
            cache: false,
            url: '/sendafrown',
            views: {
                'tab-account': {
                    templateUrl: 'templates/sendafrown.html',
                    controller: 'sendafrowncontroller'
                }
            }
        })

        .state('tab.sendasmile', {
            cache: false,
            url: '/sendasmile',
            views: {
                'tab-account': {
                    templateUrl: 'templates/sendasmile.html',
                    controller: 'sendasmilecontroller'
                }
            }
        })

        .state('tab.reportabug', {
            cache: false,
            url: '/reportabug',
            views: {
                'tab-account': {
                    templateUrl: 'templates/reportabug.html',
                    controller: 'reportabugcontroller'
                }
            }
        })

        .state('tab.about', {
            cache: false,
            url: '/about',
            views: {
                'tab-account': {
                    templateUrl: 'templates/about.html',
                    controller: 'aboutcontroller'
                }
            }
        })





    ;



    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

})

.filter('one_zero', function () {
        return function(value, length, end) {
            if (value === 1) {
                return 'Yes';
            }
            return 'No';
        };
    });
