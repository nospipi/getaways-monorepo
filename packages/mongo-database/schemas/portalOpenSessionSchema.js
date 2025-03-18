import mongoose from "mongoose";
const { Schema } = mongoose;

//------------------------------------------------------------------------------

const portalOpenSessionSchema = new Schema({
  booking_ref: { type: String, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 300, //this will delete the document after 5 minutes (300s) if it still exists
  },
});

export default portalOpenSessionSchema;
