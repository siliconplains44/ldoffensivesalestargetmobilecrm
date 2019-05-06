function AccountActivation (AccountActivationID, SecurityUserID, Activated, Deactivated) {
    this.AccountActivationID = null;
    this.SecurityUserID = null;
    this.Activated = null;
    this.Deactivated = null;
}

function Account (AccountId, SecurityUserId, LastName, FirstName, Created, EmailAddress, MobilePhoneNumber) {
    this.AccountId = null;
    this.SecurityUserId = null;
    this.LastName = null;
    this.FirstName = null;
    this.Created = null;
    this.EmailAddress = null;
    this.MobilePhoneNumber = null;
}

function AccountServiceOfferingDiscount (AccountServiceOfferingDiscountID, AccountID, SecurityUserID, ServiceOfferingDiscountID) {
    this.AccountServiceOfferingDiscountID = null;
    this.AccountID = null;
    this.SecurityUserID = null;
    this.ServiceOfferingDiscountID = null;
}

function BillingAddress (BillingAddressID, SecurityUserID, FullName, AddressLine1, AddressLine2, City, StateProvinceRegion, Zip, Country, PhoneNumber) {
    this.BillingAddressID = null;
    this.SecurityUserID = null;
    this.FullName = null;
    this.AddressLine1 = null;
    this.AddressLine2 = null;
    this.City = null;
    this.StateProvinceRegion = null;
    this.Zip = null;
    this.Country = null;
    this.PhoneNumber = null;
}

function CouponsAppliedToAccount (CouponsAppliedToAccountID, CouponsOfferedID, Applied, SecurityUserID, Amount) {
    this.CouponsAppliedToAccountID = null;
    this.CouponsOfferedID = null;
    this.Applied = null;
    this.SecurityUserID = null;
    this.Amount = null;
}

function CouponOffered (CouponOfferedID, Activated, Deactivated, Amount, Code) {
    this.CouponOfferedID = null;
    this.Activated = null;
    this.Deactivated = null;
    this.Amount = null;
    this.Code = null;
}

function CreditCard (CreditCardID, AssignedBillingAddressID, SecurityUserID, CardNumber, NameOnCard, ExpirationMonth, ExpirationYear, Csc, IsPrimary) {
    this.CreditCardID = null;
    this.AssignedBillingAddressID = null;
    this.SecurityUserID = null;
    this.CardNumber = null;
    this.NameOnCard = null;
    this.ExpirationMonth = null;
    this.ExpirationYear = null;
    this.Csc = null;
    this.IsPrimary = null;
}

function Credit (CreditID, SecurityUserID, Amount, Posted, ServiceOfferingID, Notes) {
    this.CreditID = null;
    this.SecurityUserID = null;
    this.Amount = null;
    this.Posted = null;
    this.ServiceOfferingID = null;
    this.Notes = null;
}

function InvoiceDiscountsApplied (InvoiceDiscountsAppliedID, InvoiceID, ServiceOfferingID, DiscountPercentage, Name, Description) {
    this.InvoiceDiscountsAppliedID = null;
    this.InvoiceID = null;
    this.ServiceOfferingID = null;
    this.DiscountPercentage = null;
    this.Name = null;
    this.Description = null;
}

function InvoiceLineItem (InvoiceLineItemID, InvoiceID, Description, Quantity, UnitPrice, Total) {
    this.InvoiceLineItemID = null;
    this.InvoiceID = null;
    this.Description = null;
    this.Quantity = null;
    this.UnitPrice = null;
    this.Total = null;
}

function Invoice (InvoiceID, SoldToSecurityUserID, PostedDate, TermTypeID, Subtotal, Tax, Total, IsVoided, IsDeleted) {
    this.InvoiceID = null;
    this.SoldToSecurityUserID = null;
    this.PostedDate = null;
    this.TermTypeID = null;
    this.Subtotal = null;
    this.Tax = null;
    this.Total = null;
    this.IsVoided = null;
    this.IsDeleted = null;
}

function ModuleInteraction (ModuleInteractionID, SecurityUserID, UiObjectProducer, Occurred, AdditionalNotes) {
    this.ModuleInteractionID = null;
    this.SecurityUserID = null;
    this.UiObjectProducer = null;
    this.Occurred = null;
    this.AdditionalNotes = null;
}

function ModuleView (ModuleViewID, SecurityUserID, Name, Occurred) {
    this.ModuleViewID = null;
    this.SecurityUserID = null;
    this.Name = null;
    this.Occurred = null;
}

function Payment (PaymentID, SecurityUserID, Amount, Posted) {
    this.PaymentID = null;
    this.SecurityUserID = null;
    this.Amount = null;
    this.Posted = null;
}

function SalesCallRequest (SalesCallRequestID, SecurityUserID, RequestDate, Name, PhoneNumber) {
    this.SalesCallRequestID = null;
    this.SecurityUserID = null;
    this.RequestDate = null;
    this.Name = null;
    this.PhoneNumber = null;
}

function SalesCallRequest (SalesCallRequestID) {
    this.SalesCallRequestID = null;
}

function SecurityUser (SecurityUserID, ExternalSecurityUserID, SubUserOfSecurityUserID) {
    this.SecurityUserID = null;
    this.ExternalSecurityUserID = null;
    this.SubUserOfSecurityUserID = null;
}

