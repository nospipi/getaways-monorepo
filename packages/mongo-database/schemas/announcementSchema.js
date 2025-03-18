import mongoose from "mongoose";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

//-------------------------------------------------------------------------------

const announcementSchema = new Schema({
  title: { type: String, required: true },
  body: {
    type: String,
    required: [true, "You cannot publish an empty announcement"],
    minlength: [10, "Announcements must have more than 10 characters"],
  },
  date: { type: Date, default: Date.now },
  critical: { type: Boolean, required: true },
  pinned: { type: Boolean, default: false },
  author: { type: String, required: true },
});

announcementSchema.plugin(mongoosePaginate);

export default announcementSchema;
