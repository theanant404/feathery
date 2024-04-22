

import mongoose,{Schema,Document} from "mongoose";

export interface ChatMessage{
    sender:{},
    content:{},
    attachments:{},
    chat:{},
}

const ChatMessageSchema:Schema<ChatMessage>=new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"UserModel",
    },
    content:{
        type:String,
    },
    attachments:{
        type:[
            {
                url:String,
                localPath:String
            },
        ],
        default:[]
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"ChatModel"
    }
},{timestamps:true})

const ChatMessageModel=(mongoose.models.ChatMessage as mongoose.Model<ChatMessage>)||(mongoose.model<ChatMessage>("ChatMessage",ChatMessageSchema))

export default ChatMessageModel;