"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/threadsModel";
import User from "../models/userModel";
import { connectToDb } from "../validations/mongoose";

interface Params {
    text: string, author: string,
    communityId: string | null,
    //
    path: string

}
export async function createThread({ text, author, communityId, path }: Params) {
    try {
        connectToDb();
        console.log(`textthreads njfdas`);

        const createThread = await Thread.create({
            text, author, community: null
        });
        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id }
        })

        revalidatePath(path);
    } catch (e) {
        console.log(e);
    }

}
export async function fetchThread(pageNumber = 1, pageSize = 20) {
    try {
        connectToDb();
        const skipsAmount = (pageNumber - 1) * pageSize;
        const threads = Thread.find({
            parentId: { $in: [null, undefined] }
        }).sort({ created: 'desc' }).skip(skipsAmount).limit(pageSize).populate({
            path: 'author',
            model: User
        }).populate({
            path: 'children', populate: {
                path: 'author',
                model: User
                , select: "_id name parentId image"
            }
        })
        const totalPostCount = await Thread.countDocuments({
            parentId: { $in: [null, undefined] }

        })
        const posts = await threads.exec();
        const isNext = totalPostCount > skipsAmount + posts.length;
        return { posts, isNext };
    } catch (e) {
        console.log(`error aya $e`);
    }
} export async function fetchThreadById(threadId: string) {

    try {
        connectToDb();

        const thread = await Thread.findById(threadId)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image",
            }) // Populate the author field with _id and username
            // .populate({
            //     // path: "community",
            //     // // model: Communit,
            //     // select: "_id id name image",
            // }) // Populate the community field with _id and name
            .populate({
                path: "children", // Populate the children field
                populate: [
                    {
                        path: "author", // Populate the author field within children
                        model: User,
                        select: "_id id name parentId image", // Select only _id and username fields of the author
                    },
                    {
                        path: "children", // Populate the children field within children
                        model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
                        populate: {
                            path: "author", // Populate the author field within nested children
                            model: User,
                            select: "_id id name parentId image", // Select only _id and username fields of the author
                        },
                    },
                ],
            })
            .exec();

        return thread;
    } catch (err) {
        console.error("Error while fetching thread:", err);
        throw new Error("Unable to fetch thread");
    }
}