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
    self.connection.release();
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

dataAccessLayerX.prototype.addAccountActivation = function(AccountActivation, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO accountactivations (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Activated, ';
    sqlInsertStatement += 'Deactivated';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    AccountActivation.SecurityUserID,
    AccountActivation.Activated,
    AccountActivation.Deactivated];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyAccountActivation = function(AccountActivation, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE accountactivations ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' Activated = ?, ';
    sqlUpdateStatement += ' Deactivated = ?';
   sqlUpdateStatement += ' WHERE AccountActivationID = ?'; 
    var dataValues = [
    AccountActivation.SecurityUserID,
    AccountActivation.Activated,
    AccountActivation.Deactivated,
    AccountActivation.AccountActivationID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardAccountActivation = function(AccountActivation, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM accountactivations WHERE AccountActivationID = ?';
    var dataValues = [
    AccountActivation.AccountActivationID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftAccountActivation = function(AccountActivation, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE accountactivations SET IsDeleted = 1 WHERE AccountActivationID = ?';
    var dataValues = [
    AccountActivation.AccountActivationID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllAccountActivation = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM accountactivations';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseAccountActivation = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM accountactivations WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addAccount = function(Account, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO accounts (';
    sqlInsertStatement += 'SecurityUserId, ';
    sqlInsertStatement += 'LastName, ';
    sqlInsertStatement += 'FirstName, ';
    sqlInsertStatement += 'Created, ';
    sqlInsertStatement += 'EmailAddress, ';
    sqlInsertStatement += 'MobilePhoneNumber';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Account.SecurityUserId,
    Account.LastName,
    Account.FirstName,
    Account.Created,
    Account.EmailAddress,
    Account.MobilePhoneNumber];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyAccount = function(Account, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE accounts ';
    sqlUpdateStatement += ' SET SecurityUserId = ?, ';
    sqlUpdateStatement += ' LastName = ?, ';
    sqlUpdateStatement += ' FirstName = ?, ';
    sqlUpdateStatement += ' Created = ?, ';
    sqlUpdateStatement += ' EmailAddress = ?, ';
    sqlUpdateStatement += ' MobilePhoneNumber = ?';
   sqlUpdateStatement += ' WHERE AccountId = ?'; 
    var dataValues = [
    Account.SecurityUserId,
    Account.LastName,
    Account.FirstName,
    Account.Created,
    Account.EmailAddress,
    Account.MobilePhoneNumber,
    Account.AccountId
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardAccount = function(Account, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM accounts WHERE AccountId = ?';
    var dataValues = [
    Account.AccountId
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftAccount = function(Account, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE accounts SET IsDeleted = 1 WHERE AccountId = ?';
    var dataValues = [
    Account.AccountId
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllAccount = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM accounts';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseAccount = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM accounts WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addAccountServiceOfferingDiscount = function(AccountServiceOfferingDiscount, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO accountserviceofferingdiscounts (';
    sqlInsertStatement += 'AccountID, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'ServiceOfferingDiscountID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    AccountServiceOfferingDiscount.AccountID,
    AccountServiceOfferingDiscount.SecurityUserID,
    AccountServiceOfferingDiscount.ServiceOfferingDiscountID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyAccountServiceOfferingDiscount = function(AccountServiceOfferingDiscount, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE accountserviceofferingdiscounts ';
    sqlUpdateStatement += ' SET AccountID = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' ServiceOfferingDiscountID = ?';
   sqlUpdateStatement += ' WHERE AccountServiceOfferingDiscountID = ?'; 
    var dataValues = [
    AccountServiceOfferingDiscount.AccountID,
    AccountServiceOfferingDiscount.SecurityUserID,
    AccountServiceOfferingDiscount.ServiceOfferingDiscountID,
    AccountServiceOfferingDiscount.AccountServiceOfferingDiscountID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardAccountServiceOfferingDiscount = function(AccountServiceOfferingDiscount, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM accountserviceofferingdiscounts WHERE AccountServiceOfferingDiscountID = ?';
    var dataValues = [
    AccountServiceOfferingDiscount.AccountServiceOfferingDiscountID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftAccountServiceOfferingDiscount = function(AccountServiceOfferingDiscount, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE accountserviceofferingdiscounts SET IsDeleted = 1 WHERE AccountServiceOfferingDiscountID = ?';
    var dataValues = [
    AccountServiceOfferingDiscount.AccountServiceOfferingDiscountID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllAccountServiceOfferingDiscount = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM accountserviceofferingdiscounts';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseAccountServiceOfferingDiscount = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM accountserviceofferingdiscounts WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addBillingAddress = function(BillingAddress, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO billingaddresses (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'FullName, ';
    sqlInsertStatement += 'AddressLine1, ';
    sqlInsertStatement += 'AddressLine2, ';
    sqlInsertStatement += 'City, ';
    sqlInsertStatement += 'StateProvinceRegion, ';
    sqlInsertStatement += 'Zip, ';
    sqlInsertStatement += 'Country, ';
    sqlInsertStatement += 'PhoneNumber';
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
    BillingAddress.SecurityUserID,
    BillingAddress.FullName,
    BillingAddress.AddressLine1,
    BillingAddress.AddressLine2,
    BillingAddress.City,
    BillingAddress.StateProvinceRegion,
    BillingAddress.Zip,
    BillingAddress.Country,
    BillingAddress.PhoneNumber];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyBillingAddress = function(BillingAddress, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE billingaddresses ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' FullName = ?, ';
    sqlUpdateStatement += ' AddressLine1 = ?, ';
    sqlUpdateStatement += ' AddressLine2 = ?, ';
    sqlUpdateStatement += ' City = ?, ';
    sqlUpdateStatement += ' StateProvinceRegion = ?, ';
    sqlUpdateStatement += ' Zip = ?, ';
    sqlUpdateStatement += ' Country = ?, ';
    sqlUpdateStatement += ' PhoneNumber = ?';
   sqlUpdateStatement += ' WHERE BillingAddressID = ?'; 
    var dataValues = [
    BillingAddress.SecurityUserID,
    BillingAddress.FullName,
    BillingAddress.AddressLine1,
    BillingAddress.AddressLine2,
    BillingAddress.City,
    BillingAddress.StateProvinceRegion,
    BillingAddress.Zip,
    BillingAddress.Country,
    BillingAddress.PhoneNumber,
    BillingAddress.BillingAddressID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardBillingAddress = function(BillingAddress, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM billingaddresses WHERE BillingAddressID = ?';
    var dataValues = [
    BillingAddress.BillingAddressID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftBillingAddress = function(BillingAddress, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE billingaddresses SET IsDeleted = 1 WHERE BillingAddressID = ?';
    var dataValues = [
    BillingAddress.BillingAddressID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllBillingAddress = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM billingaddresses';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseBillingAddress = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM billingaddresses WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addCouponsAppliedToAccount = function(CouponsAppliedToAccount, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO couponsappliedtoaccount (';
    sqlInsertStatement += 'CouponsOfferedID, ';
    sqlInsertStatement += 'Applied, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Amount';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    CouponsAppliedToAccount.CouponsOfferedID,
    CouponsAppliedToAccount.Applied,
    CouponsAppliedToAccount.SecurityUserID,
    CouponsAppliedToAccount.Amount];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyCouponsAppliedToAccount = function(CouponsAppliedToAccount, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE couponsappliedtoaccount ';
    sqlUpdateStatement += ' SET CouponsOfferedID = ?, ';
    sqlUpdateStatement += ' Applied = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' Amount = ?';
   sqlUpdateStatement += ' WHERE CouponsAppliedToAccountID = ?'; 
    var dataValues = [
    CouponsAppliedToAccount.CouponsOfferedID,
    CouponsAppliedToAccount.Applied,
    CouponsAppliedToAccount.SecurityUserID,
    CouponsAppliedToAccount.Amount,
    CouponsAppliedToAccount.CouponsAppliedToAccountID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardCouponsAppliedToAccount = function(CouponsAppliedToAccount, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM couponsappliedtoaccount WHERE CouponsAppliedToAccountID = ?';
    var dataValues = [
    CouponsAppliedToAccount.CouponsAppliedToAccountID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftCouponsAppliedToAccount = function(CouponsAppliedToAccount, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE couponsappliedtoaccount SET IsDeleted = 1 WHERE CouponsAppliedToAccountID = ?';
    var dataValues = [
    CouponsAppliedToAccount.CouponsAppliedToAccountID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllCouponsAppliedToAccount = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM couponsappliedtoaccount';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseCouponsAppliedToAccount = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM couponsappliedtoaccount WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addCouponOffered = function(CouponOffered, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO couponsoffered (';
    sqlInsertStatement += 'Activated, ';
    sqlInsertStatement += 'Deactivated, ';
    sqlInsertStatement += 'Amount, ';
    sqlInsertStatement += 'Code';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    CouponOffered.Activated,
    CouponOffered.Deactivated,
    CouponOffered.Amount,
    CouponOffered.Code];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyCouponOffered = function(CouponOffered, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE couponsoffered ';
    sqlUpdateStatement += ' SET Activated = ?, ';
    sqlUpdateStatement += ' Deactivated = ?, ';
    sqlUpdateStatement += ' Amount = ?, ';
    sqlUpdateStatement += ' Code = ?';
   sqlUpdateStatement += ' WHERE CouponOfferedID = ?'; 
    var dataValues = [
    CouponOffered.Activated,
    CouponOffered.Deactivated,
    CouponOffered.Amount,
    CouponOffered.Code,
    CouponOffered.CouponOfferedID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardCouponOffered = function(CouponOffered, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM couponsoffered WHERE CouponOfferedID = ?';
    var dataValues = [
    CouponOffered.CouponOfferedID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftCouponOffered = function(CouponOffered, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE couponsoffered SET IsDeleted = 1 WHERE CouponOfferedID = ?';
    var dataValues = [
    CouponOffered.CouponOfferedID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllCouponOffered = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM couponsoffered';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseCouponOffered = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM couponsoffered WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addCreditCard = function(CreditCard, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO creditcards (';
    sqlInsertStatement += 'AssignedBillingAddressID, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'CardNumber, ';
    sqlInsertStatement += 'NameOnCard, ';
    sqlInsertStatement += 'ExpirationMonth, ';
    sqlInsertStatement += 'ExpirationYear, ';
    sqlInsertStatement += 'Csc, ';
    sqlInsertStatement += 'IsPrimary';
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
    CreditCard.AssignedBillingAddressID,
    CreditCard.SecurityUserID,
    CreditCard.CardNumber,
    CreditCard.NameOnCard,
    CreditCard.ExpirationMonth,
    CreditCard.ExpirationYear,
    CreditCard.Csc,
    CreditCard.IsPrimary];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyCreditCard = function(CreditCard, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE creditcards ';
    sqlUpdateStatement += ' SET AssignedBillingAddressID = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' CardNumber = ?, ';
    sqlUpdateStatement += ' NameOnCard = ?, ';
    sqlUpdateStatement += ' ExpirationMonth = ?, ';
    sqlUpdateStatement += ' ExpirationYear = ?, ';
    sqlUpdateStatement += ' Csc = ?, ';
    sqlUpdateStatement += ' IsPrimary = ?';
   sqlUpdateStatement += ' WHERE CreditCardID = ?'; 
    var dataValues = [
    CreditCard.AssignedBillingAddressID,
    CreditCard.SecurityUserID,
    CreditCard.CardNumber,
    CreditCard.NameOnCard,
    CreditCard.ExpirationMonth,
    CreditCard.ExpirationYear,
    CreditCard.Csc,
    CreditCard.IsPrimary,
    CreditCard.CreditCardID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardCreditCard = function(CreditCard, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM creditcards WHERE CreditCardID = ?';
    var dataValues = [
    CreditCard.CreditCardID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftCreditCard = function(CreditCard, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE creditcards SET IsDeleted = 1 WHERE CreditCardID = ?';
    var dataValues = [
    CreditCard.CreditCardID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllCreditCard = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM creditcards';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseCreditCard = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM creditcards WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addCredit = function(Credit, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO credits (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Amount, ';
    sqlInsertStatement += 'Posted, ';
    sqlInsertStatement += 'ServiceOfferingID, ';
    sqlInsertStatement += 'Notes';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Credit.SecurityUserID,
    Credit.Amount,
    Credit.Posted,
    Credit.ServiceOfferingID,
    Credit.Notes];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyCredit = function(Credit, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE credits ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' Amount = ?, ';
    sqlUpdateStatement += ' Posted = ?, ';
    sqlUpdateStatement += ' ServiceOfferingID = ?, ';
    sqlUpdateStatement += ' Notes = ?';
   sqlUpdateStatement += ' WHERE CreditID = ?'; 
    var dataValues = [
    Credit.SecurityUserID,
    Credit.Amount,
    Credit.Posted,
    Credit.ServiceOfferingID,
    Credit.Notes,
    Credit.CreditID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardCredit = function(Credit, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM credits WHERE CreditID = ?';
    var dataValues = [
    Credit.CreditID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftCredit = function(Credit, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE credits SET IsDeleted = 1 WHERE CreditID = ?';
    var dataValues = [
    Credit.CreditID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllCredit = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM credits';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseCredit = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM credits WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addInvoiceDiscountsApplied = function(InvoiceDiscountsApplied, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO invoicediscountsapplied (';
    sqlInsertStatement += 'InvoiceID, ';
    sqlInsertStatement += 'ServiceOfferingID, ';
    sqlInsertStatement += 'DiscountPercentage, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Description';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    InvoiceDiscountsApplied.InvoiceID,
    InvoiceDiscountsApplied.ServiceOfferingID,
    InvoiceDiscountsApplied.DiscountPercentage,
    InvoiceDiscountsApplied.Name,
    InvoiceDiscountsApplied.Description];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyInvoiceDiscountsApplied = function(InvoiceDiscountsApplied, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE invoicediscountsapplied ';
    sqlUpdateStatement += ' SET InvoiceID = ?, ';
    sqlUpdateStatement += ' ServiceOfferingID = ?, ';
    sqlUpdateStatement += ' DiscountPercentage = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Description = ?';
   sqlUpdateStatement += ' WHERE InvoiceDiscountsAppliedID = ?'; 
    var dataValues = [
    InvoiceDiscountsApplied.InvoiceID,
    InvoiceDiscountsApplied.ServiceOfferingID,
    InvoiceDiscountsApplied.DiscountPercentage,
    InvoiceDiscountsApplied.Name,
    InvoiceDiscountsApplied.Description,
    InvoiceDiscountsApplied.InvoiceDiscountsAppliedID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardInvoiceDiscountsApplied = function(InvoiceDiscountsApplied, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM invoicediscountsapplied WHERE InvoiceDiscountsAppliedID = ?';
    var dataValues = [
    InvoiceDiscountsApplied.InvoiceDiscountsAppliedID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftInvoiceDiscountsApplied = function(InvoiceDiscountsApplied, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE invoicediscountsapplied SET IsDeleted = 1 WHERE InvoiceDiscountsAppliedID = ?';
    var dataValues = [
    InvoiceDiscountsApplied.InvoiceDiscountsAppliedID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllInvoiceDiscountsApplied = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM invoicediscountsapplied';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseInvoiceDiscountsApplied = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM invoicediscountsapplied WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addInvoiceLineItem = function(InvoiceLineItem, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO invoicelineitems (';
    sqlInsertStatement += 'InvoiceID, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'Quantity, ';
    sqlInsertStatement += 'UnitPrice, ';
    sqlInsertStatement += 'Total';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    InvoiceLineItem.InvoiceID,
    InvoiceLineItem.Description,
    InvoiceLineItem.Quantity,
    InvoiceLineItem.UnitPrice,
    InvoiceLineItem.Total];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyInvoiceLineItem = function(InvoiceLineItem, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE invoicelineitems ';
    sqlUpdateStatement += ' SET InvoiceID = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' Quantity = ?, ';
    sqlUpdateStatement += ' UnitPrice = ?, ';
    sqlUpdateStatement += ' Total = ?';
   sqlUpdateStatement += ' WHERE InvoiceLineItemID = ?'; 
    var dataValues = [
    InvoiceLineItem.InvoiceID,
    InvoiceLineItem.Description,
    InvoiceLineItem.Quantity,
    InvoiceLineItem.UnitPrice,
    InvoiceLineItem.Total,
    InvoiceLineItem.InvoiceLineItemID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardInvoiceLineItem = function(InvoiceLineItem, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM invoicelineitems WHERE InvoiceLineItemID = ?';
    var dataValues = [
    InvoiceLineItem.InvoiceLineItemID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftInvoiceLineItem = function(InvoiceLineItem, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE invoicelineitems SET IsDeleted = 1 WHERE InvoiceLineItemID = ?';
    var dataValues = [
    InvoiceLineItem.InvoiceLineItemID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllInvoiceLineItem = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM invoicelineitems';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseInvoiceLineItem = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM invoicelineitems WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addInvoice = function(Invoice, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO invoices (';
    sqlInsertStatement += 'SoldToSecurityUserID, ';
    sqlInsertStatement += 'PostedDate, ';
    sqlInsertStatement += 'TermTypeID, ';
    sqlInsertStatement += 'Subtotal, ';
    sqlInsertStatement += 'Tax, ';
    sqlInsertStatement += 'Total, ';
    sqlInsertStatement += 'IsVoided, ';
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
    Invoice.SoldToSecurityUserID,
    Invoice.PostedDate,
    Invoice.TermTypeID,
    Invoice.Subtotal,
    Invoice.Tax,
    Invoice.Total,
    Invoice.IsVoided,
    Invoice.IsDeleted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyInvoice = function(Invoice, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE invoices ';
    sqlUpdateStatement += ' SET SoldToSecurityUserID = ?, ';
    sqlUpdateStatement += ' PostedDate = ?, ';
    sqlUpdateStatement += ' TermTypeID = ?, ';
    sqlUpdateStatement += ' Subtotal = ?, ';
    sqlUpdateStatement += ' Tax = ?, ';
    sqlUpdateStatement += ' Total = ?, ';
    sqlUpdateStatement += ' IsVoided = ?, ';
    sqlUpdateStatement += ' IsDeleted = ?';
   sqlUpdateStatement += ' WHERE InvoiceID = ?'; 
    var dataValues = [
    Invoice.SoldToSecurityUserID,
    Invoice.PostedDate,
    Invoice.TermTypeID,
    Invoice.Subtotal,
    Invoice.Tax,
    Invoice.Total,
    Invoice.IsVoided,
    Invoice.IsDeleted,
    Invoice.InvoiceID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardInvoice = function(Invoice, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM invoices WHERE InvoiceID = ?';
    var dataValues = [
    Invoice.InvoiceID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftInvoice = function(Invoice, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE invoices SET IsDeleted = 1 WHERE InvoiceID = ?';
    var dataValues = [
    Invoice.InvoiceID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllInvoice = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM invoices';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseInvoice = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM invoices WHERE ' + whereClause;
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

dataAccessLayerX.prototype.addPayment = function(Payment, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO payments (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Amount, ';
    sqlInsertStatement += 'Posted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    Payment.SecurityUserID,
    Payment.Amount,
    Payment.Posted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyPayment = function(Payment, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE payments ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' Amount = ?, ';
    sqlUpdateStatement += ' Posted = ?';
   sqlUpdateStatement += ' WHERE PaymentID = ?'; 
    var dataValues = [
    Payment.SecurityUserID,
    Payment.Amount,
    Payment.Posted,
    Payment.PaymentID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardPayment = function(Payment, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM payments WHERE PaymentID = ?';
    var dataValues = [
    Payment.PaymentID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftPayment = function(Payment, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE payments SET IsDeleted = 1 WHERE PaymentID = ?';
    var dataValues = [
    Payment.PaymentID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllPayment = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM payments';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClausePayment = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM payments WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSalesCallRequest = function(SalesCallRequest, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO salescallrequests (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'RequestDate, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'PhoneNumber';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SalesCallRequest.SecurityUserID,
    SalesCallRequest.RequestDate,
    SalesCallRequest.Name,
    SalesCallRequest.PhoneNumber];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySalesCallRequest = function(SalesCallRequest, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE salescallrequests ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' RequestDate = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' PhoneNumber = ?';
   sqlUpdateStatement += ' WHERE SalesCallRequestID = ?'; 
    var dataValues = [
    SalesCallRequest.SecurityUserID,
    SalesCallRequest.RequestDate,
    SalesCallRequest.Name,
    SalesCallRequest.PhoneNumber,
    SalesCallRequest.SalesCallRequestID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSalesCallRequest = function(SalesCallRequest, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM salescallrequests WHERE SalesCallRequestID = ?';
    var dataValues = [
    SalesCallRequest.SalesCallRequestID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSalesCallRequest = function(SalesCallRequest, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE salescallrequests SET IsDeleted = 1 WHERE SalesCallRequestID = ?';
    var dataValues = [
    SalesCallRequest.SalesCallRequestID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSalesCallRequest = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salescallrequests';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSalesCallRequest = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salescallrequests WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSalesCallRequest = function(SalesCallRequest, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO salescallrequestsprocessed (';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += ')';
    var dataValues = [
];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySalesCallRequest = function(SalesCallRequest, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE salescallrequestsprocessed ';
   sqlUpdateStatement += ' WHERE SalesCallRequestID = ?'; 
    var dataValues = [
    SalesCallRequest.SalesCallRequestID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSalesCallRequest = function(SalesCallRequest, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM salescallrequestsprocessed WHERE SalesCallRequestID = ?';
    var dataValues = [
    SalesCallRequest.SalesCallRequestID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSalesCallRequest = function(SalesCallRequest, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE salescallrequestsprocessed SET IsDeleted = 1 WHERE SalesCallRequestID = ?';
    var dataValues = [
    SalesCallRequest.SalesCallRequestID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSalesCallRequest = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salescallrequestsprocessed';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSalesCallRequest = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM salescallrequestsprocessed WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO securityusers (';
    sqlInsertStatement += 'ExternalSecurityUserID, ';
    sqlInsertStatement += 'SubUserOfSecurityUserID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SecurityUser.ExternalSecurityUserID,
    SecurityUser.SubUserOfSecurityUserID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE securityusers ';
    sqlUpdateStatement += ' SET ExternalSecurityUserID = ?, ';
    sqlUpdateStatement += ' SubUserOfSecurityUserID = ?';
   sqlUpdateStatement += ' WHERE SecurityUserID = ?'; 
    var dataValues = [
    SecurityUser.ExternalSecurityUserID,
    SecurityUser.SubUserOfSecurityUserID,
    SecurityUser.SecurityUserID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM securityusers WHERE SecurityUserID = ?';
    var dataValues = [
    SecurityUser.SecurityUserID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSecurityUser = function(SecurityUser, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE securityusers SET IsDeleted = 1 WHERE SecurityUserID = ?';
    var dataValues = [
    SecurityUser.SecurityUserID
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

dataAccessLayerX.prototype.addServiceOfferingAgreement = function(ServiceOfferingAgreement, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferingagreements (';
    sqlInsertStatement += 'ServiceOfferingID, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'IsActive, ';
    sqlInsertStatement += 'Agreement';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ServiceOfferingAgreement.ServiceOfferingID,
    ServiceOfferingAgreement.Name,
    ServiceOfferingAgreement.Description,
    ServiceOfferingAgreement.IsActive,
    ServiceOfferingAgreement.Agreement];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOfferingAgreement = function(ServiceOfferingAgreement, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferingagreements ';
    sqlUpdateStatement += ' SET ServiceOfferingID = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' IsActive = ?, ';
    sqlUpdateStatement += ' Agreement = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingAgreementID = ?'; 
    var dataValues = [
    ServiceOfferingAgreement.ServiceOfferingID,
    ServiceOfferingAgreement.Name,
    ServiceOfferingAgreement.Description,
    ServiceOfferingAgreement.IsActive,
    ServiceOfferingAgreement.Agreement,
    ServiceOfferingAgreement.ServiceOfferingAgreementID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOfferingAgreement = function(ServiceOfferingAgreement, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferingagreements WHERE ServiceOfferingAgreementID = ?';
    var dataValues = [
    ServiceOfferingAgreement.ServiceOfferingAgreementID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOfferingAgreement = function(ServiceOfferingAgreement, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferingagreements SET IsDeleted = 1 WHERE ServiceOfferingAgreementID = ?';
    var dataValues = [
    ServiceOfferingAgreement.ServiceOfferingAgreementID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOfferingAgreement = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingagreements';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOfferingAgreement = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingagreements WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addServiceOfferingAgreementSigned = function(ServiceOfferingAgreementSigned, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferingagreementssigned (';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Signed, ';
    sqlInsertStatement += 'Agreement, ';
    sqlInsertStatement += 'ServiceOfferingID';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ServiceOfferingAgreementSigned.SecurityUserID,
    ServiceOfferingAgreementSigned.Signed,
    ServiceOfferingAgreementSigned.Agreement,
    ServiceOfferingAgreementSigned.ServiceOfferingID];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOfferingAgreementSigned = function(ServiceOfferingAgreementSigned, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferingagreementssigned ';
    sqlUpdateStatement += ' SET SecurityUserID = ?, ';
    sqlUpdateStatement += ' Signed = ?, ';
    sqlUpdateStatement += ' Agreement = ?, ';
    sqlUpdateStatement += ' ServiceOfferingID = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingAgreementSignedID = ?'; 
    var dataValues = [
    ServiceOfferingAgreementSigned.SecurityUserID,
    ServiceOfferingAgreementSigned.Signed,
    ServiceOfferingAgreementSigned.Agreement,
    ServiceOfferingAgreementSigned.ServiceOfferingID,
    ServiceOfferingAgreementSigned.ServiceOfferingAgreementSignedID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOfferingAgreementSigned = function(ServiceOfferingAgreementSigned, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferingagreementssigned WHERE ServiceOfferingAgreementSignedID = ?';
    var dataValues = [
    ServiceOfferingAgreementSigned.ServiceOfferingAgreementSignedID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOfferingAgreementSigned = function(ServiceOfferingAgreementSigned, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferingagreementssigned SET IsDeleted = 1 WHERE ServiceOfferingAgreementSignedID = ?';
    var dataValues = [
    ServiceOfferingAgreementSigned.ServiceOfferingAgreementSignedID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOfferingAgreementSigned = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingagreementssigned';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOfferingAgreementSigned = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingagreementssigned WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addServiceOfferingBasePrice = function(ServiceOfferingBasePrice, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferingbaseprices (';
    sqlInsertStatement += 'ServiceOfferingID, ';
    sqlInsertStatement += 'ServiceOfferingUnitChargeTypeID, ';
    sqlInsertStatement += 'BasePrice';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ServiceOfferingBasePrice.ServiceOfferingID,
    ServiceOfferingBasePrice.ServiceOfferingUnitChargeTypeID,
    ServiceOfferingBasePrice.BasePrice];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOfferingBasePrice = function(ServiceOfferingBasePrice, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferingbaseprices ';
    sqlUpdateStatement += ' SET ServiceOfferingID = ?, ';
    sqlUpdateStatement += ' ServiceOfferingUnitChargeTypeID = ?, ';
    sqlUpdateStatement += ' BasePrice = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingBasePriceID = ?'; 
    var dataValues = [
    ServiceOfferingBasePrice.ServiceOfferingID,
    ServiceOfferingBasePrice.ServiceOfferingUnitChargeTypeID,
    ServiceOfferingBasePrice.BasePrice,
    ServiceOfferingBasePrice.ServiceOfferingBasePriceID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOfferingBasePrice = function(ServiceOfferingBasePrice, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferingbaseprices WHERE ServiceOfferingBasePriceID = ?';
    var dataValues = [
    ServiceOfferingBasePrice.ServiceOfferingBasePriceID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOfferingBasePrice = function(ServiceOfferingBasePrice, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferingbaseprices SET IsDeleted = 1 WHERE ServiceOfferingBasePriceID = ?';
    var dataValues = [
    ServiceOfferingBasePrice.ServiceOfferingBasePriceID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOfferingBasePrice = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingbaseprices';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOfferingBasePrice = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingbaseprices WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addServiceOfferingDiscount = function(ServiceOfferingDiscount, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferingdiscounts (';
    sqlInsertStatement += 'ServiceOfferingID, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'OfferedFrom, ';
    sqlInsertStatement += 'OfferedTo, ';
    sqlInsertStatement += 'DiscountPercentage';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ServiceOfferingDiscount.ServiceOfferingID,
    ServiceOfferingDiscount.Name,
    ServiceOfferingDiscount.Description,
    ServiceOfferingDiscount.OfferedFrom,
    ServiceOfferingDiscount.OfferedTo,
    ServiceOfferingDiscount.DiscountPercentage];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOfferingDiscount = function(ServiceOfferingDiscount, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferingdiscounts ';
    sqlUpdateStatement += ' SET ServiceOfferingID = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' OfferedFrom = ?, ';
    sqlUpdateStatement += ' OfferedTo = ?, ';
    sqlUpdateStatement += ' DiscountPercentage = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingDiscountID = ?'; 
    var dataValues = [
    ServiceOfferingDiscount.ServiceOfferingID,
    ServiceOfferingDiscount.Name,
    ServiceOfferingDiscount.Description,
    ServiceOfferingDiscount.OfferedFrom,
    ServiceOfferingDiscount.OfferedTo,
    ServiceOfferingDiscount.DiscountPercentage,
    ServiceOfferingDiscount.ServiceOfferingDiscountID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOfferingDiscount = function(ServiceOfferingDiscount, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferingdiscounts WHERE ServiceOfferingDiscountID = ?';
    var dataValues = [
    ServiceOfferingDiscount.ServiceOfferingDiscountID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOfferingDiscount = function(ServiceOfferingDiscount, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferingdiscounts SET IsDeleted = 1 WHERE ServiceOfferingDiscountID = ?';
    var dataValues = [
    ServiceOfferingDiscount.ServiceOfferingDiscountID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOfferingDiscount = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingdiscounts';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOfferingDiscount = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingdiscounts WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addServiceOfferingEnlistment = function(ServiceOfferingEnlistment, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferingenlistments (';
    sqlInsertStatement += 'ServiceOfferingID, ';
    sqlInsertStatement += 'SecurityUserID, ';
    sqlInsertStatement += 'Activated, ';
    sqlInsertStatement += 'Deactivated';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ServiceOfferingEnlistment.ServiceOfferingID,
    ServiceOfferingEnlistment.SecurityUserID,
    ServiceOfferingEnlistment.Activated,
    ServiceOfferingEnlistment.Deactivated];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOfferingEnlistment = function(ServiceOfferingEnlistment, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferingenlistments ';
    sqlUpdateStatement += ' SET ServiceOfferingID = ?, ';
    sqlUpdateStatement += ' SecurityUserID = ?, ';
    sqlUpdateStatement += ' Activated = ?, ';
    sqlUpdateStatement += ' Deactivated = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingEnlistmentID = ?'; 
    var dataValues = [
    ServiceOfferingEnlistment.ServiceOfferingID,
    ServiceOfferingEnlistment.SecurityUserID,
    ServiceOfferingEnlistment.Activated,
    ServiceOfferingEnlistment.Deactivated,
    ServiceOfferingEnlistment.ServiceOfferingEnlistmentID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOfferingEnlistment = function(ServiceOfferingEnlistment, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferingenlistments WHERE ServiceOfferingEnlistmentID = ?';
    var dataValues = [
    ServiceOfferingEnlistment.ServiceOfferingEnlistmentID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOfferingEnlistment = function(ServiceOfferingEnlistment, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferingenlistments SET IsDeleted = 1 WHERE ServiceOfferingEnlistmentID = ?';
    var dataValues = [
    ServiceOfferingEnlistment.ServiceOfferingEnlistmentID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOfferingEnlistment = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingenlistments';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOfferingEnlistment = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingenlistments WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addServiceOffering = function(ServiceOffering, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferings (';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'IsActive, ';
    sqlInsertStatement += 'OfferedFrom, ';
    sqlInsertStatement += 'OfferedTo';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ServiceOffering.Name,
    ServiceOffering.Description,
    ServiceOffering.IsActive,
    ServiceOffering.OfferedFrom,
    ServiceOffering.OfferedTo];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOffering = function(ServiceOffering, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferings ';
    sqlUpdateStatement += ' SET Name = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' IsActive = ?, ';
    sqlUpdateStatement += ' OfferedFrom = ?, ';
    sqlUpdateStatement += ' OfferedTo = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingID = ?'; 
    var dataValues = [
    ServiceOffering.Name,
    ServiceOffering.Description,
    ServiceOffering.IsActive,
    ServiceOffering.OfferedFrom,
    ServiceOffering.OfferedTo,
    ServiceOffering.ServiceOfferingID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOffering = function(ServiceOffering, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferings WHERE ServiceOfferingID = ?';
    var dataValues = [
    ServiceOffering.ServiceOfferingID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOffering = function(ServiceOffering, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferings SET IsDeleted = 1 WHERE ServiceOfferingID = ?';
    var dataValues = [
    ServiceOffering.ServiceOfferingID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOffering = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferings';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOffering = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferings WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addServiceOfferingSoftwareDownload = function(ServiceOfferingSoftwareDownload, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferingsoftwaredownloads (';
    sqlInsertStatement += 'ServiceOfferingID, ';
    sqlInsertStatement += 'URL, ';
    sqlInsertStatement += 'IsActive, ';
    sqlInsertStatement += 'Posted, ';
    sqlInsertStatement += 'VersionMajor, ';
    sqlInsertStatement += 'VersionMinor, ';
    sqlInsertStatement += 'Platform';
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
    ServiceOfferingSoftwareDownload.ServiceOfferingID,
    ServiceOfferingSoftwareDownload.URL,
    ServiceOfferingSoftwareDownload.IsActive,
    ServiceOfferingSoftwareDownload.Posted,
    ServiceOfferingSoftwareDownload.VersionMajor,
    ServiceOfferingSoftwareDownload.VersionMinor,
    ServiceOfferingSoftwareDownload.Platform];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOfferingSoftwareDownload = function(ServiceOfferingSoftwareDownload, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferingsoftwaredownloads ';
    sqlUpdateStatement += ' SET ServiceOfferingID = ?, ';
    sqlUpdateStatement += ' URL = ?, ';
    sqlUpdateStatement += ' IsActive = ?, ';
    sqlUpdateStatement += ' Posted = ?, ';
    sqlUpdateStatement += ' VersionMajor = ?, ';
    sqlUpdateStatement += ' VersionMinor = ?, ';
    sqlUpdateStatement += ' Platform = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingSoftwareDownloadID = ?'; 
    var dataValues = [
    ServiceOfferingSoftwareDownload.ServiceOfferingID,
    ServiceOfferingSoftwareDownload.URL,
    ServiceOfferingSoftwareDownload.IsActive,
    ServiceOfferingSoftwareDownload.Posted,
    ServiceOfferingSoftwareDownload.VersionMajor,
    ServiceOfferingSoftwareDownload.VersionMinor,
    ServiceOfferingSoftwareDownload.Platform,
    ServiceOfferingSoftwareDownload.ServiceOfferingSoftwareDownloadID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOfferingSoftwareDownload = function(ServiceOfferingSoftwareDownload, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferingsoftwaredownloads WHERE ServiceOfferingSoftwareDownloadID = ?';
    var dataValues = [
    ServiceOfferingSoftwareDownload.ServiceOfferingSoftwareDownloadID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOfferingSoftwareDownload = function(ServiceOfferingSoftwareDownload, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferingsoftwaredownloads SET IsDeleted = 1 WHERE ServiceOfferingSoftwareDownloadID = ?';
    var dataValues = [
    ServiceOfferingSoftwareDownload.ServiceOfferingSoftwareDownloadID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOfferingSoftwareDownload = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingsoftwaredownloads';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOfferingSoftwareDownload = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingsoftwaredownloads WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addServiceOfferingSupportURL = function(ServiceOfferingSupportURL, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferingsupporturls (';
    sqlInsertStatement += 'ServiceOfferingID, ';
    sqlInsertStatement += 'URL, ';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Description, ';
    sqlInsertStatement += 'IsActive, ';
    sqlInsertStatement += 'Posted';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ServiceOfferingSupportURL.ServiceOfferingID,
    ServiceOfferingSupportURL.URL,
    ServiceOfferingSupportURL.Name,
    ServiceOfferingSupportURL.Description,
    ServiceOfferingSupportURL.IsActive,
    ServiceOfferingSupportURL.Posted];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOfferingSupportURL = function(ServiceOfferingSupportURL, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferingsupporturls ';
    sqlUpdateStatement += ' SET ServiceOfferingID = ?, ';
    sqlUpdateStatement += ' URL = ?, ';
    sqlUpdateStatement += ' Name = ?, ';
    sqlUpdateStatement += ' Description = ?, ';
    sqlUpdateStatement += ' IsActive = ?, ';
    sqlUpdateStatement += ' Posted = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingSupportURLID = ?'; 
    var dataValues = [
    ServiceOfferingSupportURL.ServiceOfferingID,
    ServiceOfferingSupportURL.URL,
    ServiceOfferingSupportURL.Name,
    ServiceOfferingSupportURL.Description,
    ServiceOfferingSupportURL.IsActive,
    ServiceOfferingSupportURL.Posted,
    ServiceOfferingSupportURL.ServiceOfferingSupportURLID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOfferingSupportURL = function(ServiceOfferingSupportURL, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferingsupporturls WHERE ServiceOfferingSupportURLID = ?';
    var dataValues = [
    ServiceOfferingSupportURL.ServiceOfferingSupportURLID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOfferingSupportURL = function(ServiceOfferingSupportURL, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferingsupporturls SET IsDeleted = 1 WHERE ServiceOfferingSupportURLID = ?';
    var dataValues = [
    ServiceOfferingSupportURL.ServiceOfferingSupportURLID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOfferingSupportURL = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingsupporturls';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOfferingSupportURL = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingsupporturls WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addServiceOfferingUnitChargeType = function(ServiceOfferingUnitChargeType, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO serviceofferingunitchargetypes (';
    sqlInsertStatement += 'Name';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    ServiceOfferingUnitChargeType.Name];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyServiceOfferingUnitChargeType = function(ServiceOfferingUnitChargeType, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE serviceofferingunitchargetypes ';
    sqlUpdateStatement += ' SET Name = ?';
   sqlUpdateStatement += ' WHERE ServiceOfferingUnitChargeTypeID = ?'; 
    var dataValues = [
    ServiceOfferingUnitChargeType.Name,
    ServiceOfferingUnitChargeType.ServiceOfferingUnitChargeTypeID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardServiceOfferingUnitChargeType = function(ServiceOfferingUnitChargeType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM serviceofferingunitchargetypes WHERE ServiceOfferingUnitChargeTypeID = ?';
    var dataValues = [
    ServiceOfferingUnitChargeType.ServiceOfferingUnitChargeTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftServiceOfferingUnitChargeType = function(ServiceOfferingUnitChargeType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE serviceofferingunitchargetypes SET IsDeleted = 1 WHERE ServiceOfferingUnitChargeTypeID = ?';
    var dataValues = [
    ServiceOfferingUnitChargeType.ServiceOfferingUnitChargeTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllServiceOfferingUnitChargeType = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingunitchargetypes';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseServiceOfferingUnitChargeType = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM serviceofferingunitchargetypes WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSiteProblem = function(SiteProblem, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO siteproblems (';
    sqlInsertStatement += 'Reported, ';
    sqlInsertStatement += 'ReportedBySecurityUserID, ';
    sqlInsertStatement += 'Problem';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    SiteProblem.Reported,
    SiteProblem.ReportedBySecurityUserID,
    SiteProblem.Problem];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySiteProblem = function(SiteProblem, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE siteproblems ';
    sqlUpdateStatement += ' SET Reported = ?, ';
    sqlUpdateStatement += ' ReportedBySecurityUserID = ?, ';
    sqlUpdateStatement += ' Problem = ?';
   sqlUpdateStatement += ' WHERE SiteProblemID = ?'; 
    var dataValues = [
    SiteProblem.Reported,
    SiteProblem.ReportedBySecurityUserID,
    SiteProblem.Problem,
    SiteProblem.SiteProblemID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSiteProblem = function(SiteProblem, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM siteproblems WHERE SiteProblemID = ?';
    var dataValues = [
    SiteProblem.SiteProblemID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSiteProblem = function(SiteProblem, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE siteproblems SET IsDeleted = 1 WHERE SiteProblemID = ?';
    var dataValues = [
    SiteProblem.SiteProblemID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSiteProblem = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM siteproblems';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSiteProblem = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM siteproblems WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addSiteProblemsProcessed = function(SiteProblemsProcessed, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO siteproblemsprocessed (';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += ')';
    var dataValues = [
];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifySiteProblemsProcessed = function(SiteProblemsProcessed, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE siteproblemsprocessed ';
   sqlUpdateStatement += ' WHERE SiteProblemsProcessedID = ?'; 
    var dataValues = [
    SiteProblemsProcessed.SiteProblemsProcessedID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardSiteProblemsProcessed = function(SiteProblemsProcessed, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM siteproblemsprocessed WHERE SiteProblemsProcessedID = ?';
    var dataValues = [
    SiteProblemsProcessed.SiteProblemsProcessedID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftSiteProblemsProcessed = function(SiteProblemsProcessed, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE siteproblemsprocessed SET IsDeleted = 1 WHERE SiteProblemsProcessedID = ?';
    var dataValues = [
    SiteProblemsProcessed.SiteProblemsProcessedID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllSiteProblemsProcessed = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM siteproblemsprocessed';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseSiteProblemsProcessed = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM siteproblemsprocessed WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.addTermType = function(TermType, cb) { 
    var self = this;
    var sqlInsertStatement = 'INSERT INTO termtypes (';
    sqlInsertStatement += 'Name, ';
    sqlInsertStatement += 'Definition';
    sqlInsertStatement += ') VALUES (';
    sqlInsertStatement += '?, ';
    sqlInsertStatement += '?';
    sqlInsertStatement += ')';
    var dataValues = [
    TermType.Name,
    TermType.Definition];
    self.connection.query(sqlInsertStatement, dataValues, function (err, result) { 
        cb(err, result);
    });
};

dataAccessLayerX.prototype.modifyTermType = function(TermType, cb) { 
    var self = this;
    var sqlUpdateStatement = 'UPDATE termtypes ';
    sqlUpdateStatement += ' SET Name = ?, ';
    sqlUpdateStatement += ' Definition = ?';
   sqlUpdateStatement += ' WHERE TermTypeID = ?'; 
    var dataValues = [
    TermType.Name,
    TermType.Definition,
    TermType.TermTypeID
    ];
    self.connection.query(sqlUpdateStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteHardTermType = function(TermType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' DELETE FROM termtypes WHERE TermTypeID = ?';
    var dataValues = [
    TermType.TermTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.deleteSoftTermType = function(TermType, cb) { 
    var self = this;
    var sqlDeleteStatement = ' UPDATE termtypes SET IsDeleted = 1 WHERE TermTypeID = ?';
    var dataValues = [
    TermType.TermTypeID
    ];
    self.connection.query(sqlDeleteStatement, dataValues, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveAllTermType = function(cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM termtypes';
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};

dataAccessLayerX.prototype.retrieveWithWhereClauseTermType = function(whereClause, cb) { 
    var self = this;
    var sqlSelectStatement = ' SELECT * FROM termtypes WHERE ' + whereClause;
    self.connection.query(sqlSelectStatement, function (err, rows, fields) { 
        cb(err, rows, fields);
    });
};


module.exports.dataAccessLayerX = dataAccessLayerX;