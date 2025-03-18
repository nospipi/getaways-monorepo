import mongoose from "mongoose";
const { Schema } = mongoose;
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


//--------------------------------------------------------------------------

const userDayScheduleSchema = new Schema(
  {
    date: { type: String },
    user: { type: String, required: true },
    isProjectedSchedule: { type: Boolean, default: true },
    tourGroups: {
      type: [
        {
          role: String, //role schema id
          id: String, //tourGroups schema id
          details: String,
        },
      ],
      default: [],
    },
    isDayOff: { type: Boolean, default: false },
    isLeave: { type: Boolean, default: false },
    isSeen: { type: Boolean, default: false },
    comments: [
      {
        text: String,
        date: String,
        user: String,
        author_id: String,
      },
    ],
  },
  {
    minimize: false,
  }
);

userDayScheduleSchema.plugin(mongoosePaginate);
userDayScheduleSchema.plugin(mongooseAggregatePaginate);

export default userDayScheduleSchema;
