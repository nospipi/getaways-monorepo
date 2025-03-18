import { model } from "mongoose";

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

const FileModel = model("file", fileSchema);
const UserModel = model("user", userSchema);
const VehicleModel = model("vehicle", vehicleSchema);
const AnnouncementModel = model("announcement", announcementSchema);
const TaskModel = model("task", taskSchema);
const UserDayScheduleModel = model("user_day_schedule", userDayScheduleSchema);
const BugReportModel = model("bug_report", bugReportSchema);
const AppVersionModel = model("app_version", appVersionSchema);
const GroupModel = model("group", groupSchema);
const RoleModel = model("role", roleSchema);
const RequestModel = model("request", requestSchema);
const ProductsModel = model("products", productsSchema);
const BookingModel = model("booking", bookingSchema);
const TourGroupModel = model("tour_group", tourGroupSchema);
const ChannelModel = model("channel", channelsSchema);
const MeetingPointModel = model("meeting_point", meetingPointSchema);
const NoteModel = model("note", noteSchema);
const CalendarNoteModel = model("calendar_note", calendarNoteSchema);
const NotificationModel = model("notification", notificationSchema);
const PwaPushSubscriptionModel = model(
  "pwa_push_subscription",
  PwaPushSubscriptionSchema
);
const G4STrackingSessionCredentialsModel = model(
  "g4s_tracking_session_credentials",
  g4sTrackingSessionCredentialsSchema
);

const PortalUserSessionModel = model(
  "portal_user_session",
  portalUserSessionSchema
);
const PortalOpenSessionModel = model(
  "portal_open_session",
  portalOpenSessionSchema
);
const PortalSessionModel = model("portal_session", portalSessionSchema);
const VehicleServiceLogEntryModel = model(
  "vehicle_service_log_entry",
  vehicleServiceLogEntrySchema
);
const BokunDataModel = model("bokun_data", bokunDataSchema);
const MessageDraftModel = model("message_draft", messageDraftSchema);
const TicketsAvailabilityModel = model(
  "tickets_availability",
  ticketsAvailabilitySchema
);
const AvailabilityToolVisitorModel = model(
  "availability_tool_visitor",
  availabilityToolVisitorSchema
);

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
