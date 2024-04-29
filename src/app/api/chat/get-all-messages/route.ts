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
  await dbConnect();
  // console.log("api hit get all messages ********");
  const { searchParams } = new URL(req.url);
  const chatRoomId = {
    chatRoomId: searchParams.get("chatroomid"),
  };
  // console.log(chatRoomId.chatRoomId)
  // console.log(searchParams)
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  try {
    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "user not Authenticated",
        },
        { status: 404 }
      );
    }
    // console.log("user finding chack ");
    const selectedChat = await ChatModel.findById(chatRoomId.chatRoomId!);

    // console.log("user found or not ", selectedChat);
    if (!selectedChat) {
      return Response.json(
        {
          success: false,
          message: "Chat doesnot exist",
        },
        { status: 404 }
      );
    }
    // add conditon only access own chat not other chat
    // if(!selectedChat.participants?.includes(new mongoose.Types.ObjectId(session.user._id!.toString()))){
    //   return Response.json({
    //     success:false,
    //     messages:"Uaser not part of this chat"
    //   },{status:400})
    // }
    const messages = await ChatMessageModel.aggregate([
      {
        $match: {
          chat: new mongoose.Types.ObjectId(chatRoomId.chatRoomId!),
        },
      },
      ...chatMessageCommonAggregation(),
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);
    const participate = await ChatModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(chatRoomId.chatRoomId!),
        },
      },
      {
        // lookup for the participants present
        $lookup: {
          from: "users",
          foreignField: "_id",
          localField: "participants",
          as: "participants",
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
    ]);
    // console.log(messages);
    return Response.json(
      {
        success: true,
        messages,
        participate,
        message: "Message Fetched successrully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("gating all message", error);
    return Response.json({
      success: false,
      message: "some server error in gating message",
    });
  }
}
