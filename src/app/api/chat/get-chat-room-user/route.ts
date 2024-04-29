import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import { User, getServerSession } from "next-auth";
import UserModel from "@/models/User.model";
import ChatModel from "@/models/Chat.model";
import mongoose from "mongoose";



export async function GET(req: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)
    const users: User = session?.user as User
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: 'user not Authenticated'
        }, { status: 404 })
    }
    const userId = new mongoose.Types.ObjectId(users._id);
    // console.log( "user id from showing user.",userId)
    try {
        const user = await ChatModel.aggregate([
            { $match: {
                // admin: new mongoose.Types.ObjectId(users._id), // Match the chat room by its ID
                participants: {
                  $in: [new mongoose.Types.ObjectId(users._id)] // Check if the user ID is present in the participants array
                }
              } },
            { $sort: { 'user.createAt': 1 } },
            {
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
                $lookup: {
                    from: "chatmessages",
                    foreignField: "_id",
                    localField: "lastMessage",
                    as: "lastMessage",
                    pipeline: [
                        {
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
        ])
        // console.log(user)

        if (!user || user.length == 0) {
            return Response.json({
                success: false,
                message: "User not Found"
            })
        }
        return Response.json({
            success: true,
            user,
        })

    } catch (error: any) {
        return Response.json({
            success: false,
            message: "user not found"
        })
    }
}