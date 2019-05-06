
var config = {};

config.databasehost = '';
config.databaseport = 3306;
config.databaseusername = '';
config.databasepassword = '';
config.database = 'offensive';
config.cert = __dirname + '/certs/ca-cert.pem';
config.connectionpoolconnectioncount = 100;
config.webserviceusername = "";
config.webservicepassword = "";

config.securityserviceapiurl = '';
config.securityserviceapiusername = '';
config.securityserviceapipassword = '';

config.marketingserviceapiurl = '';
config.marketingserviceapiusername = '';
config.marketingserviceapipassword = '';

config.emailsenderserviceurl = '';
config.emailsenderserviceapiusername = '';
config.emailsenderserviceapipassword = '';


module.exports = config;