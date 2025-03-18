import mongoose from "mongoose";
const { Schema } = mongoose;

//------------------------------------------------------------------------

const availabilityToolVisitorSchema = new Schema({
  ip: String,
  city: String,
  country: String,
  latitude: String,
  longitude: String,
  region: String,
  timestamp: String,
});

export default availabilityToolVisitorSchema;
