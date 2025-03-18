import mongoose from "mongoose";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
//------------------------------------------------------------------------

const fileSchema = new Schema({
  name: String, // The original file name
  description: String, // File description
  type: String, // MIME type (e.g., image/jpeg, application/pdf)
  size: Number, // File size in bytes
  data: String, // Base64-encoded binary data
});

fileSchema.plugin(mongoosePaginate);
fileSchema.plugin(mongooseAggregatePaginate);

//------------------------------------------------------------------------

export default fileSchema;
