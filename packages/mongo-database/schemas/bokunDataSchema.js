import mongoose from "mongoose";
import moment from "moment";
const { Schema } = mongoose;

//------------------------------------------------------------------------

const bokunDataSchema = new Schema({
  action: String,
  ref: String,
  data: {
    type: Schema.Types.Mixed, // Allows any data type
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD HH:mm:ss"),
  },
});

export default bokunDataSchema;
