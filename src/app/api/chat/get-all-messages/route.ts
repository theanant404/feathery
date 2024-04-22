import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User, getServerSession } from "next-auth";
import UserModel from "@/models/User.model";
import ChatModel from "@/models/Chat.model";
import mongoose from "mongoose";
import ChatMessageModel from "@/models/ChatMessage.model";

const chatMessageCommonAggregation = () => {
    return [
      {
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "sender",
          as: "sender",
          pipeline: [
            {
              $project: {
                username: 1,
                avatar: 1,
                email: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          sender: { $first: "$sender" },
        },
      },
    ];
  };

export async function GET(req: Request) {
    await dbConnect()
    console.log('api hit')
    const {searchParams} =new URL(req.url)
    const chatRoomId={
        chatRoomId:searchParams.get('chatroomid')
    }
    // console.log(chatRoomId.chatRoomId)
    // console.log(searchParams)
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'user not Authenticated'
        }, { status: 404 })
    }
    const selectedChat=await ChatModel.findById(chatRoomId.chatRoomId!)
    if(!selectedChat){
        return Response.json({
            success:false,
            message:"Chat doesnot exist"
        },{status:404})
    }
    // add conditon only access own chat not oter chat
    // if(!selectedChat.participants?.includes(session.user._id!.toString())){

    // }
    const messages=await ChatMessageModel.aggregate([
        {
            $match:{
                chat:new mongoose.Types.ObjectId(chatRoomId.chatRoomId!),
            },
        },
        ...chatMessageCommonAggregation(),
        {
            $sort:{
                createdAt:-1,
            },
        },
    ]);
    console.log(messages)
    return Response.json({
        success:true,
        messages,
        message:"Message Fetched successrully",
    },{status:200})
    
}