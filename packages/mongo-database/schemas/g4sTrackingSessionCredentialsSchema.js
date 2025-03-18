import mongoose from "mongoose";
const { Schema } = mongoose;


//------------------------------------------------------------------------

const g4sTrackingSessionCredentialsSchema = new Schema({
  username: String,
  password: String,
  UserIdGuid: String,
  SessionId: String,
});

export default g4sTrackingSessionCredentialsSchema;
