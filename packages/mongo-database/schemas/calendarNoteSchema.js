import mongoose from "mongoose";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//------------------------------------------------------------------------

const calendarNoteSchema = new Schema({
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  date: String,
  author_id: { type: String, required: true },
  public: { type: Boolean, default: false },
});
calendarNoteSchema.plugin(mongoosePaginate);
calendarNoteSchema.plugin(mongooseAggregatePaginate);

export default calendarNoteSchema;
