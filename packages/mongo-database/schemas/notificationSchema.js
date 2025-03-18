import mongoose from "mongoose";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";

//---------------------------------------------------------------------------

const notificationSchema = new Schema({
  title: { type: String, required: true },
  body: String,
  date: { type: Date, default: Date.now },
  data: {
    type: Object,
    default: {
      type: { type: String, default: "" },
    },
  },
});
notificationSchema.plugin(mongoosePaginate);

export default notificationSchema;
