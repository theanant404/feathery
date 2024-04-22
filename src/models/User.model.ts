import mongoose,{Schema,Document} from "mongoose";


export interface Message{
    content:string;
    createdAt:Date
}
export interface Image{
    Url:string;
    publicId:string
}

const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})
const ImageSchema:Schema<Image>=new Schema({
    Url:{
        type:String,
    },
    publicId:{
        type:String,
    }
})
export interface User{
    fullname:string,
    username:string;
    email:string;
    password:string;
    bio:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    isVerified:boolean,
    image:Image[],
    message:Message[],
    followers:{},
    following:{},
}

const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+\@.+\..+/,'Please Provide a valid email'],
    },
    password:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
    },
    verifyCode:{
        type:String,
        // required:true
    },
    verifyCodeExpiry:{
        type:Date,
        // required:true,    
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
      }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
      }],
    message:[MessageSchema],
    image:[ImageSchema],
})

const UserModel=(mongoose.models.User as mongoose.Model<User>)||(mongoose.model<User>("User",UserSchema))

export default UserModel;