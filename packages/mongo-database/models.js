import { model, models } from "mongoose";

//-----------------------------------------------------------------

import fileSchema from "./schemas/fileSchema.js";
import userSchema from "./schemas/userSchema.js";
import vehicleSchema from "./schemas/vehicleSchema.js";
import announcementSchema from "./schemas/announcementSchema.js";
import taskSchema from "./schemas/taskSchema.js";
import userDayScheduleSchema from "./schemas/userDayScheduleSchema.js";
import bugReportSchema from "./schemas/bugReportSchema.js";
import appVersionSchema from "./schemas/appVersionSchema.js";
import groupSchema from "./schemas/groupSchema.js";
import roleSchema from "./schemas/roleSchema.js";
import requestSchema from "./schemas/requestSchema.js";
import productsSchema from "./schemas/productsSchema.js";
import bookingSchema from "./schemas/bookingSchema.js";
import tourGroupSchema from "./schemas/tourGroupSchema.js";
import channelsSchema from "./schemas/channelsSchema.js";
import meetingPointSchema from "./schemas/meetingPointSchema.js";
import noteSchema from "./schemas/noteSchema.js";
import calendarNoteSchema from "./schemas/calendarNoteSchema.js";
import notificationSchema from "./schemas/notificationSchema.js";
import PwaPushSubscriptionSchema from "./schemas/PwaPushSubscriptionSchema.js";
import g4sTrackingSessionCredentialsSchema from "./schemas/g4sTrackingSessionCredentialsSchema.js";
import portalUserSessionSchema from "./schemas/portalUserSessionSchema.js";
import portalOpenSessionSchema from "./schemas/portalOpenSessionSchema.js";
import portalSessionSchema from "./schemas/portalSessionSchema.js";
import vehicleServiceLogEntrySchema from "./schemas/vehicleServiceLogEntrySchema.js";
import bokunDataSchema from "./schemas/bokunDataSchema.js";
import messageDraftSchema from "./schemas/messageDraftSchema.js";
import ticketsAvailabilitySchema from "./schemas/ticketsAvailabilitySchema.js";
import availabilityToolVisitorSchema from "./schemas/availabilityToolVisitorSchema.js";
//----------------------------------------------------------------------------

const FileModel = models.file || model("file", fileSchema);
const UserModel = models.user || model("user", userSchema);
const VehicleModel = models.vehicle || model("vehicle", vehicleSchema);
const AnnouncementModel =
  models.announcement || model("announcement", announcementSchema);
const TaskModel = models.task || model("task", taskSchema);
const UserDayScheduleModel =
  models.user_day_schedule || model("user_day_schedule", userDayScheduleSchema);
const BugReportModel =
  models.bug_report || model("bug_report", bugReportSchema);
const AppVersionModel =
  models.app_version || model("app_version", appVersionSchema);
const GroupModel = models.group || model("group", groupSchema);
const RoleModel = models.role || model("role", roleSchema);
const RequestModel = models.request || model("request", requestSchema);
const ProductsModel = models.products || model("products", productsSchema);
const BookingModel = models.booking || model("booking", bookingSchema);
const TourGroupModel =
  models.tour_group || model("tour_group", tourGroupSchema);
const ChannelModel = models.channel || model("channel", channelsSchema);
const MeetingPointModel =
  models.meeting_point || model("meeting_point", meetingPointSchema);
const NoteModel = models.note || model("note", noteSchema);
const CalendarNoteModel =
  models.calendar_note || model("calendar_note", calendarNoteSchema);
const NotificationModel =
  models.notification || model("notification", notificationSchema);
const PwaPushSubscriptionModel =
  models.pwa_push_subscription ||
  model("pwa_push_subscription", PwaPushSubscriptionSchema);
const G4STrackingSessionCredentialsModel =
  models.g4s_tracking_session_credentials ||
  model(
    "g4s_tracking_session_credentials",
    g4sTrackingSessionCredentialsSchema
  );

const PortalUserSessionModel =
  models.portal_user_session ||
  model("portal_user_session", portalUserSessionSchema);
const PortalOpenSessionModel =
  models.portal_open_session ||
  model("portal_open_session", portalOpenSessionSchema);
const PortalSessionModel =
  models.portal_session || model("portal_session", portalSessionSchema);
const VehicleServiceLogEntryModel =
  models.vehicle_service_log_entry ||
  model("vehicle_service_log_entry", vehicleServiceLogEntrySchema);
const BokunDataModel =
  models.bokun_data || model("bokun_data", bokunDataSchema);
const MessageDraftModel =
  models.message_draft || model("message_draft", messageDraftSchema);
const TicketsAvailabilityModel =
  models.tickets_availability ||
  model("tickets_availability", ticketsAvailabilitySchema);
const AvailabilityToolVisitorModel =
  models.availability_tool_visitor ||
  model("availability_tool_visitor", availabilityToolVisitorSchema);

//----------------------------------------------------------------------------

export {
  FileModel,
  UserModel,
  VehicleModel,
  AnnouncementModel,
  TaskModel,
  UserDayScheduleModel,
  BugReportModel,
  AppVersionModel,
  GroupModel,
  RoleModel,
  RequestModel,
  ProductsModel,
  BookingModel,
  TourGroupModel,
  ChannelModel,
  MeetingPointModel,
  NoteModel,
  CalendarNoteModel,
  NotificationModel,
  PwaPushSubscriptionModel,
  G4STrackingSessionCredentialsModel,
  PortalUserSessionModel,
  PortalOpenSessionModel,
  PortalSessionModel,
  VehicleServiceLogEntryModel,
  BokunDataModel,
  MessageDraftModel,
  TicketsAvailabilityModel,
  AvailabilityToolVisitorModel,
};
