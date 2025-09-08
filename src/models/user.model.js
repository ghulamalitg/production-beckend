import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index : true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    }, 
    fullname:{
        type: String,
        required: true,
        trim: true,
        index : true,
    },  
        password:{
        type: String,
        required: [true , "Password is required"],
        trim: true,
        minlength: 8,
        },
        refreshToken:{
            type: String,
        },
        avatar:{
            type: String, // URL of the avatar image from Cloudnariy
            default: null,
            required: true,
        },
        coverimage:{
            type: String, // URL of the cover image from Cloudnariy
            default: null,
        },
        watchhistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            }
        ]
        },{ timestamps: true });


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password , 10);
    next();
});

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);