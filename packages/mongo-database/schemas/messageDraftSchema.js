import mongoose from "mongoose";
const { Schema } = mongoose;

//------------------------------------------------------------------------

const messageDraftSchema = new Schema({
  title: String,
  body: String,
});

export default messageDraftSchema;
