import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User, getServerSession } from "next-auth";
import UserModel from "@/models/User.model";
import ChatModel from "@/models/Chat.model";
import mongoose from "mongoose";


const chatCommonAggregation = () => {
    return [
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
                            password: 0,
                            verifyCode: 0,
                            verifyCodeExpiry: 0,
                        },
                    },
                ],
            },
        },
        {
            // lookup for the group chats
            $lookup: {
                from: "chatmessages",
                foreignField: "_id",
                localField: "lastMessage",
                as: "lastMessage",
                pipeline: [
                    {
                        // get details of the sender
                        $lookup: {
                            from: "users",
                            foreignField: "_id",
                            localField: "sender",
                            as: "sender",
                            pipeline: [
                                {
                                    $project: {
                                        fullname: 1,
                                        username: 1,
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
                ],
            },
        },
        {
            $addFields: {
                lastMessage: { $first: "$lastMessage" },
            },
        },
    ];
};

export async function POST(req: Request) {

    await dbConnect()

    const reciverUser = await req.json()
    const receiverId: string = reciverUser.userId;
    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'user not Authenticated'
        }, { status: 404 })
    }

    try {
        if (receiverId === session.user._id?.toString()) {
            return Response.json({
                success: false,
                message: "you can't chat yourself"
            })
        }
        const receiver = await UserModel.findById(receiverId);
        // console.log('receiver is :-',receiver)
        if (!receiver) {
            return Response.json({
                success: false,
                message: "User not avlale for chat"
            })
        }
        console.log("login session:-",session.user._id)
        console.log("resiver id is:-",receiverId)
        const chat = await ChatModel.aggregate([
            {
                // $match: {
                //     isGroupChat: false, // avoid group chats. This controller is responsible for one on one chats
                //     // Also, filter chats with participants having receiver and logged in user only
                //     $and: [
                //         {
                //             participants: { $elemMatch: { $eq: session.user._id! } },
                //         },
                //         {
                //             participants: {
                //                 $elemMatch: { $eq: new mongoose.Types.ObjectId(receiverId) },
                //             },
                //         },
                //     ],
                // },
                $match: {
                    admin: new mongoose.Types.ObjectId(receiverId), // Match the chat room by its ID
                    participants: {
                      $in: [new mongoose.Types.ObjectId(session.user._id)] // Check if the user ID is present in the participants array
                    }
                  }
            },
            ...chatCommonAggregation(),
        ]);
        // console.log("chat is:-",chat)
        // console.log(chat.length)
        if (chat.length) {
            // if we find the chat that means user already has created a chat
            return Response.json({
                success: true,
                chat,
                message: "Chat Retriverd successcully",

            }, { status: 200 })

        }
        // if not we need to create a new one on one chat


        const newChatInstance = await ChatModel.create({
            name: "One on one chat",
            participants: [session.user._id!, new mongoose.Types.ObjectId(receiverId)], // add receiver and logged in user as participants
            admin: session.user._id!,
        });
        // console.log("New chat INstance is:-", newChatInstance)



        // structure the chat as per the common aggregation to keep the consistency
        const createdChat = await ChatModel.aggregate([
            {
                $match: {
                    _id: newChatInstance._id,
                },
            },
            ...chatCommonAggregation(),
        ]);

        const payload = createdChat[0]; // store the aggregation result

        console.log("payload is:-",payload)
        if (!payload) {
            return Response.json({
                message: "internal server",
                success: false,
            }, { status: 400 })
        }

        // logic to emit socket event about the new chat added to the participants
        payload?.participants?.forEach((participant: any) => {
            if (participant._id.toString() === session.user._id!) return; // don't emit the event for the logged in use as he is the one who is initiating the chat

            // emit event to other participants with new chat as a payload
            // emitSocketEvent(
            //   session,
            //   participant._id?.toString(),
            //   ChatEventEnum.NEW_CHAT_EVENT,
            //   payload
            // );
        });

        return Response.json({
            success: true,
            message: "Chat Rettieved successfully",
        }, { status: 201 })



    } catch (error: any) {
        return Response.json({
            success: false,
            message: "some error during crestatin one to one chat"
        }, { status: 500 })
    }
}