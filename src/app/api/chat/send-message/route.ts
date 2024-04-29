import dbConnect from "@/lib/dbConnect";
import ChatModel from "@/models/Chat.model";
import ChatMessageModel from "@/models/ChatMessage.model";
import UserModel from "@/models/User.model";
import { Message } from "@/models/User.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
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
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  await dbConnect();
  const { chatroomId, msgData} = await req.json();
  const ChatRoomId: string = chatroomId;
  // console.log(chatroomId,msgData)
  try {
    if (!msgData) {
      return Response.json({
        success: false,
        message: "Message content is empiyt",
      });
    }
    const selectedChat = await ChatModel.findById(chatroomId);
    if (!selectedChat) {
      return Response.json(
        {
          success: false,
          message: "Chat does not exit",
        },
        { status: 404 }
      );
    }
    const Message = await ChatMessageModel.create({
      sender: new mongoose.Types.ObjectId(session?.user._id!.toString()),
      content: msgData.content || "",
      chat: new mongoose.Types.ObjectId(ChatRoomId),
    });
    // console.log(Message)
    const chat = await ChatModel.findByIdAndUpdate(
      ChatRoomId,
      {
        $set: {
          lastMessage: Message._id,
        },
      },
      { new: true }
    );
    // structure of messages
    const messages = await ChatMessageModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(Message._id),
        },
      },
      ...chatMessageCommonAggregation(),
    ]);
    const receivedMessage = messages[0];
    // console.log(receivedMessage)
    if (!receivedMessage) {
      return Response.json(
        {
          success: false,
          message: "Intername server error form storing aggreation result",
        },
        { status: 500 }
      );
    }
    // chat?.participants.forEach((participantObjectId:any)=>{
    //   if(participantObjectId.toString()===session?.user._id)return;
    //   emitSocketEvent(
    //     session,
    //     participantObjectId.toString(),
    //     ChatEventEnum.MESSAGE_RECEIVED_EVENT,
    //     receivedMessage
    //   )
    // })
    return Response.json(
      {
        success: true,
        receivedMessage,
        message: "message sverd success fully ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("unexpacted error during sending message", error);
    return Response.json(
      {
        success: false,
        message: "errror during send message",
      },
      { status: 500 }
    );
  }
}
