import mongoose from "mongoose";
const { Schema } = mongoose;

//-------------------------------------------------------------------------

const PwaPushSubscriptionSchema = new Schema({
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String,
  },
});

export default PwaPushSubscriptionSchema;
