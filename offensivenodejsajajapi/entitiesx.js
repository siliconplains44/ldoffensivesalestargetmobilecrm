function Activity (ActivityID, SecurityUserID, CampaignID, Created, Started, DurationInHours, Description, AttachedToObjectTypeID, AttachedToObjectID, IsDeleted, ActivityTypeID, ActivityTypeCustomName) {
    this.ActivityID = null;
    this.SecurityUserID = null;
    this.CampaignID = null;
    this.Created = null;
    this.Started = null;
    this.DurationInHours = null;
    this.Description = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.IsDeleted = null;
    this.ActivityTypeID = null;
    this.ActivityTypeCustomName = null;
}

function ActivityType (ActivityTypeID, Name) {
    this.ActivityTypeID = null;
    this.Name = null;
}

function Address (AddressID, AttachedToObjectTypeID, AttachedToObjectID, Name, Line1, Line2, City, State, Zip, Country, Type, IsDeleted) {
    this.AddressID = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.Name = null;
    this.Line1 = null;
    this.Line2 = null;
    this.City = null;
    this.State = null;
    this.Zip = null;
    this.Country = null;
    this.Type = null;
    this.IsDeleted = null;
}

function AttachedToObjectType (AttachedToObjectTypeID, Name) {
    this.AttachedToObjectTypeID = null;
    this.Name = null;
}

function Attachment (AttachmentID, Name, Description, Filename, ExternalFileID, AttachedToObjectTypeID, AttachedToObjectID, FileSizeInBytes, UploadCompleted, Created, IsDeleted, PurgeCompleted) {
    this.AttachmentID = null;
    this.Name = null;
    this.Description = null;
    this.Filename = null;
    this.ExternalFileID = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.FileSizeInBytes = null;
    this.UploadCompleted = null;
    this.Created = null;
    this.IsDeleted = null;
    this.PurgeCompleted = null;
}

function BusinessObjectMap (BusinessObjectMapID, FromObjectTypeID, FromObjectID, ToObjectTypeID, ToObjectID) {
    this.BusinessObjectMapID = null;
    this.FromObjectTypeID = null;
    this.FromObjectID = null;
    this.ToObjectTypeID = null;
    this.ToObjectID = null;
}

function CalendarEvent (CalendarEventID, Title, StartDateTime, EndDateTime, Location, Description, Color, SecurityUserID, IsDeleted, AttachedToObjectTypeID, AttachedToObjectID) {
    this.CalendarEventID = null;
    this.Title = null;
    this.StartDateTime = null;
    this.EndDateTime = null;
    this.Location = null;
    this.Description = null;
    this.Color = null;
    this.SecurityUserID = null;
    this.IsDeleted = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
}

function Campaign (CampaignID, StartDate, Name, Description, EndDate, TeamID, IsDeleted, Created) {
    this.CampaignID = null;
    this.StartDate = null;
    this.Name = null;
    this.Description = null;
    this.EndDate = null;
    this.TeamID = null;
    this.IsDeleted = null;
    this.Created = null;
}

function DataTransferLogEntry (DataTransferLogEntryId, SecurityUserId, IsDownload, TransferInBytes, TransferDate) {
    this.DataTransferLogEntryId = null;
    this.SecurityUserId = null;
    this.IsDownload = null;
    this.TransferInBytes = null;
    this.TransferDate = null;
}

function Deal (DealID, SalesTargetID, ProductOrService, ClosedDate, IsEstimate, TimeFrameTypeID, Amount, Notes, IsDeleted, Created) {
    this.DealID = null;
    this.SalesTargetID = null;
    this.ProductOrService = null;
    this.ClosedDate = null;
    this.IsEstimate = null;
    this.TimeFrameTypeID = null;
    this.Amount = null;
    this.Notes = null;
    this.IsDeleted = null;
    this.Created = null;
}

function EmailAddress (EmailAddressID, Type, Address, AttachedToObjectTypeID, AttachedToObjectID, IsDeleted) {
    this.EmailAddressID = null;
    this.Type = null;
    this.Address = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.IsDeleted = null;
}

function Expense (ExpenseID, Name, Description, SecurityUserID, Created, AttachedToObjectTypeID, AttachedToObjectID, Amount, IsReimbursed, IsDeleted) {
    this.ExpenseID = null;
    this.Name = null;
    this.Description = null;
    this.SecurityUserID = null;
    this.Created = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.Amount = null;
    this.IsReimbursed = null;
    this.IsDeleted = null;
}

