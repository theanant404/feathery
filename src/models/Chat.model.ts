import mongoose,{Schema,Document} from "mongoose";


export interface Chat{
    name:string,
    isGroupChat:boolean,
    lastMessage:{},
    participants:[],
    admin:{};
}

const ChatSchema:Schema<Chat>=new Schema({
    name:{
        type:String,
        required:true,
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    lastMessage:{
        type:Schema.Types.ObjectId,
        ref:"ChatMessageModel"
    },
    participants: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    admin:{
        type:Schema.Types.ObjectId,
        ref:"UserModel"
    }
},{timestamps:true})

const ChatModel=(mongoose.models.Chat as mongoose.Model<Chat>)||(mongoose.model<Chat>("Chat",ChatSchema))
export default ChatModel;