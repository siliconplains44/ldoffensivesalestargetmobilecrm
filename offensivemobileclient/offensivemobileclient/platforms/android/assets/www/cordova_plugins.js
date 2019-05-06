cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-console.logger",
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "id": "cordova-plugin-console.console",
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-storage",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "id": "org.apache.cordova.camera.Camera",
        "file": "plugins/org.apache.cordova.camera/www/CameraConstants.js",
        "pluginId": "org.apache.cordova.camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "org.apache.cordova.camera.CameraPopoverOptions",
        "file": "plugins/org.apache.cordova.camera/www/CameraPopoverOptions.js",
        "pluginId": "org.apache.cordova.camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "org.apache.cordova.camera.camera",
        "file": "plugins/org.apache.cordova.camera/www/Camera.js",
        "pluginId": "org.apache.cordova.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "org.apache.cordova.camera.CameraPopoverHandle",
        "file": "plugins/org.apache.cordova.camera/www/CameraPopoverHandle.js",
        "pluginId": "org.apache.cordova.camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.contacts",
        "file": "plugins/org.apache.cordova.contacts/www/contacts.js",
        "pluginId": "org.apache.cordova.contacts",
        "clobbers": [
            "navigator.contacts"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.Contact",
        "file": "plugins/org.apache.cordova.contacts/www/Contact.js",
        "pluginId": "org.apache.cordova.contacts",
        "clobbers": [
            "Contact"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.ContactAddress",
        "file": "plugins/org.apache.cordova.contacts/www/ContactAddress.js",
        "pluginId": "org.apache.cordova.contacts",
        "clobbers": [
            "ContactAddress"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.ContactError",
        "file": "plugins/org.apache.cordova.contacts/www/ContactError.js",
        "pluginId": "org.apache.cordova.contacts",
        "clobbers": [
            "ContactError"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.ContactField",
        "file": "plugins/org.apache.cordova.contacts/www/ContactField.js",
        "pluginId": "org.apache.cordova.contacts",
        "clobbers": [
            "ContactField"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.ContactFindOptions",
        "file": "plugins/org.apache.cordova.contacts/www/ContactFindOptions.js",
        "pluginId": "org.apache.cordova.contacts",
        "clobbers": [
            "ContactFindOptions"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.ContactName",
        "file": "plugins/org.apache.cordova.contacts/www/ContactName.js",
        "pluginId": "org.apache.cordova.contacts",
        "clobbers": [
            "ContactName"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.ContactOrganization",
        "file": "plugins/org.apache.cordova.contacts/www/ContactOrganization.js",
        "pluginId": "org.apache.cordova.contacts",
        "clobbers": [
            "ContactOrganization"
        ]
    },
    {
        "id": "org.apache.cordova.contacts.ContactFieldType",
        "file": "plugins/org.apache.cordova.contacts/www/ContactFieldType.js",
        "pluginId": "org.apache.cordova.contacts",
        "merges": [
            ""
        ]
    },
    {
        "id": "org.apache.cordova.file.DirectoryEntry",
        "file": "plugins/org.apache.cordova.file/www/DirectoryEntry.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "id": "org.apache.cordova.file.DirectoryReader",
        "file": "plugins/org.apache.cordova.file/www/DirectoryReader.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "id": "org.apache.cordova.file.Entry",
        "file": "plugins/org.apache.cordova.file/www/Entry.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "id": "org.apache.cordova.file.File",
        "file": "plugins/org.apache.cordova.file/www/File.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "id": "org.apache.cordova.file.FileEntry",
        "file": "plugins/org.apache.cordova.file/www/FileEntry.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "id": "org.apache.cordova.file.FileError",
        "file": "plugins/org.apache.cordova.file/www/FileError.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "id": "org.apache.cordova.file.FileReader",
        "file": "plugins/org.apache.cordova.file/www/FileReader.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "id": "org.apache.cordova.file.FileSystem",
        "file": "plugins/org.apache.cordova.file/www/FileSystem.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "id": "org.apache.cordova.file.FileUploadOptions",
        "file": "plugins/org.apache.cordova.file/www/FileUploadOptions.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "id": "org.apache.cordova.file.FileUploadResult",
        "file": "plugins/org.apache.cordova.file/www/FileUploadResult.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "id": "org.apache.cordova.file.FileWriter",
        "file": "plugins/org.apache.cordova.file/www/FileWriter.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "id": "org.apache.cordova.file.Flags",
        "file": "plugins/org.apache.cordova.file/www/Flags.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "id": "org.apache.cordova.file.LocalFileSystem",
        "file": "plugins/org.apache.cordova.file/www/LocalFileSystem.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "id": "org.apache.cordova.file.Metadata",
        "file": "plugins/org.apache.cordova.file/www/Metadata.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "id": "org.apache.cordova.file.ProgressEvent",
        "file": "plugins/org.apache.cordova.file/www/ProgressEvent.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "id": "org.apache.cordova.file.fileSystems",
        "file": "plugins/org.apache.cordova.file/www/fileSystems.js",
        "pluginId": "org.apache.cordova.file"
    },
    {
        "id": "org.apache.cordova.file.requestFileSystem",
        "file": "plugins/org.apache.cordova.file/www/requestFileSystem.js",
        "pluginId": "org.apache.cordova.file",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "id": "org.apache.cordova.file.resolveLocalFileSystemURI",
        "file": "plugins/org.apache.cordova.file/www/resolveLocalFileSystemURI.js",
        "pluginId": "org.apache.cordova.file",
        "merges": [
            "window"
        ]
    },
    {
        "id": "org.apache.cordova.file.androidFileSystem",
        "file": "plugins/org.apache.cordova.file/www/android/FileSystem.js",
        "pluginId": "org.apache.cordova.file",
        "merges": [
            "FileSystem"
        ]
    },
    {
        "id": "org.apache.cordova.file.fileSystems-roots",
        "file": "plugins/org.apache.cordova.file/www/fileSystems-roots.js",
        "pluginId": "org.apache.cordova.file",
        "runs": true
    },
    {
        "id": "org.apache.cordova.file.fileSystemPaths",
        "file": "plugins/org.apache.cordova.file/www/fileSystemPaths.js",
        "pluginId": "org.apache.cordova.file",
        "merges": [
            "cordova"
        ],
        "runs": true
    },
    {
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "pluginId": "org.apache.cordova.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "id": "org.apache.cordova.splashscreen.SplashScreen",
        "file": "plugins/org.apache.cordova.splashscreen/www/splashscreen.js",
        "pluginId": "org.apache.cordova.splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.leoparddata.cordova.itunesfilesharing": "1.0.0",
    "cordova-plugin-console": "1.0.1",
    "cordova-plugin-whitelist": "1.3.0",
    "cordova-sqlite-storage": "1.4.7",
    "org.apache.cordova.camera": "0.3.6",
    "org.apache.cordova.contacts": "0.2.16",
    "org.apache.cordova.file": "1.3.3",
    "org.apache.cordova.geolocation": "0.3.12",
    "org.apache.cordova.inappbrowser": "0.6.0",
    "org.apache.cordova.splashscreen": "1.0.0"
};
// BOTTOM OF METADATA
});