function Handle (HandleID, Name, SecurityUserID) {
    this.HandleID = null;
    this.Name = null;
    this.SecurityUserID = null;
}

function Individual (IndividualID, LastName, MiddleName, FirstName, Birthday, AttachedToObjectTypeID, AttachedToObjectID, Created, IsDeleted) {
    this.IndividualID = null;
    this.LastName = null;
    this.MiddleName = null;
    this.FirstName = null;
    this.Birthday = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.Created = null;
    this.IsDeleted = null;
}

function InstantMessageAccount (InstantMessageAccountID, Type, Handle, AttachedToObjectTypeID, AttachedToObjectID, IsDeleted) {
    this.InstantMessageAccountID = null;
    this.Type = null;
    this.Handle = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.IsDeleted = null;
}

function MileageLogEntry (MileageLogEntryID, Created, Occurred, Description, SecurityUserID, StartingMileage, EndingMileage, IsReimbursed, IsDeleted) {
    this.MileageLogEntryID = null;
    this.Created = null;
    this.Occurred = null;
    this.Description = null;
    this.SecurityUserID = null;
    this.StartingMileage = null;
    this.EndingMileage = null;
    this.IsReimbursed = null;
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

function Note (NoteID, AttachedToObjectTypeID, AttachedToObjectID, Created, Modified, Content, IsDeleted) {
    this.NoteID = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.Created = null;
    this.Modified = null;
    this.Content = null;
    this.IsDeleted = null;
}

function Organization (OrganizationID, Name, Created, Type) {
    this.OrganizationID = null;
    this.Name = null;
    this.Created = null;
    this.Type = null;
}

function PhoneNumber (PhoneNumberID, Type, Number, AttachedToObjectTypeID, AttachedToObjectID, IsDeleted) {
    this.PhoneNumberID = null;
    this.Type = null;
    this.Number = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.IsDeleted = null;
}

function QueryDate (QueryDateID, Year, Month, Day, Week, QueryDate) {
    this.QueryDateID = null;
    this.Year = null;
    this.Month = null;
    this.Day = null;
    this.Week = null;
    this.QueryDate = null;
}

function Quote (QuoteID, SalesTargetID, ProductOrService, SentDate, Created, IsDeleted, TimeFrameTypeID, Amount, Notes) {
    this.QuoteID = null;
    this.SalesTargetID = null;
    this.ProductOrService = null;
    this.SentDate = null;
    this.Created = null;
    this.IsDeleted = null;
    this.TimeFrameTypeID = null;
    this.Amount = null;
    this.Notes = null;
}

function RevenueEntry (RevenueEntryID, SalesTargetID, Amount, Created, Notes, PeriodYear, PeriodMonth, IsDeleted) {
    this.RevenueEntryID = null;
    this.SalesTargetID = null;
    this.Amount = null;
    this.Created = null;
    this.Notes = null;
    this.PeriodYear = null;
    this.PeriodMonth = null;
    this.IsDeleted = null;
}

function SalesTarget (SalesTargetID, Name, SecurityUserID, SalesTargetStageID, Created, TeamID, IsDeleted) {
    this.SalesTargetID = null;
    this.Name = null;
    this.SecurityUserID = null;
    this.SalesTargetStageID = null;
    this.Created = null;
    this.TeamID = null;
    this.IsDeleted = null;
}

function SalesTargetSecurityUser (SalesTargetSecurityUserID, SalesTargetID, SecurityUserID) {
    this.SalesTargetSecurityUserID = null;
    this.SalesTargetID = null;
    this.SecurityUserID = null;
}

function SalesTargetShare (SalesTargetShareID, SecurityUserID, SalesTargetID) {
    this.SalesTargetShareID = null;
    this.SecurityUserID = null;
    this.SalesTargetID = null;
}

function SalesTargetStageChangeLogEntry (SalesTargetStageChangeLogEntryID, SalesTargetID, SalesTargetStageFromID, SalesTargetStageToID, Occurred, ChangedBySecurityUserID, CampaignID, TeamID) {
    this.SalesTargetStageChangeLogEntryID = null;
    this.SalesTargetID = null;
    this.SalesTargetStageFromID = null;
    this.SalesTargetStageToID = null;
    this.Occurred = null;
    this.ChangedBySecurityUserID = null;
    this.CampaignID = null;
    this.TeamID = null;
}

function SalesTargetStage (SalesTargetStageID, Name) {
    this.SalesTargetStageID = null;
    this.Name = null;
}

function SalesTargetType (SalesTargetTypeID, Name) {
    this.SalesTargetTypeID = null;
    this.Name = null;
}

function SecurityUser (SecurityUserId, ExternalSecurityUserId, IsEnabled) {
    this.SecurityUserId = null;
    this.ExternalSecurityUserId = null;
    this.IsEnabled = null;
}

function Setting (SettingID, Name, Value) {
    this.SettingID = null;
    this.Name = null;
    this.Value = null;
}

function TeamJoinRequest (TeamJoinRequestID, SecurityUserID, TeamID, RequestAuthorized, RequestAuthorizedBySecurityUserID) {
    this.TeamJoinRequestID = null;
    this.SecurityUserID = null;
    this.TeamID = null;
    this.RequestAuthorized = null;
    this.RequestAuthorizedBySecurityUserID = null;
}

function TeamLead (TeamLeadID, TeamMemberID, TeamID, IsDeleted) {
    this.TeamLeadID = null;
    this.TeamMemberID = null;
    this.TeamID = null;
    this.IsDeleted = null;
}

function TeamMember (TeamMemberID, TeamID, SecurityUserID, Created, IsActive, IsDeleted) {
    this.TeamMemberID = null;
    this.TeamID = null;
    this.SecurityUserID = null;
    this.Created = null;
    this.IsActive = null;
    this.IsDeleted = null;
}

function Team (TeamID, OrganizationID, Name, Created, IsDeleted) {
    this.TeamID = null;
    this.OrganizationID = null;
    this.Name = null;
    this.Created = null;
    this.IsDeleted = null;
}

function TimeFrameType (TimeFrameTypeID, Name) {
    this.TimeFrameTypeID = null;
    this.Name = null;
}

function Uri (UriID, Type, Identifier, AttachedToObjectTypeID, AttachedToObjectID, IsDeleted, Created) {
    this.UriID = null;
    this.Type = null;
    this.Identifier = null;
    this.AttachedToObjectTypeID = null;
    this.AttachedToObjectID = null;
    this.IsDeleted = null;
    this.Created = null;
}

module.exports.Activity = Activity;

module.exports.ActivityType = ActivityType;

module.exports.Address = Address;

module.exports.AttachedToObjectType = AttachedToObjectType;

module.exports.Attachment = Attachment;

module.exports.BusinessObjectMap = BusinessObjectMap;

module.exports.CalendarEvent = CalendarEvent;

module.exports.Campaign = Campaign;

module.exports.DataTransferLogEntry = DataTransferLogEntry;

module.exports.Deal = Deal;

module.exports.EmailAddress = EmailAddress;

module.exports.Expense = Expense;

module.exports.Handle = Handle;

module.exports.Individual = Individual;

module.exports.InstantMessageAccount = InstantMessageAccount;

module.exports.MileageLogEntry = MileageLogEntry;

module.exports.ModuleInteraction = ModuleInteraction;

module.exports.ModuleView = ModuleView;

module.exports.Note = Note;

module.exports.Organization = Organization;

module.exports.PhoneNumber = PhoneNumber;

module.exports.QueryDate = QueryDate;

module.exports.Quote = Quote;

module.exports.RevenueEntry = RevenueEntry;

module.exports.SalesTarget = SalesTarget;

module.exports.SalesTargetSecurityUser = SalesTargetSecurityUser;

module.exports.SalesTargetShare = SalesTargetShare;

module.exports.SalesTargetStageChangeLogEntry = SalesTargetStageChangeLogEntry;

module.exports.SalesTargetStage = SalesTargetStage;

module.exports.SalesTargetType = SalesTargetType;

module.exports.SecurityUser = SecurityUser;

module.exports.Setting = Setting;

module.exports.TeamJoinRequest = TeamJoinRequest;

module.exports.TeamLead = TeamLead;

module.exports.TeamMember = TeamMember;

module.exports.Team = Team;

module.exports.TimeFrameType = TimeFrameType;

module.exports.Uri = Uri;

