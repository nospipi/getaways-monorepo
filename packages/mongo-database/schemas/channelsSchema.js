import mongoose from "mongoose";
const { Schema } = mongoose;
//--------------------------------------------------------------------

const channelsSchema = new Schema({
  title: { type: String, required: true },
  commission_rate: { type: Number, required: true, default: 0 },
});

export default channelsSchema;