function ServiceOfferingAgreement (ServiceOfferingAgreementID, ServiceOfferingID, Name, Description, IsActive, Agreement) {
    this.ServiceOfferingAgreementID = null;
    this.ServiceOfferingID = null;
    this.Name = null;
    this.Description = null;
    this.IsActive = null;
    this.Agreement = null;
}

function ServiceOfferingAgreementSigned (ServiceOfferingAgreementSignedID, SecurityUserID, Signed, Agreement, ServiceOfferingID) {
    this.ServiceOfferingAgreementSignedID = null;
    this.SecurityUserID = null;
    this.Signed = null;
    this.Agreement = null;
    this.ServiceOfferingID = null;
}

function ServiceOfferingBasePrice (ServiceOfferingBasePriceID, ServiceOfferingID, ServiceOfferingUnitChargeTypeID, BasePrice) {
    this.ServiceOfferingBasePriceID = null;
    this.ServiceOfferingID = null;
    this.ServiceOfferingUnitChargeTypeID = null;
    this.BasePrice = null;
}

function ServiceOfferingDiscount (ServiceOfferingDiscountID, ServiceOfferingID, Name, Description, OfferedFrom, OfferedTo, DiscountPercentage) {
    this.ServiceOfferingDiscountID = null;
    this.ServiceOfferingID = null;
    this.Name = null;
    this.Description = null;
    this.OfferedFrom = null;
    this.OfferedTo = null;
    this.DiscountPercentage = null;
}

function ServiceOfferingEnlistment (ServiceOfferingEnlistmentID, ServiceOfferingID, SecurityUserID, Activated, Deactivated) {
    this.ServiceOfferingEnlistmentID = null;
    this.ServiceOfferingID = null;
    this.SecurityUserID = null;
    this.Activated = null;
    this.Deactivated = null;
}

function ServiceOffering (ServiceOfferingID, Name, Description, IsActive, OfferedFrom, OfferedTo) {
    this.ServiceOfferingID = null;
    this.Name = null;
    this.Description = null;
    this.IsActive = null;
    this.OfferedFrom = null;
    this.OfferedTo = null;
}

function ServiceOfferingSoftwareDownload (ServiceOfferingSoftwareDownloadID, ServiceOfferingID, URL, IsActive, Posted, VersionMajor, VersionMinor, Platform) {
    this.ServiceOfferingSoftwareDownloadID = null;
    this.ServiceOfferingID = null;
    this.URL = null;
    this.IsActive = null;
    this.Posted = null;
    this.VersionMajor = null;
    this.VersionMinor = null;
    this.Platform = null;
}

function ServiceOfferingSupportURL (ServiceOfferingSupportURLID, ServiceOfferingID, URL, Name, Description, IsActive, Posted) {
    this.ServiceOfferingSupportURLID = null;
    this.ServiceOfferingID = null;
    this.URL = null;
    this.Name = null;
    this.Description = null;
    this.IsActive = null;
    this.Posted = null;
}

function ServiceOfferingUnitChargeType (ServiceOfferingUnitChargeTypeID, Name) {
    this.ServiceOfferingUnitChargeTypeID = null;
    this.Name = null;
}

function SiteProblem (SiteProblemID, Reported, ReportedBySecurityUserID, Problem) {
    this.SiteProblemID = null;
    this.Reported = null;
    this.ReportedBySecurityUserID = null;
    this.Problem = null;
}

function SiteProblemsProcessed (SiteProblemsProcessedID) {
    this.SiteProblemsProcessedID = null;
}

function TermType (TermTypeID, Name, Definition) {
    this.TermTypeID = null;
    this.Name = null;
    this.Definition = null;
}

module.exports.AccountActivation = AccountActivation;

module.exports.Account = Account;

module.exports.AccountServiceOfferingDiscount = AccountServiceOfferingDiscount;

module.exports.BillingAddress = BillingAddress;

module.exports.CouponsAppliedToAccount = CouponsAppliedToAccount;

module.exports.CouponOffered = CouponOffered;

module.exports.CreditCard = CreditCard;

module.exports.Credit = Credit;

module.exports.InvoiceDiscountsApplied = InvoiceDiscountsApplied;

module.exports.InvoiceLineItem = InvoiceLineItem;

module.exports.Invoice = Invoice;

module.exports.ModuleInteraction = ModuleInteraction;

module.exports.ModuleView = ModuleView;

module.exports.Payment = Payment;

module.exports.SalesCallRequest = SalesCallRequest;

module.exports.SalesCallRequest = SalesCallRequest;

module.exports.SecurityUser = SecurityUser;

module.exports.ServiceOfferingAgreement = ServiceOfferingAgreement;

module.exports.ServiceOfferingAgreementSigned = ServiceOfferingAgreementSigned;

module.exports.ServiceOfferingBasePrice = ServiceOfferingBasePrice;

module.exports.ServiceOfferingDiscount = ServiceOfferingDiscount;

module.exports.ServiceOfferingEnlistment = ServiceOfferingEnlistment;

module.exports.ServiceOffering = ServiceOffering;

module.exports.ServiceOfferingSoftwareDownload = ServiceOfferingSoftwareDownload;

module.exports.ServiceOfferingSupportURL = ServiceOfferingSupportURL;

module.exports.ServiceOfferingUnitChargeType = ServiceOfferingUnitChargeType;

module.exports.SiteProblem = SiteProblem;

module.exports.SiteProblemsProcessed = SiteProblemsProcessed;

module.exports.TermType = TermType;

