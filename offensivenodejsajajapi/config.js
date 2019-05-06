
var config = {};

config.databasehost = '';
//config.databasehost = 'localhost';
config.databaseport = 3306;
config.databaseusername = '';
config.databasepassword = '';
//config.databasepassword = '1';
config.database = 'offensive';
config.cert = __dirname + '/certs/ca-cert.pem';
config.connectionpoolconnectioncount = 100;
config.webserviceusername = "";
config.webservicepassword = "";

config.filestorageserviceapiurl = '';
config.filestorageserviceapiusername = '';
config.filestorageserviceapipassword = '';

config.securityserviceapiurl = ''
config.securityserviceapiusername = '';
config.securityserviceapipassword = '';

module.exports = config;