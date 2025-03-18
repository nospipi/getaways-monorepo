import mongoose from "mongoose";
const { Schema } = mongoose;

//----------------------------------------------------------------------------------

const bugReportSchema = new Schema({
  body: {
    type: String,
    required: [true, "You cannot publish an empty bug report"],
  },
  user: String,
  date: { type: Date, default: Date.now },
});

export default bugReportSchema;
