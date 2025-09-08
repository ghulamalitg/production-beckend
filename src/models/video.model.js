import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String, // URL of the thumbnail image from Cloudnariy
        required: true,
        default: null,
    },
    videoUrl:{
        type: String, // URL of the video from Cloudnariy
        required: true,
    },
    duration:{
        type: Number, // Duration in seconds
        required: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    views:{ 
        type: Number,
        default: 0,
    },
    isPublished:{
        type: Boolean,
        default: true,
    }
},{ timestamps: true });

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);