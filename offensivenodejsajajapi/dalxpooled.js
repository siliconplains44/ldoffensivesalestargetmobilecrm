var config = require('./config');
var nodeMariaDb = require('mysql');
var fs = require('fs')

function dataAccessLayerX(connectionPool) {
    var self = this;
    self.serviceConnectionPool = connectionPool
    var connection = null;

};

dataAccessLayerX.prototype.initializeConnectionPoolExtended = function(poolConfig) {
    var self = this;
    self.serviceConnectionPool = nodeMariaDb.createPool(poolConfig);
};

dataAccessLayerX.prototype.openConnection = function(cb) { 
    var self = this;
    self.serviceConnectionPool.getConnection(function (err, connection) {
      if (!err) {
          self.connection = connection;
      }
      cb(err);
  });
};

dataAccessLayerX.prototype.closeConnection = function() { 
    var self = this;
    if (self.connection) {
        self.connection.release();
    }
};

dataAccessLayerX.prototype.escape = function(value) { 
    var self = this;
    return self.connection.escape(value);
}

dataAccessLayerX.prototype.startTransaction = function(cb) { 
    var self = this;
    self.executeStatement('START TRANSACTION', cb);
};

dataAccessLayerX.prototype.rollbackTransaction = function(cb) { 
    var self = this;
    self.executeStatement('ROLLBACK', cb);
};

dataAccessLayerX.prototype.commitTransaction = function(cb) { 
    var self = this;
    self.executeStatement('COMMIT', cb);
};

