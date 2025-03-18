import mongoose from "mongoose";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

//------------------------------------------------------------------------

const vehicleServiceLogEntrySchema = new Schema({
  vehicle_id: String,
  assignee: String,
  workshop: String,
  date: String,
  odometer: String,
  cost: String,
  repairs: [String],
  notes: String,
});
vehicleServiceLogEntrySchema.plugin(mongoosePaginate);

export default vehicleServiceLogEntrySchema;
