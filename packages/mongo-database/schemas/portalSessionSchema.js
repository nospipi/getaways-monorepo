import mongoose from "mongoose";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


//------------------------------------------------------------------------------

const userActionEnum = [
  "PAGE_VISIT",
  "PAGE_LEAVE",
  "SCROLLED_TO_BOTTOM",
  "REVIEW_LINK_CLICK",
  "PROMO_PRODUCT_CLICK",
  "SIM_LINK_CLICK",
  "ADDED_LOCATION",
  "CONFIRMED_INSTRUCTIONS",
  "BUS_TRACKING_MAP_CLICK",
  "NAVIGATION_LINK_CLICK",
  "CONTACT_BUTTON_CLICK",
  "SESSION_STARTED", //deprecated
  "SESSION_CLOSED_BY_USER", //deprecated
  "SESSION_CLOSED_BY_TIMEOUT", //deprecated
  "VISIT_REVIEW_LINK", //deprecated
  "PROMO_PAGE_VISIT", //deprecated
  "VISIT_SIM_LINK", //deprecated
];

const portalSessionActionDataSchema = new Schema({
  clickedPromoProductId: String,
});

const portalActionSchema = new Schema({
  date_time: { type: Date, default: Date.now },
  platform: String,
  osName: String,
  osVersion: String,
  browserName: String,
  browserVersion: String,
  mobileVendor: String,
  mobileModel: String,
  user_action: { type: String, enum: userActionEnum, required: true },
  data: portalSessionActionDataSchema,
});

const portalSessionSchema = new Schema({
  first_visit_date_time: { type: Date, default: Date.now },
  last_action: { type: String },
  last_action_date_time: { type: Date, default: Date.now },
  actions_count: { type: Number, default: 0 },
  booking_ref: { type: String, required: true },
  has_scrolled_to_bottom: { type: Boolean, default: false },
  has_clicked_review_link: { type: Boolean, default: false },
  has_clicked_promo_product: { type: Boolean, default: false },
  has_clicked_sim_link: { type: Boolean, default: false },
  has_added_location: { type: Boolean, default: false },
  has_confirmed_instructions: { type: Boolean, default: false },
  has_clicked_bus_tracking_map: { type: Boolean, default: false },
  has_clicked_navigation_link: { type: Boolean, default: false },
  has_clicked_contact_button: { type: Boolean, default: false },
  session_actions: { type: [portalActionSchema], default: [] },
});

portalSessionSchema.index({ last_action_date_time: -1 });
portalSessionSchema.index({ booking_ref: 1 }, { unique: true });
portalSessionSchema.index({ has_scrolled_to_bottom: 1 });
portalSessionSchema.index({ has_clicked_review_link: 1 });
portalSessionSchema.index({ has_clicked_promo_product: 1 });
portalSessionSchema.index({ has_clicked_sim_link: 1 });
portalSessionSchema.index({ has_added_location: 1 });
portalSessionSchema.index({ has_confirmed_instructions: 1 });
portalSessionSchema.index({ has_clicked_bus_tracking_map: 1 });
portalSessionSchema.index({ has_clicked_navigation_link: 1 });
portalSessionSchema.index({ has_clicked_contact_button: 1 });

portalSessionSchema.plugin(mongoosePaginate);
portalSessionSchema.plugin(mongooseAggregatePaginate);

export default portalSessionSchema;