dataAccessLayerX.prototype.executeStatement = function(sqlStatement, cb) { 
    var self = this;
    self.connection.query(sqlStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.executeQuery = function(sqlQueryStatement, cb) { 
    var self = this;
    self.connection.query(sqlQueryStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addActivity = function(Activity, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO activities (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'CampaignID, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'Started, ';
    sqlInsertStatement += 'DurationInHours, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'IsDeleted, ';
    sqlInsertStatement += 'ActivityTypeID, ';
    sqlInsertStatement += 'ActivityTypeCustomName';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Activity.SecurityUserID,
    Activity.CampaignID,
    Activity.Created,
    Activity.Started,
    Activity.DurationInHours,
    Activity.Description,
    Activity.AttachedToObjectTypeID,
    Activity.AttachedToObjectID,
    Activity.IsDeleted,
    Activity.ActivityTypeID,
    Activity.ActivityTypeCustomName];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyActivity = function(Activity, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE activities ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' CampaignID = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' Started = ?, ';
    sqlUpdateStatement += ' DurationInHours = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?, ';
    sqlUpdateStatement += ' ActivityTypeID = ?, ';
    sqlUpdateStatement += ' ActivityTypeCustomName = ?';
   sqlUpdateStatement += ' WHERE ActivityID = ?'; 
    var dataValues = [
    Activity.SecurityUserID,
    Activity.CampaignID,
    Activity.Created,
    Activity.Started,
    Activity.DurationInHours,
    Activity.Description,
    Activity.AttachedToObjectTypeID,
    Activity.AttachedToObjectID,
    Activity.IsDeleted,
    Activity.ActivityTypeID,
    Activity.ActivityTypeCustomName,
    Activity.ActivityID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardActivity = function(Activity, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM activities WHERE ActivityID = ?';
    var dataValues = [
    Activity.ActivityID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftActivity = function(Activity, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE activities SET IsDeleted = 1 WHERE ActivityID = ?';
    var dataValues = [
    Activity.ActivityID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllActivity = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM activities';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseActivity = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM activities WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addActivityType = function(ActivityType, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO activitytypes (';
    sqlInsertStatement += 'Name';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ActivityType.Name];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyActivityType = function(ActivityType, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE activitytypes ';
    sqlUpdateStatement += ' SET Name = ?';
   sqlUpdateStatement += ' WHERE ActivityTypeID = ?'; 
    var dataValues = [
    ActivityType.Name,
    ActivityType.ActivityTypeID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardActivityType = function(ActivityType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM activitytypes WHERE ActivityTypeID = ?';
    var dataValues = [
    ActivityType.ActivityTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftActivityType = function(ActivityType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE activitytypes SET IsDeleted = 1 WHERE ActivityTypeID = ?';
    var dataValues = [
    ActivityType.ActivityTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllActivityType = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM activitytypes';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseActivityType = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM activitytypes WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addAddress = function(Address, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO addresses (';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Line1, ';
    sqlInsertStatement += 'Line2, ';
    sqlInsertStatement += 'City, ';
    sqlInsertStatement += 'State, ';
    sqlInsertStatement += 'Zip, ';
    sqlInsertStatement += 'Country, ';
    sqlInsertStatement += 'Type, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Address.AttachedToObjectTypeID,
    Address.AttachedToObjectID,
    Address.Name,
    Address.Line1,
    Address.Line2,
    Address.City,
    Address.State,
    Address.Zip,
    Address.Country,
    Address.Type,
    Address.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyAddress = function(Address, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE addresses ';
    sqlUpdateStatement += ' SET AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Line1 = ?, ';
    sqlUpdateStatement += ' Line2 = ?, ';
    sqlUpdateStatement += ' City = ?, ';
    sqlUpdateStatement += ' State = ?, ';
    sqlUpdateStatement += ' Zip = ?, ';
    sqlUpdateStatement += ' Country = ?, ';
    sqlUpdateStatement += ' Type = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE AddressID = ?'; 
    var dataValues = [
    Address.AttachedToObjectTypeID,
    Address.AttachedToObjectID,
    Address.Name,
    Address.Line1,
    Address.Line2,
    Address.City,
    Address.State,
    Address.Zip,
    Address.Country,
    Address.Type,
    Address.IsDeleted,
    Address.AddressID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardAddress = function(Address, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM addresses WHERE AddressID = ?';
    var dataValues = [
    Address.AddressID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftAddress = function(Address, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE addresses SET IsDeleted = 1 WHERE AddressID = ?';
    var dataValues = [
    Address.AddressID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllAddress = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM addresses';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseAddress = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM addresses WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addAttachedToObjectType = function(AttachedToObjectType, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO attachedtoobjecttypes (';
    sqlInsertStatement += 'Name';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    AttachedToObjectType.Name];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyAttachedToObjectType = function(AttachedToObjectType, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE attachedtoobjecttypes ';
    sqlUpdateStatement += ' SET Name = ?';
   sqlUpdateStatement += ' WHERE AttachedToObjectTypeID = ?'; 
    var dataValues = [
    AttachedToObjectType.Name,
    AttachedToObjectType.AttachedToObjectTypeID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardAttachedToObjectType = function(AttachedToObjectType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM attachedtoobjecttypes WHERE AttachedToObjectTypeID = ?';
    var dataValues = [
    AttachedToObjectType.AttachedToObjectTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftAttachedToObjectType = function(AttachedToObjectType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE attachedtoobjecttypes SET IsDeleted = 1 WHERE AttachedToObjectTypeID = ?';
    var dataValues = [
    AttachedToObjectType.AttachedToObjectTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllAttachedToObjectType = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM attachedtoobjecttypes';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseAttachedToObjectType = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM attachedtoobjecttypes WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addAttachment = function(Attachment, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO attachments (';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'Filename, ';
    sqlInsertStatement += 'ExternalFileID, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'FileSizeInBytes, ';
    sqlInsertStatement += 'UploadCompleted, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'IsDeleted, ';
    sqlInsertStatement += 'PurgeCompleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Attachment.Name,
    Attachment.Description,
    Attachment.Filename,
    Attachment.ExternalFileID,
    Attachment.AttachedToObjectTypeID,
    Attachment.AttachedToObjectID,
    Attachment.FileSizeInBytes,
    Attachment.UploadCompleted,
    Attachment.Created,
    Attachment.IsDeleted,
    Attachment.PurgeCompleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyAttachment = function(Attachment, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE attachments ';
    sqlUpdateStatement += ' SET Name = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' Filename = ?, ';
    sqlUpdateStatement += ' ExternalFileID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' FileSizeInBytes = ?, ';
    sqlUpdateStatement += ' UploadCompleted = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?, ';
    sqlUpdateStatement += ' PurgeCompleted = ?';
   sqlUpdateStatement += ' WHERE AttachmentID = ?'; 
    var dataValues = [
    Attachment.Name,
    Attachment.Description,
    Attachment.Filename,
    Attachment.ExternalFileID,
    Attachment.AttachedToObjectTypeID,
    Attachment.AttachedToObjectID,
    Attachment.FileSizeInBytes,
    Attachment.UploadCompleted,
    Attachment.Created,
    Attachment.IsDeleted,
    Attachment.PurgeCompleted,
    Attachment.AttachmentID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardAttachment = function(Attachment, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM attachments WHERE AttachmentID = ?';
    var dataValues = [
    Attachment.AttachmentID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftAttachment = function(Attachment, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE attachments SET IsDeleted = 1 WHERE AttachmentID = ?';
    var dataValues = [
    Attachment.AttachmentID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllAttachment = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM attachments';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseAttachment = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM attachments WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addBusinessObjectMap = function(BusinessObjectMap, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO businessobjectmaps (';
    sqlInsertStatement += 'FromObjectTypeID, ';
    sqlInsertStatement += 'FromObjectID, ';
    sqlInsertStatement += 'ToObjectTypeID, ';
    sqlInsertStatement += 'ToObjectID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    BusinessObjectMap.FromObjectTypeID,
    BusinessObjectMap.FromObjectID,
    BusinessObjectMap.ToObjectTypeID,
    BusinessObjectMap.ToObjectID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyBusinessObjectMap = function(BusinessObjectMap, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE businessobjectmaps ';
    sqlUpdateStatement += ' SET FromObjectTypeID = ?, ';
    sqlUpdateStatement += ' FromObjectID = ?, ';
    sqlUpdateStatement += ' ToObjectTypeID = ?, ';
    sqlUpdateStatement += ' ToObjectID = ?';
   sqlUpdateStatement += ' WHERE BusinessObjectMapID = ?'; 
    var dataValues = [
    BusinessObjectMap.FromObjectTypeID,
    BusinessObjectMap.FromObjectID,
    BusinessObjectMap.ToObjectTypeID,
    BusinessObjectMap.ToObjectID,
    BusinessObjectMap.BusinessObjectMapID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardBusinessObjectMap = function(BusinessObjectMap, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM businessobjectmaps WHERE BusinessObjectMapID = ?';
    var dataValues = [
    BusinessObjectMap.BusinessObjectMapID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftBusinessObjectMap = function(BusinessObjectMap, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE businessobjectmaps SET IsDeleted = 1 WHERE BusinessObjectMapID = ?';
    var dataValues = [
    BusinessObjectMap.BusinessObjectMapID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllBusinessObjectMap = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM businessobjectmaps';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseBusinessObjectMap = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM businessobjectmaps WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addCalendarEvent = function(CalendarEvent, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO calendarevents (';
    sqlInsertStatement += 'Title, ';
    sqlInsertStatement += 'StartDateTime, ';
    sqlInsertStatement += 'EndDateTime, ';
    sqlInsertStatement += 'Location, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'Color, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'IsDeleted, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    CalendarEvent.Title,
    CalendarEvent.StartDateTime,
    CalendarEvent.EndDateTime,
    CalendarEvent.Location,
    CalendarEvent.Description,
    CalendarEvent.Color,
    CalendarEvent.SecurityUserID,
    CalendarEvent.IsDeleted,
    CalendarEvent.AttachedToObjectTypeID,
    CalendarEvent.AttachedToObjectID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyCalendarEvent = function(CalendarEvent, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE calendarevents ';
    sqlUpdateStatement += ' SET Title = ?, ';
    sqlUpdateStatement += ' StartDateTime = ?, ';
    sqlUpdateStatement += ' EndDateTime = ?, ';
    sqlUpdateStatement += ' Location = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' Color = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?';
   sqlUpdateStatement += ' WHERE CalendarEventID = ?'; 
    var dataValues = [
    CalendarEvent.Title,
    CalendarEvent.StartDateTime,
    CalendarEvent.EndDateTime,
    CalendarEvent.Location,
    CalendarEvent.Description,
    CalendarEvent.Color,
    CalendarEvent.SecurityUserID,
    CalendarEvent.IsDeleted,
    CalendarEvent.AttachedToObjectTypeID,
    CalendarEvent.AttachedToObjectID,
    CalendarEvent.CalendarEventID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardCalendarEvent = function(CalendarEvent, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM calendarevents WHERE CalendarEventID = ?';
    var dataValues = [
    CalendarEvent.CalendarEventID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftCalendarEvent = function(CalendarEvent, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE calendarevents SET IsDeleted = 1 WHERE CalendarEventID = ?';
    var dataValues = [
    CalendarEvent.CalendarEventID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllCalendarEvent = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM calendarevents';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseCalendarEvent = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM calendarevents WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addCampaign = function(Campaign, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO campaigns (';
    sqlInsertStatement += 'StartDate, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'EndDate, ';
    sqlInsertStatement += 'TeamID, ';
    sqlInsertStatement += 'IsDeleted, ';
    sqlInsertStatement += 'Created';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Campaign.StartDate,
    Campaign.Name,
    Campaign.Description,
    Campaign.EndDate,
    Campaign.TeamID,
    Campaign.IsDeleted,
    Campaign.Created];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyCampaign = function(Campaign, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE campaigns ';
    sqlUpdateStatement += ' SET StartDate = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' EndDate = ?, ';
    sqlUpdateStatement += ' TeamID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?, ';
    sqlUpdateStatement += ' Created = ?';
   sqlUpdateStatement += ' WHERE CampaignID = ?'; 
    var dataValues = [
    Campaign.StartDate,
    Campaign.Name,
    Campaign.Description,
    Campaign.EndDate,
    Campaign.TeamID,
    Campaign.IsDeleted,
    Campaign.Created,
    Campaign.CampaignID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardCampaign = function(Campaign, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM campaigns WHERE CampaignID = ?';
    var dataValues = [
    Campaign.CampaignID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftCampaign = function(Campaign, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE campaigns SET IsDeleted = 1 WHERE CampaignID = ?';
    var dataValues = [
    Campaign.CampaignID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllCampaign = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM campaigns';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseCampaign = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM campaigns WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addDataTransferLogEntry = function(DataTransferLogEntry, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO datatransferlogentries (';
    sqlInsertStatement += 'SecurityUserId, ';
    sqlInsertStatement += 'IsDownload, ';
    sqlInsertStatement += 'TransferInBytes, ';
    sqlInsertStatement += 'TransferDate';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    DataTransferLogEntry.SecurityUserId,
    DataTransferLogEntry.IsDownload,
    DataTransferLogEntry.TransferInBytes,
    DataTransferLogEntry.TransferDate];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyDataTransferLogEntry = function(DataTransferLogEntry, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE datatransferlogentries ';
    sqlUpdateStatement += ' SET SecurityUserId = ?, ';
    sqlUpdateStatement += ' IsDownload = ?, ';
    sqlUpdateStatement += ' TransferInBytes = ?, ';
    sqlUpdateStatement += ' TransferDate = ?';
   sqlUpdateStatement += ' WHERE DataTransferLogEntryId = ?'; 
    var dataValues = [
    DataTransferLogEntry.SecurityUserId,
    DataTransferLogEntry.IsDownload,
    DataTransferLogEntry.TransferInBytes,
    DataTransferLogEntry.TransferDate,
    DataTransferLogEntry.DataTransferLogEntryId
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardDataTransferLogEntry = function(DataTransferLogEntry, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM datatransferlogentries WHERE DataTransferLogEntryId = ?';
    var dataValues = [
    DataTransferLogEntry.DataTransferLogEntryId
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftDataTransferLogEntry = function(DataTransferLogEntry, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE datatransferlogentries SET IsDeleted = 1 WHERE DataTransferLogEntryId = ?';
    var dataValues = [
    DataTransferLogEntry.DataTransferLogEntryId
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllDataTransferLogEntry = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM datatransferlogentries';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseDataTransferLogEntry = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM datatransferlogentries WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addDeal = function(Deal, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO deals (';
    sqlInsertStatement += 'SalesTargetID, ';
    sqlInsertStatement += 'ProductOrService, ';
    sqlInsertStatement += 'ClosedDate, ';
    sqlInsertStatement += 'IsEstimate, ';
    sqlInsertStatement += 'TimeFrameTypeID, ';
    sqlInsertStatement += 'Amount, ';
    sqlInsertStatement += 'Notes, ';
    sqlInsertStatement += 'IsDeleted, ';
    sqlInsertStatement += 'Created';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Deal.SalesTargetID,
    Deal.ProductOrService,
    Deal.ClosedDate,
    Deal.IsEstimate,
    Deal.TimeFrameTypeID,
    Deal.Amount,
    Deal.Notes,
    Deal.IsDeleted,
    Deal.Created];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyDeal = function(Deal, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE deals ';
    sqlUpdateStatement += ' SET SalesTargetID = ?, ';
    sqlUpdateStatement += ' ProductOrService = ?, ';
    sqlUpdateStatement += ' ClosedDate = ?, ';
    sqlUpdateStatement += ' IsEstimate = ?, ';
    sqlUpdateStatement += ' TimeFrameTypeID = ?, ';
    sqlUpdateStatement += ' Amount = ?, ';
    sqlUpdateStatement += ' Notes = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?, ';
    sqlUpdateStatement += ' Created = ?';
   sqlUpdateStatement += ' WHERE DealID = ?'; 
    var dataValues = [
    Deal.SalesTargetID,
    Deal.ProductOrService,
    Deal.ClosedDate,
    Deal.IsEstimate,
    Deal.TimeFrameTypeID,
    Deal.Amount,
    Deal.Notes,
    Deal.IsDeleted,
    Deal.Created,
    Deal.DealID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardDeal = function(Deal, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM deals WHERE DealID = ?';
    var dataValues = [
    Deal.DealID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftDeal = function(Deal, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE deals SET IsDeleted = 1 WHERE DealID = ?';
    var dataValues = [
    Deal.DealID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllDeal = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM deals';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseDeal = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM deals WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addEmailAddress = function(EmailAddress, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO emailaddresses (';
    sqlInsertStatement += 'Type, ';
    sqlInsertStatement += 'Address, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    EmailAddress.Type,
    EmailAddress.Address,
    EmailAddress.AttachedToObjectTypeID,
    EmailAddress.AttachedToObjectID,
    EmailAddress.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyEmailAddress = function(EmailAddress, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE emailaddresses ';
    sqlUpdateStatement += ' SET Type = ?, ';
    sqlUpdateStatement += ' Address = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE EmailAddressID = ?'; 
    var dataValues = [
    EmailAddress.Type,
    EmailAddress.Address,
    EmailAddress.AttachedToObjectTypeID,
    EmailAddress.AttachedToObjectID,
    EmailAddress.IsDeleted,
    EmailAddress.EmailAddressID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardEmailAddress = function(EmailAddress, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM emailaddresses WHERE EmailAddressID = ?';
    var dataValues = [
    EmailAddress.EmailAddressID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftEmailAddress = function(EmailAddress, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE emailaddresses SET IsDeleted = 1 WHERE EmailAddressID = ?';
    var dataValues = [
    EmailAddress.EmailAddressID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllEmailAddress = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM emailaddresses';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseEmailAddress = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM emailaddresses WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addExpense = function(Expense, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO expenses (';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'Amount, ';
    sqlInsertStatement += 'IsReimbursed, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Expense.Name,
    Expense.Description,
    Expense.SecurityUserID,
    Expense.Created,
    Expense.AttachedToObjectTypeID,
    Expense.AttachedToObjectID,
    Expense.Amount,
    Expense.IsReimbursed,
    Expense.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyExpense = function(Expense, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE expenses ';
    sqlUpdateStatement += ' SET Name = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' Amount = ?, ';
    sqlUpdateStatement += ' IsReimbursed = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE ExpenseID = ?'; 
    var dataValues = [
    Expense.Name,
    Expense.Description,
    Expense.SecurityUserID,
    Expense.Created,
    Expense.AttachedToObjectTypeID,
    Expense.AttachedToObjectID,
    Expense.Amount,
    Expense.IsReimbursed,
    Expense.IsDeleted,
    Expense.ExpenseID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardExpense = function(Expense, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM expenses WHERE ExpenseID = ?';
    var dataValues = [
    Expense.ExpenseID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftExpense = function(Expense, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE expenses SET IsDeleted = 1 WHERE ExpenseID = ?';
    var dataValues = [
    Expense.ExpenseID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllExpense = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM expenses';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseExpense = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM expenses WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addHandle = function(Handle, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO handles (';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'SecurityUserID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Handle.Name,
    Handle.SecurityUserID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyHandle = function(Handle, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE handles ';
    sqlUpdateStatement += ' SET Name = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?';
   sqlUpdateStatement += ' WHERE HandleID = ?'; 
    var dataValues = [
    Handle.Name,
    Handle.SecurityUserID,
    Handle.HandleID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardHandle = function(Handle, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM handles WHERE HandleID = ?';
    var dataValues = [
    Handle.HandleID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftHandle = function(Handle, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE handles SET IsDeleted = 1 WHERE HandleID = ?';
    var dataValues = [
    Handle.HandleID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllHandle = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM handles';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseHandle = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM handles WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addIndividual = function(Individual, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO individuals (';
    sqlInsertStatement += 'LastName, ';
    sqlInsertStatement += 'MiddleName, ';
    sqlInsertStatement += 'FirstName, ';
    sqlInsertStatement += 'Birthday, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Individual.LastName,
    Individual.MiddleName,
    Individual.FirstName,
    Individual.Birthday,
    Individual.AttachedToObjectTypeID,
    Individual.AttachedToObjectID,
    Individual.Created,
    Individual.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyIndividual = function(Individual, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE individuals ';
    sqlUpdateStatement += ' SET LastName = ?, ';
    sqlUpdateStatement += ' MiddleName = ?, ';
    sqlUpdateStatement += ' FirstName = ?, ';
    sqlUpdateStatement += ' Birthday = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE IndividualID = ?'; 
    var dataValues = [
    Individual.LastName,
    Individual.MiddleName,
    Individual.FirstName,
    Individual.Birthday,
    Individual.AttachedToObjectTypeID,
    Individual.AttachedToObjectID,
    Individual.Created,
    Individual.IsDeleted,
    Individual.IndividualID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardIndividual = function(Individual, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM individuals WHERE IndividualID = ?';
    var dataValues = [
    Individual.IndividualID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftIndividual = function(Individual, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE individuals SET IsDeleted = 1 WHERE IndividualID = ?';
    var dataValues = [
    Individual.IndividualID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllIndividual = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM individuals';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseIndividual = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM individuals WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addInstantMessageAccount = function(InstantMessageAccount, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO instantmessageaccounts (';
    sqlInsertStatement += 'Type, ';
    sqlInsertStatement += 'Handle, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    InstantMessageAccount.Type,
    InstantMessageAccount.Handle,
    InstantMessageAccount.AttachedToObjectTypeID,
    InstantMessageAccount.AttachedToObjectID,
    InstantMessageAccount.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyInstantMessageAccount = function(InstantMessageAccount, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE instantmessageaccounts ';
    sqlUpdateStatement += ' SET Type = ?, ';
    sqlUpdateStatement += ' Handle = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE InstantMessageAccountID = ?'; 
    var dataValues = [
    InstantMessageAccount.Type,
    InstantMessageAccount.Handle,
    InstantMessageAccount.AttachedToObjectTypeID,
    InstantMessageAccount.AttachedToObjectID,
    InstantMessageAccount.IsDeleted,
    InstantMessageAccount.InstantMessageAccountID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardInstantMessageAccount = function(InstantMessageAccount, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM instantmessageaccounts WHERE InstantMessageAccountID = ?';
    var dataValues = [
    InstantMessageAccount.InstantMessageAccountID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftInstantMessageAccount = function(InstantMessageAccount, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE instantmessageaccounts SET IsDeleted = 1 WHERE InstantMessageAccountID = ?';
    var dataValues = [
    InstantMessageAccount.InstantMessageAccountID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllInstantMessageAccount = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM instantmessageaccounts';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseInstantMessageAccount = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM instantmessageaccounts WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addMileageLogEntry = function(MileageLogEntry, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO mileagelogentries (';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'Occurred, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'StartingMileage, ';
    sqlInsertStatement += 'EndingMileage, ';
    sqlInsertStatement += 'IsReimbursed, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    MileageLogEntry.Created,
    MileageLogEntry.Occurred,
    MileageLogEntry.Description,
    MileageLogEntry.SecurityUserID,
    MileageLogEntry.StartingMileage,
    MileageLogEntry.EndingMileage,
    MileageLogEntry.IsReimbursed,
    MileageLogEntry.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyMileageLogEntry = function(MileageLogEntry, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE mileagelogentries ';
    sqlUpdateStatement += ' SET Created = ?, ';
    sqlUpdateStatement += ' Occurred = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' StartingMileage = ?, ';
    sqlUpdateStatement += ' EndingMileage = ?, ';
    sqlUpdateStatement += ' IsReimbursed = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE MileageLogEntryID = ?'; 
    var dataValues = [
    MileageLogEntry.Created,
    MileageLogEntry.Occurred,
    MileageLogEntry.Description,
    MileageLogEntry.SecurityUserID,
    MileageLogEntry.StartingMileage,
    MileageLogEntry.EndingMileage,
    MileageLogEntry.IsReimbursed,
    MileageLogEntry.IsDeleted,
    MileageLogEntry.MileageLogEntryID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardMileageLogEntry = function(MileageLogEntry, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM mileagelogentries WHERE MileageLogEntryID = ?';
    var dataValues = [
    MileageLogEntry.MileageLogEntryID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftMileageLogEntry = function(MileageLogEntry, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE mileagelogentries SET IsDeleted = 1 WHERE MileageLogEntryID = ?';
    var dataValues = [
    MileageLogEntry.MileageLogEntryID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllMileageLogEntry = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM mileagelogentries';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseMileageLogEntry = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM mileagelogentries WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addModuleInteraction = function(ModuleInteraction, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO moduleinteractions (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'UiObjectProducer, ';
    sqlInsertStatement += 'Occurred, ';
    sqlInsertStatement += 'AdditionalNotes';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ModuleInteraction.SecurityUserID,
    ModuleInteraction.UiObjectProducer,
    ModuleInteraction.Occurred,
    ModuleInteraction.AdditionalNotes];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyModuleInteraction = function(ModuleInteraction, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE moduleinteractions ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' UiObjectProducer = ?, ';
    sqlUpdateStatement += ' Occurred = ?, ';
    sqlUpdateStatement += ' AdditionalNotes = ?';
   sqlUpdateStatement += ' WHERE ModuleInteractionID = ?'; 
    var dataValues = [
    ModuleInteraction.SecurityUserID,
    ModuleInteraction.UiObjectProducer,
    ModuleInteraction.Occurred,
    ModuleInteraction.AdditionalNotes,
    ModuleInteraction.ModuleInteractionID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardModuleInteraction = function(ModuleInteraction, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM moduleinteractions WHERE ModuleInteractionID = ?';
    var dataValues = [
    ModuleInteraction.ModuleInteractionID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftModuleInteraction = function(ModuleInteraction, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE moduleinteractions SET IsDeleted = 1 WHERE ModuleInteractionID = ?';
    var dataValues = [
    ModuleInteraction.ModuleInteractionID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllModuleInteraction = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM moduleinteractions';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseModuleInteraction = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM moduleinteractions WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addModuleView = function(ModuleView, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO moduleviews (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Occurred';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ModuleView.SecurityUserID,
    ModuleView.Name,
    ModuleView.Occurred];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyModuleView = function(ModuleView, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE moduleviews ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Occurred = ?';
   sqlUpdateStatement += ' WHERE ModuleViewID = ?'; 
    var dataValues = [
    ModuleView.SecurityUserID,
    ModuleView.Name,
    ModuleView.Occurred,
    ModuleView.ModuleViewID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardModuleView = function(ModuleView, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM moduleviews WHERE ModuleViewID = ?';
    var dataValues = [
    ModuleView.ModuleViewID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftModuleView = function(ModuleView, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE moduleviews SET IsDeleted = 1 WHERE ModuleViewID = ?';
    var dataValues = [
    ModuleView.ModuleViewID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllModuleView = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM moduleviews';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseModuleView = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM moduleviews WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addNote = function(Note, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO notes (';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'Modified, ';
    sqlInsertStatement += 'Content, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Note.AttachedToObjectTypeID,
    Note.AttachedToObjectID,
    Note.Created,
    Note.Modified,
    Note.Content,
    Note.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyNote = function(Note, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE notes ';
    sqlUpdateStatement += ' SET AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' Modified = ?, ';
    sqlUpdateStatement += ' Content = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE NoteID = ?'; 
    var dataValues = [
    Note.AttachedToObjectTypeID,
    Note.AttachedToObjectID,
    Note.Created,
    Note.Modified,
    Note.Content,
    Note.IsDeleted,
    Note.NoteID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardNote = function(Note, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM notes WHERE NoteID = ?';
    var dataValues = [
    Note.NoteID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftNote = function(Note, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE notes SET IsDeleted = 1 WHERE NoteID = ?';
    var dataValues = [
    Note.NoteID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllNote = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM notes';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseNote = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM notes WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addOrganization = function(Organization, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO organizations (';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'Type';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Organization.Name,
    Organization.Created,
    Organization.Type];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyOrganization = function(Organization, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE organizations ';
    sqlUpdateStatement += ' SET Name = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' Type = ?';
   sqlUpdateStatement += ' WHERE OrganizationID = ?'; 
    var dataValues = [
    Organization.Name,
    Organization.Created,
    Organization.Type,
    Organization.OrganizationID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardOrganization = function(Organization, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM organizations WHERE OrganizationID = ?';
    var dataValues = [
    Organization.OrganizationID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftOrganization = function(Organization, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE organizations SET IsDeleted = 1 WHERE OrganizationID = ?';
    var dataValues = [
    Organization.OrganizationID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllOrganization = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM organizations';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseOrganization = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM organizations WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addPhoneNumber = function(PhoneNumber, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO phonenumbers (';
    sqlInsertStatement += 'Type, ';
    sqlInsertStatement += 'Number, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    PhoneNumber.Type,
    PhoneNumber.Number,
    PhoneNumber.AttachedToObjectTypeID,
    PhoneNumber.AttachedToObjectID,
    PhoneNumber.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyPhoneNumber = function(PhoneNumber, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE phonenumbers ';
    sqlUpdateStatement += ' SET Type = ?, ';
    sqlUpdateStatement += ' Number = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE PhoneNumberID = ?'; 
    var dataValues = [
    PhoneNumber.Type,
    PhoneNumber.Number,
    PhoneNumber.AttachedToObjectTypeID,
    PhoneNumber.AttachedToObjectID,
    PhoneNumber.IsDeleted,
    PhoneNumber.PhoneNumberID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardPhoneNumber = function(PhoneNumber, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM phonenumbers WHERE PhoneNumberID = ?';
    var dataValues = [
    PhoneNumber.PhoneNumberID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftPhoneNumber = function(PhoneNumber, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE phonenumbers SET IsDeleted = 1 WHERE PhoneNumberID = ?';
    var dataValues = [
    PhoneNumber.PhoneNumberID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllPhoneNumber = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM phonenumbers';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClausePhoneNumber = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM phonenumbers WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addQueryDate = function(QueryDate, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO querydates (';
    sqlInsertStatement += 'Year, ';
    sqlInsertStatement += 'Month, ';
    sqlInsertStatement += 'Day, ';
    sqlInsertStatement += 'Week, ';
    sqlInsertStatement += 'QueryDate';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    QueryDate.Year,
    QueryDate.Month,
    QueryDate.Day,
    QueryDate.Week,
    QueryDate.QueryDate];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyQueryDate = function(QueryDate, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE querydates ';
    sqlUpdateStatement += ' SET Year = ?, ';
    sqlUpdateStatement += ' Month = ?, ';
    sqlUpdateStatement += ' Day = ?, ';
    sqlUpdateStatement += ' Week = ?, ';
    sqlUpdateStatement += ' QueryDate = ?';
   sqlUpdateStatement += ' WHERE QueryDateID = ?'; 
    var dataValues = [
    QueryDate.Year,
    QueryDate.Month,
    QueryDate.Day,
    QueryDate.Week,
    QueryDate.QueryDate,
    QueryDate.QueryDateID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardQueryDate = function(QueryDate, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM querydates WHERE QueryDateID = ?';
    var dataValues = [
    QueryDate.QueryDateID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftQueryDate = function(QueryDate, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE querydates SET IsDeleted = 1 WHERE QueryDateID = ?';
    var dataValues = [
    QueryDate.QueryDateID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllQueryDate = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM querydates';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseQueryDate = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM querydates WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addQuote = function(Quote, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO quotes (';
    sqlInsertStatement += 'SalesTargetID, ';
    sqlInsertStatement += 'ProductOrService, ';
    sqlInsertStatement += 'SentDate, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'IsDeleted, ';
    sqlInsertStatement += 'TimeFrameTypeID, ';
    sqlInsertStatement += 'Amount, ';
    sqlInsertStatement += 'Notes';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Quote.SalesTargetID,
    Quote.ProductOrService,
    Quote.SentDate,
    Quote.Created,
    Quote.IsDeleted,
    Quote.TimeFrameTypeID,
    Quote.Amount,
    Quote.Notes];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyQuote = function(Quote, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE quotes ';
    sqlUpdateStatement += ' SET SalesTargetID = ?, ';
    sqlUpdateStatement += ' ProductOrService = ?, ';
    sqlUpdateStatement += ' SentDate = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?, ';
    sqlUpdateStatement += ' TimeFrameTypeID = ?, ';
    sqlUpdateStatement += ' Amount = ?, ';
    sqlUpdateStatement += ' Notes = ?';
   sqlUpdateStatement += ' WHERE QuoteID = ?'; 
    var dataValues = [
    Quote.SalesTargetID,
    Quote.ProductOrService,
    Quote.SentDate,
    Quote.Created,
    Quote.IsDeleted,
    Quote.TimeFrameTypeID,
    Quote.Amount,
    Quote.Notes,
    Quote.QuoteID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardQuote = function(Quote, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM quotes WHERE QuoteID = ?';
    var dataValues = [
    Quote.QuoteID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftQuote = function(Quote, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE quotes SET IsDeleted = 1 WHERE QuoteID = ?';
    var dataValues = [
    Quote.QuoteID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllQuote = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM quotes';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseQuote = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM quotes WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addRevenueEntry = function(RevenueEntry, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO revenueentries (';
    sqlInsertStatement += 'SalesTargetID, ';
    sqlInsertStatement += 'Amount, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'Notes, ';
    sqlInsertStatement += 'PeriodYear, ';
    sqlInsertStatement += 'PeriodMonth, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    RevenueEntry.SalesTargetID,
    RevenueEntry.Amount,
    RevenueEntry.Created,
    RevenueEntry.Notes,
    RevenueEntry.PeriodYear,
    RevenueEntry.PeriodMonth,
    RevenueEntry.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyRevenueEntry = function(RevenueEntry, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE revenueentries ';
    sqlUpdateStatement += ' SET SalesTargetID = ?, ';
    sqlUpdateStatement += ' Amount = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' Notes = ?, ';
    sqlUpdateStatement += ' PeriodYear = ?, ';
    sqlUpdateStatement += ' PeriodMonth = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE RevenueEntryID = ?'; 
    var dataValues = [
    RevenueEntry.SalesTargetID,
    RevenueEntry.Amount,
    RevenueEntry.Created,
    RevenueEntry.Notes,
    RevenueEntry.PeriodYear,
    RevenueEntry.PeriodMonth,
    RevenueEntry.IsDeleted,
    RevenueEntry.RevenueEntryID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardRevenueEntry = function(RevenueEntry, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM revenueentries WHERE RevenueEntryID = ?';
    var dataValues = [
    RevenueEntry.RevenueEntryID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftRevenueEntry = function(RevenueEntry, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE revenueentries SET IsDeleted = 1 WHERE RevenueEntryID = ?';
    var dataValues = [
    RevenueEntry.RevenueEntryID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllRevenueEntry = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM revenueentries';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseRevenueEntry = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM revenueentries WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSalesTarget = function(SalesTarget, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO salestargets (';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'SalesTargetStageID, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'TeamID, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SalesTarget.Name,
    SalesTarget.SecurityUserID,
    SalesTarget.SalesTargetStageID,
    SalesTarget.Created,
    SalesTarget.TeamID,
    SalesTarget.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySalesTarget = function(SalesTarget, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE salestargets ';
    sqlUpdateStatement += ' SET Name = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' SalesTargetStageID = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' TeamID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE SalesTargetID = ?'; 
    var dataValues = [
    SalesTarget.Name,
    SalesTarget.SecurityUserID,
    SalesTarget.SalesTargetStageID,
    SalesTarget.Created,
    SalesTarget.TeamID,
    SalesTarget.IsDeleted,
    SalesTarget.SalesTargetID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSalesTarget = function(SalesTarget, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM salestargets WHERE SalesTargetID = ?';
    var dataValues = [
    SalesTarget.SalesTargetID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSalesTarget = function(SalesTarget, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE salestargets SET IsDeleted = 1 WHERE SalesTargetID = ?';
    var dataValues = [
    SalesTarget.SalesTargetID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSalesTarget = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargets';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSalesTarget = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargets WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSalesTargetSecurityUser = function(SalesTargetSecurityUser, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO salestargetsecurityusers (';
    sqlInsertStatement += 'SalesTargetID, ';
    sqlInsertStatement += 'SecurityUserID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SalesTargetSecurityUser.SalesTargetID,
    SalesTargetSecurityUser.SecurityUserID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySalesTargetSecurityUser = function(SalesTargetSecurityUser, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE salestargetsecurityusers ';
    sqlUpdateStatement += ' SET SalesTargetID = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?';
   sqlUpdateStatement += ' WHERE SalesTargetSecurityUserID = ?'; 
    var dataValues = [
    SalesTargetSecurityUser.SalesTargetID,
    SalesTargetSecurityUser.SecurityUserID,
    SalesTargetSecurityUser.SalesTargetSecurityUserID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSalesTargetSecurityUser = function(SalesTargetSecurityUser, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM salestargetsecurityusers WHERE SalesTargetSecurityUserID = ?';
    var dataValues = [
    SalesTargetSecurityUser.SalesTargetSecurityUserID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSalesTargetSecurityUser = function(SalesTargetSecurityUser, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE salestargetsecurityusers SET IsDeleted = 1 WHERE SalesTargetSecurityUserID = ?';
    var dataValues = [
    SalesTargetSecurityUser.SalesTargetSecurityUserID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSalesTargetSecurityUser = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargetsecurityusers';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSalesTargetSecurityUser = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargetsecurityusers WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSalesTargetShare = function(SalesTargetShare, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO salestargetshares (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'SalesTargetID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SalesTargetShare.SecurityUserID,
    SalesTargetShare.SalesTargetID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySalesTargetShare = function(SalesTargetShare, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE salestargetshares ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' SalesTargetID = ?';
   sqlUpdateStatement += ' WHERE SalesTargetShareID = ?'; 
    var dataValues = [
    SalesTargetShare.SecurityUserID,
    SalesTargetShare.SalesTargetID,
    SalesTargetShare.SalesTargetShareID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSalesTargetShare = function(SalesTargetShare, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM salestargetshares WHERE SalesTargetShareID = ?';
    var dataValues = [
    SalesTargetShare.SalesTargetShareID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSalesTargetShare = function(SalesTargetShare, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE salestargetshares SET IsDeleted = 1 WHERE SalesTargetShareID = ?';
    var dataValues = [
    SalesTargetShare.SalesTargetShareID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSalesTargetShare = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargetshares';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSalesTargetShare = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargetshares WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSalesTargetStageChangeLogEntry = function(SalesTargetStageChangeLogEntry, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO salestargetstagechangelogentries (';
    sqlInsertStatement += 'SalesTargetID, ';
    sqlInsertStatement += 'SalesTargetStageFromID, ';
    sqlInsertStatement += 'SalesTargetStageToID, ';
    sqlInsertStatement += 'Occurred, ';
    sqlInsertStatement += 'ChangedBySecurityUserID, ';
    sqlInsertStatement += 'CampaignID, ';
    sqlInsertStatement += 'TeamID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SalesTargetStageChangeLogEntry.SalesTargetID,
    SalesTargetStageChangeLogEntry.SalesTargetStageFromID,
    SalesTargetStageChangeLogEntry.SalesTargetStageToID,
    SalesTargetStageChangeLogEntry.Occurred,
    SalesTargetStageChangeLogEntry.ChangedBySecurityUserID,
    SalesTargetStageChangeLogEntry.CampaignID,
    SalesTargetStageChangeLogEntry.TeamID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySalesTargetStageChangeLogEntry = function(SalesTargetStageChangeLogEntry, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE salestargetstagechangelogentries ';
    sqlUpdateStatement += ' SET SalesTargetID = ?, ';
    sqlUpdateStatement += ' SalesTargetStageFromID = ?, ';
    sqlUpdateStatement += ' SalesTargetStageToID = ?, ';
    sqlUpdateStatement += ' Occurred = ?, ';
    sqlUpdateStatement += ' ChangedBySecurityUserID = ?, ';
    sqlUpdateStatement += ' CampaignID = ?, ';
    sqlUpdateStatement += ' TeamID = ?';
   sqlUpdateStatement += ' WHERE SalesTargetStageChangeLogEntryID = ?'; 
    var dataValues = [
    SalesTargetStageChangeLogEntry.SalesTargetID,
    SalesTargetStageChangeLogEntry.SalesTargetStageFromID,
    SalesTargetStageChangeLogEntry.SalesTargetStageToID,
    SalesTargetStageChangeLogEntry.Occurred,
    SalesTargetStageChangeLogEntry.ChangedBySecurityUserID,
    SalesTargetStageChangeLogEntry.CampaignID,
    SalesTargetStageChangeLogEntry.TeamID,
    SalesTargetStageChangeLogEntry.SalesTargetStageChangeLogEntryID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSalesTargetStageChangeLogEntry = function(SalesTargetStageChangeLogEntry, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM salestargetstagechangelogentries WHERE SalesTargetStageChangeLogEntryID = ?';
    var dataValues = [
    SalesTargetStageChangeLogEntry.SalesTargetStageChangeLogEntryID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSalesTargetStageChangeLogEntry = function(SalesTargetStageChangeLogEntry, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE salestargetstagechangelogentries SET IsDeleted = 1 WHERE SalesTargetStageChangeLogEntryID = ?';
    var dataValues = [
    SalesTargetStageChangeLogEntry.SalesTargetStageChangeLogEntryID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSalesTargetStageChangeLogEntry = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargetstagechangelogentries';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSalesTargetStageChangeLogEntry = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargetstagechangelogentries WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSalesTargetStage = function(SalesTargetStage, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO salestargetstages (';
    sqlInsertStatement += 'Name';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SalesTargetStage.Name];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySalesTargetStage = function(SalesTargetStage, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE salestargetstages ';
    sqlUpdateStatement += ' SET Name = ?';
   sqlUpdateStatement += ' WHERE SalesTargetStageID = ?'; 
    var dataValues = [
    SalesTargetStage.Name,
    SalesTargetStage.SalesTargetStageID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSalesTargetStage = function(SalesTargetStage, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM salestargetstages WHERE SalesTargetStageID = ?';
    var dataValues = [
    SalesTargetStage.SalesTargetStageID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSalesTargetStage = function(SalesTargetStage, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE salestargetstages SET IsDeleted = 1 WHERE SalesTargetStageID = ?';
    var dataValues = [
    SalesTargetStage.SalesTargetStageID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSalesTargetStage = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargetstages';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSalesTargetStage = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargetstages WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSalesTargetType = function(SalesTargetType, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO salestargettypes (';
    sqlInsertStatement += 'Name';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SalesTargetType.Name];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySalesTargetType = function(SalesTargetType, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE salestargettypes ';
    sqlUpdateStatement += ' SET Name = ?';
   sqlUpdateStatement += ' WHERE SalesTargetTypeID = ?'; 
    var dataValues = [
    SalesTargetType.Name,
    SalesTargetType.SalesTargetTypeID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSalesTargetType = function(SalesTargetType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM salestargettypes WHERE SalesTargetTypeID = ?';
    var dataValues = [
    SalesTargetType.SalesTargetTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSalesTargetType = function(SalesTargetType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE salestargettypes SET IsDeleted = 1 WHERE SalesTargetTypeID = ?';
    var dataValues = [
    SalesTargetType.SalesTargetTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSalesTargetType = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargettypes';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSalesTargetType = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salestargettypes WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO securityusers (';
    sqlInsertStatement += 'ExternalSecurityUserId, ';
    sqlInsertStatement += 'IsEnabled';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SecurityUser.ExternalSecurityUserId,
    SecurityUser.IsEnabled];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE securityusers ';
    sqlUpdateStatement += ' SET ExternalSecurityUserId = ?, ';
    sqlUpdateStatement += ' IsEnabled = ?';
   sqlUpdateStatement += ' WHERE SecurityUserId = ?'; 
    var dataValues = [
    SecurityUser.ExternalSecurityUserId,
    SecurityUser.IsEnabled,
    SecurityUser.SecurityUserId
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM securityusers WHERE SecurityUserId = ?';
    var dataValues = [
    SecurityUser.SecurityUserId
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE securityusers SET IsDeleted = 1 WHERE SecurityUserId = ?';
    var dataValues = [
    SecurityUser.SecurityUserId
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSecurityUser = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM securityusers';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSecurityUser = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM securityusers WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSetting = function(Setting, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO settings (';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Value';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Setting.Name,
    Setting.Value];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySetting = function(Setting, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE settings ';
    sqlUpdateStatement += ' SET Name = ?, ';
    sqlUpdateStatement += ' Value = ?';
   sqlUpdateStatement += ' WHERE SettingID = ?'; 
    var dataValues = [
    Setting.Name,
    Setting.Value,
    Setting.SettingID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSetting = function(Setting, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM settings WHERE SettingID = ?';
    var dataValues = [
    Setting.SettingID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSetting = function(Setting, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE settings SET IsDeleted = 1 WHERE SettingID = ?';
    var dataValues = [
    Setting.SettingID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSetting = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM settings';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSetting = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM settings WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addTeamJoinRequest = function(TeamJoinRequest, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO teamjoinrequests (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'TeamID, ';
    sqlInsertStatement += 'RequestAuthorized, ';
    sqlInsertStatement += 'RequestAuthorizedBySecurityUserID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    TeamJoinRequest.SecurityUserID,
    TeamJoinRequest.TeamID,
    TeamJoinRequest.RequestAuthorized,
    TeamJoinRequest.RequestAuthorizedBySecurityUserID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyTeamJoinRequest = function(TeamJoinRequest, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE teamjoinrequests ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' TeamID = ?, ';
    sqlUpdateStatement += ' RequestAuthorized = ?, ';
    sqlUpdateStatement += ' RequestAuthorizedBySecurityUserID = ?';
   sqlUpdateStatement += ' WHERE TeamJoinRequestID = ?'; 
    var dataValues = [
    TeamJoinRequest.SecurityUserID,
    TeamJoinRequest.TeamID,
    TeamJoinRequest.RequestAuthorized,
    TeamJoinRequest.RequestAuthorizedBySecurityUserID,
    TeamJoinRequest.TeamJoinRequestID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardTeamJoinRequest = function(TeamJoinRequest, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM teamjoinrequests WHERE TeamJoinRequestID = ?';
    var dataValues = [
    TeamJoinRequest.TeamJoinRequestID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftTeamJoinRequest = function(TeamJoinRequest, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE teamjoinrequests SET IsDeleted = 1 WHERE TeamJoinRequestID = ?';
    var dataValues = [
    TeamJoinRequest.TeamJoinRequestID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllTeamJoinRequest = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM teamjoinrequests';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseTeamJoinRequest = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM teamjoinrequests WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addTeamLead = function(TeamLead, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO teamleads (';
    sqlInsertStatement += 'TeamMemberID, ';
    sqlInsertStatement += 'TeamID, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    TeamLead.TeamMemberID,
    TeamLead.TeamID,
    TeamLead.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyTeamLead = function(TeamLead, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE teamleads ';
    sqlUpdateStatement += ' SET TeamMemberID = ?, ';
    sqlUpdateStatement += ' TeamID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE TeamLeadID = ?'; 
    var dataValues = [
    TeamLead.TeamMemberID,
    TeamLead.TeamID,
    TeamLead.IsDeleted,
    TeamLead.TeamLeadID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardTeamLead = function(TeamLead, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM teamleads WHERE TeamLeadID = ?';
    var dataValues = [
    TeamLead.TeamLeadID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftTeamLead = function(TeamLead, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE teamleads SET IsDeleted = 1 WHERE TeamLeadID = ?';
    var dataValues = [
    TeamLead.TeamLeadID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllTeamLead = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM teamleads';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseTeamLead = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM teamleads WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addTeamMember = function(TeamMember, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO teammembers (';
    sqlInsertStatement += 'TeamID, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'IsActive, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    TeamMember.TeamID,
    TeamMember.SecurityUserID,
    TeamMember.Created,
    TeamMember.IsActive,
    TeamMember.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyTeamMember = function(TeamMember, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE teammembers ';
    sqlUpdateStatement += ' SET TeamID = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' IsActive = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE TeamMemberID = ?'; 
    var dataValues = [
    TeamMember.TeamID,
    TeamMember.SecurityUserID,
    TeamMember.Created,
    TeamMember.IsActive,
    TeamMember.IsDeleted,
    TeamMember.TeamMemberID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardTeamMember = function(TeamMember, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM teammembers WHERE TeamMemberID = ?';
    var dataValues = [
    TeamMember.TeamMemberID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftTeamMember = function(TeamMember, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE teammembers SET IsDeleted = 1 WHERE TeamMemberID = ?';
    var dataValues = [
    TeamMember.TeamMemberID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllTeamMember = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM teammembers';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseTeamMember = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM teammembers WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addTeam = function(Team, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO teams (';
    sqlInsertStatement += 'OrganizationID, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'IsDeleted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Team.OrganizationID,
    Team.Name,
    Team.Created,
    Team.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyTeam = function(Team, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE teams ';
    sqlUpdateStatement += ' SET OrganizationID = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE TeamID = ?'; 
    var dataValues = [
    Team.OrganizationID,
    Team.Name,
    Team.Created,
    Team.IsDeleted,
    Team.TeamID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardTeam = function(Team, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM teams WHERE TeamID = ?';
    var dataValues = [
    Team.TeamID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftTeam = function(Team, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE teams SET IsDeleted = 1 WHERE TeamID = ?';
    var dataValues = [
    Team.TeamID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllTeam = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM teams';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseTeam = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM teams WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addTimeFrameType = function(TimeFrameType, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO timeframetypes (';
    sqlInsertStatement += 'Name';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    TimeFrameType.Name];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyTimeFrameType = function(TimeFrameType, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE timeframetypes ';
    sqlUpdateStatement += ' SET Name = ?';
   sqlUpdateStatement += ' WHERE TimeFrameTypeID = ?'; 
    var dataValues = [
    TimeFrameType.Name,
    TimeFrameType.TimeFrameTypeID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardTimeFrameType = function(TimeFrameType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM timeframetypes WHERE TimeFrameTypeID = ?';
    var dataValues = [
    TimeFrameType.TimeFrameTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftTimeFrameType = function(TimeFrameType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE timeframetypes SET IsDeleted = 1 WHERE TimeFrameTypeID = ?';
    var dataValues = [
    TimeFrameType.TimeFrameTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllTimeFrameType = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM timeframetypes';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseTimeFrameType = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM timeframetypes WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addUri = function(Uri, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO uris (';
    sqlInsertStatement += 'Type, ';
    sqlInsertStatement += 'Identifier, ';
    sqlInsertStatement += 'AttachedToObjectTypeID, ';
    sqlInsertStatement += 'AttachedToObjectID, ';
    sqlInsertStatement += 'IsDeleted, ';
    sqlInsertStatement += 'Created';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Uri.Type,
    Uri.Identifier,
    Uri.AttachedToObjectTypeID,
    Uri.AttachedToObjectID,
    Uri.IsDeleted,
    Uri.Created];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyUri = function(Uri, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE uris ';
    sqlUpdateStatement += ' SET Type = ?, ';
    sqlUpdateStatement += ' Identifier = ?, ';
    sqlUpdateStatement += ' AttachedToObjectTypeID = ?, ';
    sqlUpdateStatement += ' AttachedToObjectID = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?, ';
    sqlUpdateStatement += ' Created = ?';
   sqlUpdateStatement += ' WHERE UriID = ?'; 
    var dataValues = [
    Uri.Type,
    Uri.Identifier,
    Uri.AttachedToObjectTypeID,
    Uri.AttachedToObjectID,
    Uri.IsDeleted,
    Uri.Created,
    Uri.UriID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardUri = function(Uri, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM uris WHERE UriID = ?';
    var dataValues = [
    Uri.UriID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftUri = function(Uri, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE uris SET IsDeleted = 1 WHERE UriID = ?';
    var dataValues = [
    Uri.UriID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllUri = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM uris';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseUri = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM uris WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};


module.exports.dataAccessLayerX = dataAccessLayerX;